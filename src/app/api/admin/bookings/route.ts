import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET() {
  const authed = await verifyAdminToken();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({ orderBy: { date: "asc" } });
  return NextResponse.json(bookings);
}
