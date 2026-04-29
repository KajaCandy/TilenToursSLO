import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [blocked, booked] = await Promise.all([
    prisma.blockedDate.findMany({ select: { date: true } }),
    prisma.booking.findMany({
      where: { status: "paid" },
      select: { date: true },
    }),
  ]);

  const blockedDates = blocked.map((b) => b.date);
  const bookedDates = booked.map((b) => b.date);

  return NextResponse.json({ blockedDates, bookedDates });
}
