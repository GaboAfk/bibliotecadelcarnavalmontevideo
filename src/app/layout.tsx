import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ClientWrapper";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Biblioteca Oficial del Carnaval Montevideano",
    description: "Solo hay cultura si se pone en valor. Archivo histórico del carnaval uruguayo.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen flex flex-col bg-white font-sans">
                <ClientWrapper>{children}</ClientWrapper>
            </body>
        </html>
    );
}