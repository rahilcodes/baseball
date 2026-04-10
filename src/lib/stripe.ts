/**
 * BPL Stripe Configuration
 * Central config for all Stripe payment links and webhook handling.
 */

// ---------------------------------------------------------------------------
// Payment Link Map
// ---------------------------------------------------------------------------
// Each link maps a tier/type to its Stripe Payment Link URL.
// The `?client_reference_id=` param is appended at runtime so we can match
// the payment back to the correct Supabase row in the webhook handler.
// ---------------------------------------------------------------------------

export const STRIPE_PAYMENT_LINKS = {
  // Player registration
  adult_player: "https://buy.stripe.com/14A6oJgJPcWp5N62iS4wM04",
  student_player: "https://buy.stripe.com/aFa8wR9hnf4x6Rag9I4wM03",

  // Sponsorship tiers
  title: "https://buy.stripe.com/7sYdRb3X33lPgrK7Dc4wM02",
  gold: "https://buy.stripe.com/dRmdRb9hn1dHb7q8Hg4wM01",
  silver: "https://buy.stripe.com/14AdRb5177C58Zie1A4wM00",
} as const;

export type StripePaymentType = keyof typeof STRIPE_PAYMENT_LINKS;

/**
 * Build a Stripe Payment Link URL that embeds the Supabase row ID so the
 * webhook handler can automatically flip the payment_status to 'paid'.
 *
 * @param type      - The payment type (maps to a Stripe Payment Link)
 * @param recordId  - The Supabase row UUID for the pending registration
 * @param quantity  - (optional) number of players for bulk team payment
 */
export function buildStripeUrl(
  type: StripePaymentType,
  recordId: string,
  quantity?: number
): string {
  const base = STRIPE_PAYMENT_LINKS[type];
  const url = new URL(base);
  url.searchParams.set("client_reference_id", recordId);
  if (quantity && quantity > 1) {
    url.searchParams.set("quantity", String(quantity));
  }
  return url.toString();
}
