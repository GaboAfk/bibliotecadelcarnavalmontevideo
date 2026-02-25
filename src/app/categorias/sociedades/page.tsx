"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";

const sociedades: Record<string, string[]> = {
    A: ["Ataques del Barrio"],
    B: ["Barrio Rampla"],
    C: ["Candombe Joven"],
    D: ["Diablos Negros"],
    E: ["Espíritu del Candombe"],
    L: ["Los Negros del Barrio"],
    M: ["Mozo Viejo"],
    P: ["Palermo Candombero"],
    R: ["Raza Negra"],
    V: ["Valores"],
};

function slugify(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export default function SociedadesPage() {
    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl md:text-5xl font-serif text-center tracking-wide">
                        Sociedad de negros y lubolos
                    </h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <span>Sociedad de negros y lubolos</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80"
                        alt="Comparsa de negros y lubolos"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Valores:</strong> Mejor cuerda de tambores del desfile 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-4xl mx-auto mb-12 space-y-4 text-lg leading-relaxed">
                    <p>
                        Las sociedades de negros y lubolos rescatan la memoria afrouruguaya y la elevan con comparsas contundentes. Sus tambores,
                        bailes y banderas llenan la calle de color y reivindican la tradición ancestral del candombe.
                    </p>
                    <p>
                        Cada conjunto coordina tambores chico, repique y piano, además de una cuerda coreográfica que suma escobilleros, gramilleros
                        y vedettes. La potencia rítmica y la elegancia de sus puestas convierten a la categoría en un símbolo cultural imprescindible.
                    </p>
                </div>

                <AlphabetGrid
                    data={sociedades}
                    baseUrl="/categorias/sociedades"
                    title="Explorá nuestro archivo de sociedades:"
                    slugify={slugify}
                />
            </div>

            <NovedadesSection />
        </div>
    );
}
