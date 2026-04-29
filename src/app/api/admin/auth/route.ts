import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, clearAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password, action } = await req.json();

  if (action === "logout") {
    await clearAdminToken();
    return NextResponse.json({ ok: true });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  await signAdminToken();
  return NextResponse.json({ ok: true });
}
