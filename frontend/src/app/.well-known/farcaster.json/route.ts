import {
    FARCASTER_PAYLOAD, 
    FARCASTER_HEADER, 
    FARCASTER_SIGNATURE,
    NEXT_PUBLIC_URL,
    NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_ICON, 
    NEXT_PUBLIC_APP_OG_DESCRIPTION,
    NEXT_PUBLIC_APP_OG_IMAGE,
    NEXT_PUBLIC_APP_OG_TITLE,
    NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
    NEXT_PUBLIC_APP_SPLASH_IMAGE,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    NEXT_PUBLIC_APP_HERO_IMAGE
} from './../../../utils/config';

function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
  const URL = NEXT_PUBLIC_URL as string;

  return Response.json({
    accountAssociation: {
      header: FARCASTER_HEADER,
      payload: FARCASTER_PAYLOAD,
      signature: FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: '1',
      name: NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      subtitle: "Find USDC businesses", // ≤30 chars
      description: NEXT_PUBLIC_APP_DESCRIPTION,
      screenshotUrls: [],
      iconUrl: NEXT_PUBLIC_APP_ICON,
      splashImageUrl: NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: "#071134",
      homeUrl: URL,
      imageUrl: NEXT_PUBLIC_APP_HERO_IMAGE,
      buttonTitle: 'Explore the map',
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags: ["business","usdc","stablecoins","map","crypto"],
      heroImageUrl: NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: "Google Maps for USDC", // ≤30 chars
      ogTitle: NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: NEXT_PUBLIC_APP_OG_IMAGE,
      // use only while testing
      // @ts-ignore
      // noindex: true,
    }),
  });
}