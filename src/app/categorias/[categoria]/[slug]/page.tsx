"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { fetchAgrupacionBySlug } from "@/lib/data-queries";
import { Agrupacion } from "@/lib/supabase-client";

type AgrupacionPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

type SectionType = "historia" | "espectaculos" | "posiciones" | "discografia" | "trivia" | "galeria" | "informacion";

export default function AgrupacionDetailPage({ params }: AgrupacionPageProps) {
    const router = useRouter();
    const { slug } = React.use(params);
    const [agrupacion, setAgrupacion] = useState<Agrupacion | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAgrupacionBySlug(slug);
                setAgrupacion(data);
            } catch (error) {
                console.error('Error loading agrupacion data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [slug]);
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

    if (loading) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Cargando...</h1>
                </div>
            </div>
        );
    }

    if (!agrupacion) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Agrupación no encontrada</h1>
                    <p className="text-lg mb-8">La agrupación que buscas no existe en nuestro archivo.</p>
                    <button
                        onClick={() => router.back()}
                        className="text-black hover:underline"
                    >
                        ← Volver
                    </button>
                </div>
            </div>
        );
    }

    const toggleSection = (section: SectionType) => {
        if (section === "espectaculos") {
            router.push(`/categorias/murgas/${slug}/espectaculos`);
        } else {
            setExpandedSections(prev => ({
                ...prev,
                [section]: !prev[section]
            }));
            setActiveSection(section);
        }
    };

    const sections: { id: SectionType; label: string; hasContent: boolean }[] = [
        { id: "historia", label: "Historia", hasContent: !!agrupacion.history },
        { id: "espectaculos", label: "Espectáculos", hasContent: true },
        { id: "posiciones", label: "Posiciones", hasContent: !!agrupacion.positions?.length },
        { id: "discografia", label: "Discografía", hasContent: !!agrupacion.discography?.length },
        { id: "trivia", label: "Trivia", hasContent: !!agrupacion.trivia?.length },
        { id: "galeria", label: "Galería", hasContent: !!agrupacion.gallery?.length },
        { id: "informacion", label: "Información", hasContent: !!agrupacion.information },
    ];

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">{agrupacion.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <Link href="/categorias/murgas" className="hover:underline">Murgas</Link>
                    <ChevronRight size={16} />
                    <span>{agrupacion.name}</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src={agrupacion.image || ""}
                        alt={`${agrupacion.name} en escenario`}
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
                                        {section.id !== "espectaculos" && (
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform ${expandedSections[section.id] ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
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
                                    {agrupacion.history}
                                </p>
                            </section>
                        )}

                        {/* Posiciones */}
                        {expandedSections.posiciones && agrupacion.positions && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Posiciones</h2>
                                <div className="space-y-3">
                                    {agrupacion.positions.map((position, index) => (
                                        <div key={index} className="border-l-4 border-black pl-4 py-2">
                                            <p className="text-lg">{position}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Discografía */}
                        {expandedSections.discografia && agrupacion.discography && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Discografía</h2>
                                <div className="space-y-3">
                                    {agrupacion.discography.map((album, index) => (
                                        <div key={index} className="border-l-4 border-black pl-4 py-2">
                                            <p className="text-lg">{album}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Trivia */}
                        {expandedSections.trivia && agrupacion.trivia && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Trivia</h2>
                                <div className="space-y-3">
                                    {agrupacion.trivia.map((fact, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-lg text-gray-700">{fact}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Galería */}
                        {expandedSections.galeria && agrupacion.gallery && agrupacion.gallery.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Galería</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {agrupacion.gallery.map((image, index) => (
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
                        {expandedSections.informacion && agrupacion.information && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Información</h2>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    {agrupacion.information}
                                </p>
                            </section>
                        )}


                        <section className="mb-12 border-t pt-8">
                            <h2 className="text-3xl font-serif mb-6">Descripción</h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                {agrupacion.description}
                            </p>
                        </section>
                    </div>
                </div>

                {/* Back Button */}
                <div className="border-t pt-8">
                    <Link
                        href="/categorias/murgas"
                        className="inline-flex items-center gap-2 text-black hover:underline"
                    >
                        ← Volver a todas las murgas
                    </Link>
                </div>
            </div>
        </div>
    );
}
