import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RELAY = process.env.RELAY_URL
const TOKEN = process.env.RELAY_AUTH_TOKEN || "change-me"

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId")
  if (!RELAY) {
    return NextResponse.json({ active: false, messages: [], ended: null })
  }

  try {
    const url = `${RELAY}/poll?sessionId=${encodeURIComponent(sessionId ?? "")}&_=${Date.now()}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ active: false, messages: [], ended: null })
  }
}
