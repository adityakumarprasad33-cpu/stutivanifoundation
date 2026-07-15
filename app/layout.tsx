import type { Metadata } from 'next';
import { fontSans, fontMono } from '@/lib/config/fonts';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Stuti-Vani Foundation',
  description: 'Increasing transparency and public trust to strengthen community engagement.',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
