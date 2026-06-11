import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `
    // service worker registration would go here
    // For now, this is a placeholder for PWA functionality
    `.trim(),
    { headers: { "Content-Type": "application/javascript" } }
  );
}