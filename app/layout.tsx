import "./globals.css";
import { metadata } from "./metadata";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { AnalyticsHead, AnalyticsBody } from "@/components/Analytics";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <AnalyticsHead />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://scripts.clarity.ms" />
        <link rel="dns-prefetch" href="https://scripts.clarity.ms" />
      </head>
      <body>
        <AnalyticsBody />
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  );
}
