import { describe, it, expect, vi, beforeAll } from "vitest"
import { NextRequest } from "next/server"
import type { POST as POSTType } from "@/app/api/contact/route"

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null }),
      },
    }
  }),
}))

let POST: typeof POSTType

beforeAll(async () => {
  const mod = await import("@/app/api/contact/route")
  POST = mod.POST
})

function makeReq(body: Record<string, string>) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

describe("POST /api/contact", () => {
  it("returns 400 when name is missing", async () => {
    const res = await POST(makeReq({ email: "a@b.com", message: "hi" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("All fields required")
  })

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeReq({ name: "Asif", message: "hi" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("All fields required")
  })

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeReq({ name: "Asif", email: "a@b.com" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("All fields required")
  })

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeReq({ name: "Asif", email: "not-an-email", message: "hi" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("Invalid email")
  })

  it("returns 200 for a valid submission", async () => {
    const res = await POST(makeReq({ name: "Asif", email: "asif@example.com", message: "Hello!" }))
    expect(res.status).toBe(200)
    expect((await res.json()).success).toBe(true)
  })
})
