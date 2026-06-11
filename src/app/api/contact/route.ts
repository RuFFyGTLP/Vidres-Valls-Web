import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Falten camps obligatoris" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invàlid" },
        { status: 400 }
      );
    }

    // Log the contact (in production, integrate with email service like Resend, SendGrid, etc.)
    console.log("Contact form submission:", {
      name,
      email,
      phone: phone || "No proporcionat",
      message,
      timestamp: new Date().toISOString(),
    });

    // In production, you would send an email here:
    // await sendEmail({ to: "vidresvalls@vidresvalls.es", from: email, subject: `Nou contacte de ${name}`, text: message });

    return NextResponse.json({
      success: true,
      message: "Missatge enviat correctament",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Error en processar la sol·licitud" },
      { status: 500 }
    );
  }
}