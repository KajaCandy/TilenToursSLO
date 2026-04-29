import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET() {
  const authed = await verifyAdminToken();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const blocked = await prisma.blockedDate.findMany();
  return NextResponse.json(blocked.map((b) => b.date));
}

export async function POST(req: NextRequest) {
  const authed = await verifyAdminToken();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { date, block } = await req.json();
  if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

  if (block) {
    await prisma.blockedDate.upsert({ where: { date }, create: { date }, update: {} });
  } else {
    await prisma.blockedDate.deleteMany({ where: { date } });
  }

  return NextResponse.json({ ok: true });
}
