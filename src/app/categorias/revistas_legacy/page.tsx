"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";
import { revistasAlphabet, availableRevistas, revistasInfo } from '@/data/revistas';
import { slugify } from '@/utils/slugify';

export default function RevistasPage() {
    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">Revistas</h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <span>Revistas</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src={revistasInfo.image}
                        alt={revistasInfo.alt}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">{revistasInfo.badge}</p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12 space-y-4 text-lg leading-relaxed">
                    {revistasInfo.description.split("\n\n").map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                {/* <AlphabetGrid
                    data={revistasAlphabet}
                    baseUrl="/categorias/revistas"
                    title="Explorá nuestro archivo de revistas:"
                    slugify={slugify}
                    availableItems={availableRevistas}
                /> */}
            </div>

            <NovedadesSection />
        </div>
    );
}
