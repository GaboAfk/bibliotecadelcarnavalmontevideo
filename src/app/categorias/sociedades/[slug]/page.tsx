"use client";

import { sociedadesData } from "@/data/sociedades";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type SociedadPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

type SectionType = "historia" | "espectaculos" | "posiciones" | "discografia" | "trivia" | "galeria" | "informacion";

export default function SociedadDetailPage({ params }: SociedadPageProps) {
    const router = useRouter();
    const { slug } = React.use(params);
    const sociedadData = Object.values(sociedadesData).find(
        s => s.name.toLowerCase().replace(/\s+/g, '-') === slug
    );
    const [activeSection, setActiveSection] = useState<SectionType>("historia");
    const [expandedSections, setExpandedSections] = useState<Record<SectionType, boolean>>({
        historia: true,
        espectaculos: false,
        posiciones: false,
        discografia: false,
        trivia: false,
        galeria: false,
        informacion: false,
    });

    if (!sociedadData) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Sociedad no encontrada</h1>
                    <p className="text-lg mb-8">La sociedad que buscas no existe en nuestro archivo.</p>
                    <button
                        onClick={() => router.back()}
                        className="text-black hover:underline"
                    >
                        ← Volver a Sociedades
                    </button>
                </div>
            </div>
        );
    }

    const toggleSection = (section: SectionType) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
        setActiveSection(section);
    };

    const sections: { id: SectionType; label: string; hasContent: boolean }[] = [
        { id: "historia", label: "Historia", hasContent: true },
        { id: "espectaculos", label: "Espectáculos", hasContent: sociedadData.shows.length > 0 },
        { id: "posiciones", label: "Posiciones", hasContent: !!sociedadData.positions?.length },
        { id: "discografia", label: "Discografía", hasContent: !!sociedadData.discography?.length },
        { id: "trivia", label: "Trivia", hasContent: !!sociedadData.trivia?.length },
        { id: "galeria", label: "Galería", hasContent: !!sociedadData.gallery?.length },
        { id: "informacion", label: "Información", hasContent: !!sociedadData.information },
    ];

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">{sociedadData.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <Link href="/categorias/sociedades" className="hover:underline">Sociedad de negros y lubolos</Link>
                    <ChevronRight size={16} />
                    <span>{sociedadData.name}</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src={sociedadData.shows[0]?.image || "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80"}
                        alt={`${sociedadData.name} en escenario`}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                            <h3 className="text-lg font-serif font-bold mb-4">Secciones</h3>
                            <div className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => toggleSection(section.id)}
                                        disabled={!section.hasContent}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${expandedSections[section.id] ? "bg-black text-white" : section.hasContent ? "hover:bg-gray-200 text-black" : "text-gray-400 cursor-not-allowed"} ${!section.hasContent ? "opacity-50" : ""}`}
                                    >
                                        <span>{section.label}</span>
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform ${expandedSections[section.id] ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        {/* Historia */}
                        {expandedSections.historia && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Historia</h2>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    {sociedadData.history}
                                </p>
                            </section>
                        )}

                        {/* Espectáculos */}
                        {expandedSections.espectaculos && sociedadData.shows && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Espectáculos</h2>
                                <div className="space-y-3">
                                    {sociedadData.shows.map((show, index) => (
                                        <div key={index} className="border-l-4 border-black pl-4 py-2">
                                            <p className="text-lg font-bold">{show.title}</p>
                                            {show.year && <p className="text-gray-600">Año: {show.year}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Posiciones */}
                        {expandedSections.posiciones && sociedadData.positions && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Posiciones</h2>
                                <div className="space-y-3">
                                    {sociedadData.positions.map((position, index) => (
                                        <div key={index} className="border-l-4 border-black pl-4 py-2">
                                            <p className="text-lg">{position}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Discografía */}
                        {expandedSections.discografia && sociedadData.discography && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Discografía</h2>
                                <div className="space-y-3">
                                    {sociedadData.discography.map((album, index) => (
                                        <div key={index} className="border-l-4 border-black pl-4 py-2">
                                            <p className="text-lg">{album}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Trivia */}
                        {expandedSections.trivia && sociedadData.trivia && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Trivia</h2>
                                <div className="space-y-3">
                                    {sociedadData.trivia.map((fact, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-lg text-gray-700">{fact}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Galería */}
                        {expandedSections.galeria && sociedadData.gallery && sociedadData.gallery.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Galería</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {sociedadData.gallery.map((image, index) => (
                                        <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                                            <ImageWithFallback
                                                src={image}
                                                alt={`Galería ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Información */}
                        {expandedSections.informacion && sociedadData.information && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Información</h2>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    {sociedadData.information}
                                </p>
                            </section>
                        )}

                        <section className="mb-12 border-t pt-8">
                            <h2 className="text-3xl font-serif mb-6">Descripción</h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                {sociedadData.description}
                            </p>
                        </section>
                    </div>
                </div>

                {/* Back Button */}
                <div className="border-t pt-8">
                    <Link
                        href="/categorias/sociedades"
                        className="inline-flex items-center gap-2 text-black hover:underline"
                    >
                        ← Volver a todas las sociedades
                    </Link>
                </div>
            </div>
        </div>
    );
}
