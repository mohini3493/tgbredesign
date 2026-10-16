/**
 * Payment provider boundary (future). All payment logic stays here so the
 * provider (Razorpay recommended for India) can be swapped without touching UI.
 *
 * Flow:
 *  1. Server action creates an order on the TGB API -> returns provider order id
 *  2. Client opens Razorpay Checkout with that id
 *  3. Webhook (app/api/webhooks/payments/route.ts) verifies the signature and marks the order paid
 */
export type CreatePaymentResult = { provider: "razorpay"; providerOrderId: string; amountINR: number };

export async function createPayment(_orderId: string): Promise<CreatePaymentResult> {
  throw new Error("Payments are not enabled yet. Set NEXT_PUBLIC_FEATURE_SHOP=true and implement.");
}

export async function verifyPaymentSignature(_payload: string, _signature: string): Promise<boolean> {
  throw new Error("Not implemented");
}
