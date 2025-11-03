import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  // Instantiate Stripe inside the handler so the module doesn't throw at build time
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error("Missing STRIPE_SECRET_KEY environment variable");
    return NextResponse.json(
      { error: "Server configuration error: missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });

  try {
    const body = await req.json();
    const { priceId, planName, email } = body || {};

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId in request body" }, { status: 400 });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email, // Pre-fill customer email
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin")}/?canceled=true`,
      metadata: {
        planName: planName,
      },
      // Enable automatic email receipts from Stripe
      payment_intent_data: undefined,
      subscription_data: {
        metadata: {
          planName: planName,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
