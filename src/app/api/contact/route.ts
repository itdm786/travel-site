import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // In production, this would send an email or store in database
    console.log("Contact form submission:", { name, email, phone, service, message });

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. We will get back to you within 24 hours.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
