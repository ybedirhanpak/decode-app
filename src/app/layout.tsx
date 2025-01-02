import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontInter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});


const fontMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "De-code",
    description: "AI-driven code generation from design",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${fontInter.variable} ${fontMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
