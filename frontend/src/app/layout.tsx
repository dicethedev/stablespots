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
// import { MiniKitContextProvider } from "@/providers/MiniKitContextProvider";

export const metadata: Metadata = {
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
  twitter: {
    card: "summary_large_image",
    site: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE_CLOUDINARY_URL,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/image/stablespots.svg",
    shortcut: "/image/stablespots.svg",
    apple: "/image/stablespots.svg",
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
        {/* <MiniKitContextProvider>{children}</MiniKitContextProvider> */}
        {children}
      </body>
    </html>
  );
}
