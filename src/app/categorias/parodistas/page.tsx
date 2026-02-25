"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";
import { parodistasAlphabet, availableParodistas } from '@/data/parodistas';
import { slugify } from '@/utils/slugify';

export default function ParodistasPage() {
    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">Parodistas</h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <span>Parodistas</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="/images/parodistas/parodistas.jpg"
                        alt="Parodistas en escena teatral"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Los Muchachos:</strong> primer premio en categoría parodistas 2020
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12 space-y-4 text-lg leading-relaxed">
                    <p>
                        Los parodistas llevan al tablado puestas teatrales completas: cambian de personajes, recrean escenas históricas y mezclan humor
                        con narrativas intensas. Cada presentación combina coreografías, coros potentes y una escenografía que se transforma ante el público.
                    </p>
                    <p>
                        Este género exige precisión actoral y vocal. Los cuadros suelen recorrer diferentes épocas y estilos musicales, con arreglos corales
                        pensados para sostener la historia y destacar la creatividad de cada conjunto.
                    </p>
                </div>

                <AlphabetGrid
                    data={parodistasAlphabet}
                    baseUrl="/categorias/parodistas"
                    title="Explorá nuestro archivo de parodistas:"
                    slugify={slugify}
                    availableItems={availableParodistas}
                />
            </div>

            <NovedadesSection />
        </div>
    );
}
