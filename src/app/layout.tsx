import type { Metadata } from "next";
import "./globals.css";
import { UnderConstructionBanner } from "./components/UnderConstructionBanner";

export const metadata: Metadata = {
  title: "Rudy Chávez | Designer & Developer",
  description: "Rudy Chávez - Portfolio and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <UnderConstructionBanner />
        {children}
      </body>
    </html>
  );
}
