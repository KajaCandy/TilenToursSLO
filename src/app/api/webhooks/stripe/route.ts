import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { sendCustomerConfirmation, sendClientNotification } from "@/lib/email";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const m = session.metadata!;

    const booking = await prisma.booking.upsert({
      where: { stripeSessionId: session.id },
      create: {
        date: m.date,
        numPeople: parseInt(m.numPeople),
        snackChoice: m.snackChoice || null,
        vegetarian: m.vegetarian === "true",
        dogKennel: m.dogKennel === "true",
        musicPreference: m.musicPreference || null,
        notes: m.notes || null,
        totalPrice: parseInt(m.totalPrice),
        customerName: m.customerName,
        customerEmail: m.customerEmail,
        customerPhone: m.customerPhone,
        stripeSessionId: session.id,
        status: "paid",
      },
      update: { status: "paid" },
    });

    const emailData = {
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      date: booking.date,
      numPeople: booking.numPeople,
      snackChoice: booking.snackChoice,
      vegetarian: booking.vegetarian,
      dogKennel: booking.dogKennel,
      musicPreference: booking.musicPreference,
      notes: booking.notes,
      totalPrice: booking.totalPrice,
    };

    await Promise.all([
      sendCustomerConfirmation(emailData),
      sendClientNotification(emailData),
    ]);
  }

  return NextResponse.json({ received: true });
}
