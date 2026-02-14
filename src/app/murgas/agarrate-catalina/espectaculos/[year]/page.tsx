"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface EspectaculoPageProps {
    params: {
        year: string;
    };
}

export default function EspectaculoIndividualPage({ params }: EspectaculoPageProps) {
    const [activeTab, setActiveTab] = useState<"repertorio" | "galeria" | "datos">("repertorio");

    const year = parseInt(params.year);

    // Validar que el año existe
    const validYears = [2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2019, 2020, 2021];
    if (!validYears.includes(year)) {
        notFound();
    }

    const creditos = [
        { role: "Director Responsable", name: "Yamandú Cardozo" },
        { role: "Textos", name: "Yamandú Cardozo, Tabaré Cardozo y Carlos Tanco" },
        { role: "Director Escénico", name: "Martín Duarte" },
        { role: "Arreglos Corales", name: "Martín Duarte" },
        { role: "Vestuario", name: "Hugo Millán" },
        { role: "Iluminación", name: "Martín Blanchet" },
    ];

    const letras = {
        retirada: `Retirada: El viaje.
Este es el comienzo de mi viaje,
es el final de mi camino.
No llevo prisa ni equipaje,
solo cenizas en el mar
de este remendado corazón,
para viajar.

Navegar, siempre navegar
sobre el cielo azul
tan fugaz, todo es tan fugaz,
vieja juventud,
será mi piel el viento sur.`,
    };

    return (
        <div className="bg-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Título */}
                <h1 className="text-3xl md:text-4xl mb-8 font-serif">Agarrate Catalina: El Viaje, {year}</h1>

                {/* Imagen principal */}
                <div className="relative h-[300px] md:h-[500px] mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?w=1200&q=80"
                        alt={`El Viaje - ${year}`}
                        fill
                        priority
                    />
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-300 mb-8 overflow-x-auto">
                    <div className="flex gap-4 md:gap-8 min-w-max md:min-w-0">
                        {(["repertorio", "galeria", "datos"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 border-b-2 transition-all whitespace-nowrap capitalize ${activeTab === tab
                                        ? "border-black"
                                        : "border-transparent hover:border-gray-400"
                                    }`}
                            >
                                {tab === "galeria" ? "Galería" : tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-5xl">
                    {activeTab === "repertorio" && (
                        <div>
                            <h2 className="text-2xl mb-6 font-serif">Letras del espectáculo</h2>

                            <div className="mb-12">
                                <h3 className="text-xl mb-4 font-serif">Retirada</h3>
                                <div className="bg-gray-50 p-8 rounded-lg">
                                    <pre className="whitespace-pre-wrap font-serif text-lg leading-relaxed">
                                        {letras.retirada}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "galeria" && (
                        <div>
                            <h2 className="text-2xl mb-6 font-serif">Galería de imágenes</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                                        <ImageWithFallback
                                            src={`https://images.unsplash.com/photo-1767320618406-c03b1884e91a?w=400&q=80`}
                                            alt={`Imagen ${i}`}
                                            fill
                                            className="hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "datos" && (
                        <div>
                            <div className="mb-12">
                                <h2 className="text-2xl mb-6 font-serif">Créditos</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {creditos.map((credito, index) => (
                                        <div key={index} className="border-b border-gray-200 pb-4">
                                            <p className="text-sm text-gray-600 mb-1">{credito.role}</p>
                                            <p className="text-lg">{credito.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}