import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
