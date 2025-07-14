import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "Ergo Fuacet UI",
  description: "Do tasks and win rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased transition-colors`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
