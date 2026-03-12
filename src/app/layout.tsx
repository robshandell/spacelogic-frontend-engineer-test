import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHOP.CO - Find Clothes That Match Your Style",
  description: "Browse our diverse range of meticulously crafted garments. International brands, high-quality products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
