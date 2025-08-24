import "./globals.css";
import { metadata } from "./metadata";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  );
}
