import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import  store from "@/redux/store";

export const metadata: Metadata = {
  title: "Delivery Eats",
  description: "Food Delivery Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="relative overflow-hidden p-8 lg:p-14">
            {children}
          </main>
          <Footer />
        </Providers>
        </body>
    </html>
  );
}
