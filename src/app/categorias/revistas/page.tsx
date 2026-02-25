"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";

const revistas: Record<string, string[]> = {
    A: ["Araca la Cana"],
    B: ["Blanca Luz"],
    C: ["Contrafarsa"],
    D: ["Diablos Verdes"],
    E: ["Espectáculo"],
    F: ["Feelings"],
    L: ["Los Choby Choby"],
    M: ["Momolandia"],
    R: ["Revistas Unidas"],
    S: ["Salpicón"],
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
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&q=80"
                        alt="Vestuario colorido de revistas"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Feelings:</strong> Mejor vestuario y coreografía 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-4xl mx-auto mb-12 space-y-4 text-lg leading-relaxed">
                    <p>
                        Las revistas combinan glamour, humor y crítica social con grandes cuadros coreográficos. Son espectáculos de revista musical
                        con vestuarios lujosos, cuerpos de baile numerosos y arreglos corales luminosos que transforman el tablado en una pasarela.
                    </p>
                    <p>
                        Cada conjunto crea historias visuales llenas de brillo y energía, donde los cambios de vestuario, la iluminación y el repertorio
                        pop convierten la categoría en uno de los momentos más vibrantes del carnaval.
                    </p>
                </div>

                <AlphabetGrid
                    data={revistas}
                    baseUrl="/categorias/revistas"
                    title="Explorá nuestro archivo de revistas:"
                    slugify={slugify}
                />
            </div>

            <NovedadesSection />
        </div>
    );
}
