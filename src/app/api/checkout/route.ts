import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

const PRICE_PER_PERSON = 130_00;
const SNACK_PRICE = 10_00;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { date, numPeople, snackChoice, vegetarian, dogKennel, musicPreference, notes, customerName, customerEmail, customerPhone } = body;

  if (!date || !numPeople || numPeople < 2 || numPeople > 4) {
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }

  const now = new Date();
  const minBookable = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
  if (new Date(date + "T12:00:00") < minBookable) {
    return NextResponse.json({ error: "Bookings must be made at least 2 days in advance" }, { status: 400 });
  }

  const blocked = await prisma.blockedDate.findUnique({ where: { date } });
  const existing = await prisma.booking.findFirst({ where: { date, status: "paid" } });
  if (blocked || existing) {
    return NextResponse.json({ error: "Date not available" }, { status: 409 });
  }

  const snackLabel = snackChoice
    ? `${vegetarian ? "Vegetarian " : ""}homemade snack: ${snackChoice}`
    : null;

  const lineItems: { price_data: { currency: string; product_data: { name: string }; unit_amount: number }; quantity: number }[] = [
    {
      price_data: { currency: "eur", product_data: { name: "Tilen Tours Slovenia: Full Day Tour" }, unit_amount: PRICE_PER_PERSON },
      quantity: numPeople,
    },
  ];

  if (snackChoice && snackLabel) {
    lineItems.push({
      price_data: { currency: "eur", product_data: { name: snackLabel }, unit_amount: SNACK_PRICE },
      quantity: numPeople,
    });
  }

  const totalPrice = PRICE_PER_PERSON * numPeople + (snackChoice ? SNACK_PRICE * numPeople : 0);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const trimmedNotes = typeof notes === "string" ? notes.trim().slice(0, 480) : "";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${baseUrl}/en/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/en/book`,
    customer_email: customerEmail,
    metadata: {
      date,
      numPeople: String(numPeople),
      snackChoice: snackChoice ?? "",
      vegetarian: vegetarian ? "true" : "false",
      dogKennel: dogKennel ? "true" : "false",
      musicPreference: musicPreference ?? "",
      notes: trimmedNotes,
      customerName,
      customerEmail,
      customerPhone,
      totalPrice: String(totalPrice / 100),
    },
  });

  return NextResponse.json({ url: session.url });
}
