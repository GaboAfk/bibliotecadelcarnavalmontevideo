"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";

// import { murgasAlphabet, availableMurgas, murgasInfo } from '@/data/murgas';
import { murgasAlphabet, availableMurgas, } from '@/data/murgas';

import { fetchCategories } from "@/lib/data-queries";

export default async function MurgasPage() {
    const categories = await fetchCategories();
    const murgasCategory = categories.find((category) => category.slug === "murgas");
    console.log(murgasCategory);

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
                        src={murgasCategory?.info_image || ""}
                        alt={murgasCategory?.info_alt || ""}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">{murgasCategory?.info_badge}</p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12">
                    <p className="text-lg leading-relaxed mb-4 whitespace-pre-wrap">{murgasCategory?.info_description}</p>
                </div>

                <AlphabetGrid
                    data={murgasAlphabet}
                    baseUrl="/categorias/murgas"
                    title="Explorá nuestro archivo de murgas:"
                    availableItems={availableMurgas}
                />
            </div>

            <NovedadesSection />
        </div>
    );
}