import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(req: NextRequest) {
  let body: Record<string, string> | null = null
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const name = body?.name?.trim() ?? ""
  const email = body?.email?.trim() ?? ""
  const message = body?.message?.trim() ?? ""

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  const safeName    = escapeHtml(name)
  const safeEmail   = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>")

  const { error } = await resend.emails.send({
    from: "mohtesham.com <contact@mohtesham.com>",
    to: ["asifmohtesham@gmail.com"],
    subject: `New message from ${safeName}`,
    html: `
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  })

  if (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
