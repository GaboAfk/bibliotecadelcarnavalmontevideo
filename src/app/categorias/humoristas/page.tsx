"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";
import { humoristasAlphabet, availableHumoristas } from '@/data/humoristas';
import { slugify } from '@/utils/slugify';

export default function HumoristasPage() {
    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">Humoristas</h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <span>Humoristas</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="/images/humoristas/humoristas.jpg"
                        alt="Elenco de humoristas en el escenario"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Los Carlitos:</strong> Premio a mejor espectáculo humorístico 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12 space-y-4 text-lg leading-relaxed">
                    <p>
                        Los humoristas son el pulso desenfadado del carnaval. Con sketches veloces, personajes icónicos y un sentido
                        del humor que combina sátira política con referencias cotidianas, transforman el escenario en un show de comicidad
                        vibrante y coreografías ajustadas.
                    </p>
                    <p>
                        Sus espectáculos mezclan actuación teatral, canto en conjunto y una batería milimétricamente sincronizada. Cada año
                        sorprenden con puestas en escena repletas de guiños actuales y textos afilados que se convierten en frases
                        populares durante todo el carnaval.
                    </p>
                </div>

                <AlphabetGrid
                    data={humoristasAlphabet}
                    baseUrl="/categorias/humoristas"
                    title="Explorá nuestro archivo de humoristas:"
                    slugify={slugify}
                    availableItems={availableHumoristas}
                />
            </div>

            <NovedadesSection />
        </div>
    );
}
