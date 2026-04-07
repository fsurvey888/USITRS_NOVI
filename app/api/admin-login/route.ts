import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUsername = process.env.ADMIN_USERNAME || "predsjednika"
  const validPassword = process.env.ADMIN_PASSWORD || "usit2025"

  if (username === validUsername && password === validPassword) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
