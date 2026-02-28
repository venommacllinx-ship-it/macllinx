import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

// Initialize Lemon Squeezy with API key
export function initializeLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  
  if (!apiKey) {
    console.warn("LEMONSQUEEZY_API_KEY not set. Payment features will be disabled.");
    return false;
  }
  
  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("Lemon Squeezy Error:", error);
    },
  });
  
  return true;
}

// Generate checkout URL for a specific variant
// You'll need to create products in Lemon Squeezy dashboard and get variant IDs
export function getCheckoutUrl(variantId: string, options?: {
  embed?: boolean;
  couponCode?: string;
  customData?: Record<string, string>;
}) {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  
  if (!storeId) {
    console.error("LEMONSQUEEZY_STORE_ID not set");
    return null;
  }
  
  const params = new URLSearchParams();
  
  if (options?.embed) {
    params.append("embed", "1");
  }
  
  if (options?.couponCode) {
    params.append("coupon", options.couponCode);
  }
  
  // Lemon Squeezy checkout URL format
  return `https://venom.lemonsqueezy.com/checkout/buy/${variantId}?${params.toString()}`;
}

// Variant IDs for each pricing tier
// Replace these with your actual variant IDs from Lemon Squeezy dashboard
export const PRICING_VARIANTS = {
  starter: {
    monthly: "starter-monthly-variant-id",
    yearly: "starter-yearly-variant-id",
  },
  producer: {
    monthly: "producer-monthly-variant-id",
    yearly: "producer-yearly-variant-id",
  },
  artist: {
    monthly: "artist-monthly-variant-id",
    yearly: "artist-yearly-variant-id",
  },
  label: {
    monthly: "label-monthly-variant-id",
    yearly: "label-yearly-variant-id",
  },
  enterprise: {
    monthly: "enterprise-monthly-variant-id",
    yearly: "enterprise-yearly-variant-id",
  },
} as const;

export type PricingTier = keyof typeof PRICING_VARIANTS;