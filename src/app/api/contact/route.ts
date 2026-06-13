import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(3).max(3000),
  service: z.string().trim().max(80).optional(),
  urgency: z.string().trim().max(40).optional(),
  source: z.string().trim().max(80).default("website"),
  locale: z.enum(["ca", "es", "en"]).default("ca"),
  page: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
  honeypot: z.string().max(0).optional(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

function scoreLead(lead: z.infer<typeof leadSchema>) {
  let score = 20;
  if (lead.phone) score += 25;
  if (lead.email) score += 15;
  if (lead.service) score += 15;
  if (lead.message.length > 80) score += 10;
  if (lead.urgency === "urgent" || lead.urgency === "emergency") score += 15;
  return Math.min(score, 100);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    const current = attempts.get(ip);
    if (current && current.resetAt > now && current.count >= 8) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    attempts.set(ip, current && current.resetAt > now
      ? { ...current, count: current.count + 1 }
      : { count: 1, resetAt: now + 15 * 60_000 });

    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid lead data", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const lead = {
      id: crypto.randomUUID(),
      ...parsed.data,
      score: scoreLead(parsed.data),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Lead-Source": "vidres-valls-web" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Lead webhook returned ${response.status}`);
    } else {
      const directory = path.join(process.cwd(), "data");
      await mkdir(directory, { recursive: true });
      await appendFile(path.join(directory, "leads.jsonl"), `${JSON.stringify(lead)}\n`, "utf8");
    }

    return NextResponse.json({ success: true, leadId: lead.id, score: lead.score }, { status: 201 });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Lead delivery failed" }, { status: 500 });
  }
}
