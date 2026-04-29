import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const m = session.metadata ?? {};

  return NextResponse.json({
    date: m.date,
    numPeople: m.numPeople,
    snackChoice: m.snackChoice,
    dogKennel: m.dogKennel,
    totalPrice: m.totalPrice,
  });
}
