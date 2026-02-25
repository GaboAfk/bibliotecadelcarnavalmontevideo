"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";

import { murgasAlphabet, availableMurgas } from '@/data/murgas';
import { slugify } from '@/utils/slugify';

export default function MurgasPage() {
    const letters = Object.keys(murgasAlphabet).sort();

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">Murgas</h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span className="">Categorías</span>
                    <ChevronRight size={16} />
                    <span>Murgas</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="/murgas.jpg"
                        alt="Murgas en escenario"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Doña Bastarda:</strong> Primer premio de la categoría Murgas, Carnaval 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12">
                    <p className="text-lg leading-relaxed mb-4">
                        La murga se caracteriza por criticar sin ataduras, apelando al humor, la ironía y la poesía; también por construir con sus versos acertadas caricaturas de la
                        sociedad y los personajes públicos del momento. Está compuesta por un coro, un director y un trío de percusionistas que tocan la tradicional batería de
                        murga (bombo, platillos y redoblante). El coro tiene una particular forma de cantar y una fuerte presencia escénica. La murga como género musical es de
                        los más populares y representativos de Uruguay.
                    </p>
                </div>

                <AlphabetGrid
                    data={murgasAlphabet}
                    baseUrl="/categorias/murgas"
                    title="Explorá nuestro archivo de murgas:"
                    slugify={slugify}
                    availableItems={availableMurgas}
                />
            </div>

            <NovedadesSection />
        </div>
    );
}