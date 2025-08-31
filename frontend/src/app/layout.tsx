import type { Metadata } from "next";
import "./globals.css";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_IMAGE_CLOUDINARY_URL,
  SITE_NAME_URL,
} from "@/utils/site";
import { Toaster } from "sonner";
import { MiniKitContextProvider } from "@/providers/MiniKitContextProvider";

  // Build Mini App embed per latest docs
  const miniappEmbed = {
    version: '1',
    imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
    button: {
      title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME}`,
      action: {
        type: 'launch_miniapp',
        name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
        url: URL,
        splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
        splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR, 
      }
    },
  };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "USDC",
    "stablecoins",
    "USDC Merchants",
    "spend crypto near me",
    "stablecoin maps",
    "map",
    "stablecoin google map",
    "stablecoin map",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: SITE_IMAGE_CLOUDINARY_URL,
        width: 1200,
        height: 630,
      },
    ],
    siteName: SITE_NAME_URL,
  },
  icons: {
    icon: "/image/stablespots.svg",
    shortcut: "/image/stablespots.svg",
    apple: "/image/stablespots.svg",
  },
   // Add fc:frame metadata for rich embeds
  other: {
     // New embed tag
    'fc:miniapp': JSON.stringify(miniappEmbed),
     // Backward compatibility tag
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      button: {
        title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME}`,
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
          splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
        },
      },
    }),
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={"root"} suppressHydrationWarning={true}>
        <Toaster position="top-center" richColors />
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  );
}
