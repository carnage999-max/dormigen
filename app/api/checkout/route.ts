import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27.acacia" as any,
    }) 
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
    }

    const { bundleId, quantity, subscribe } = await req.json();

    const prices: Record<string, { priceId: string; amount: number }> = {
      "single": { priceId: "price_single_placeholder", amount: 6900 },
      "2-pack": { priceId: "price_2pack_placeholder", amount: 12500 },
      "family": { priceId: "price_family_placeholder", amount: 22000 },
    };

    const selected = prices[bundleId];
    if (!selected) {
      return NextResponse.json({ error: "Invalid bundle selected." }, { status: 400 });
    }

    // In a real app, you'd use actual Stripe Price IDs
    // For now, we'll use line_items with price_data
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: `Dormigen® - ${bundleId.charAt(0).toUpperCase() + bundleId.slice(1)}`,
        },
        unit_amount: selected.amount,
        ...(subscribe && {
          recurring: {
            interval: "month",
          },
        }),
      },
      quantity: quantity,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem],
      mode: subscribe ? "subscription" : "payment",
      success_url: `${req.nextUrl.origin}/?success=true`,
      cancel_url: `${req.nextUrl.origin}/?canceled=true`,
      // Add a 15% discount for subscriptions if it's a one-time payment but simulated as discount
      // Note: Real Stripe discounts require Coupon IDs.
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
