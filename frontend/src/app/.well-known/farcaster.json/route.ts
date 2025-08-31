import { BASE_URL, 
    FARCASTER_PAYLOAD, 
    FARCASTER_HEADER, 
    FARCASTER_SIGNATURE,
    NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_ICON, 
    NEXT_PUBLIC_APP_OG_DESCRIPTION,
    NEXT_PUBLIC_APP_OG_IMAGE,
    NEXT_PUBLIC_APP_OG_TITLE,
    NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
    NEXT_PUBLIC_APP_SPLASH_IMAGE,
    NEXT_PUBLIC_APP_TAGLINE,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
    NEXT_PUBLIC_APP_SUBTITLE,
    NEXT_PUBLIC_APP_HERO_IMAGE
} from './../../../utils/config';

function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
  const URL = BASE_URL as string;

  return Response.json({
    accountAssociation: {
      header: FARCASTER_HEADER,
      payload: FARCASTER_PAYLOAD,
      signature: FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: '1',
      name: NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      subtitle: NEXT_PUBLIC_APP_SUBTITLE,
      description: NEXT_PUBLIC_APP_DESCRIPTION,
      screenshotUrls: [],
      iconUrl: NEXT_PUBLIC_APP_ICON,
      splashImageUrl: NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags: [],
      heroImageUrl: NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: NEXT_PUBLIC_APP_OG_IMAGE,
      // use only while testing
      //@ts-ignore
      noindex: true,
    }),
  });
}