import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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

  const { error } = await resend.emails.send({
    from: "mohtesham.com <onboarding@resend.dev>", // update to contact@mohtesham.com after domain verified in Resend
    to: ["asifmohtesham@gmail.com"],
    subject: `New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  })

  if (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
