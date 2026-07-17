import type { Metadata } from 'next';
import { fontSans, fontMono } from '@/lib/config/fonts';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PreloaderProvider } from '@/components/providers/preloader-provider';
import { BRANDING } from '@/constants/branding';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: BRANDING.ORGANIZATION.NAME,
    template: `%s | ${BRANDING.ORGANIZATION.SHORT_NAME}`,
  },
  description: BRANDING.ORGANIZATION.TAGLINE,
  icons: {
    icon: BRANDING.ASSETS.FAVICON,
    apple: BRANDING.ASSETS.FAVICON,
  },
  manifest: BRANDING.ASSETS.MANIFEST,
  openGraph: {
    title: BRANDING.ORGANIZATION.NAME,
    description: BRANDING.ORGANIZATION.TAGLINE,
    images: [{ url: BRANDING.ASSETS.OG_IMAGE_DEFAULT }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreloaderProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
