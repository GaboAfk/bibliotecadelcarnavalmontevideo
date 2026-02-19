"use client";

import { murgasData } from "@/data/murgas";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "next/navigation";
import React from "react";
import { ChevronRight } from "lucide-react";

type ShowPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function ShowsPage({ params }: ShowPageProps) {
    const router = useRouter();
    const { slug } = React.use(params);
    const murgaData = murgasData[slug];

    if (!murgaData) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Murga no encontrada</h1>
                    <p className="text-lg mb-8">La murga que buscas no existe en nuestro archivo.</p>
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-UY", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">
                        Espectáculos - {murgaData.name}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600 flex-wrap">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <Link href="/categorias/murgas" className="hover:underline">Murgas</Link>
                    <ChevronRight size={16} />
                    <Link href={`/categorias/murgas/${slug}`} className="hover:underline">
                        {murgaData.name}
                    </Link>
                    <ChevronRight size={16} />
                    <span>Espectáculos</span>
                </nav>

                {/* Shows Grid */}
                <div className="mt-12">
                    {murgaData.shows.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {murgaData.shows.map((show) => (
                                <Link
                                    key={show.id}
                                    href={`/categorias/murgas/${slug}/espectaculos/${show.id}`}
                                    className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                >
                                    {/* Carnival Flag Banner */}
                                    <div className="relative h-8 bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 flex items-center justify-center overflow-hidden">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-white"
                                                    style={{
                                                        animation: `wave 1s ease-in-out ${i * 0.1}s infinite`
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <style>{`
                                            @keyframes wave {
                                                0%, 100% { transform: translateY(0); }
                                                50% { transform: translateY(-4px); }
                                            }
                                        `}</style>
                                    </div>

                                    {/* Show Image */}
                                    <div className="relative h-64 overflow-hidden bg-gray-200">
                                        <ImageWithFallback
                                            src={show.image}
                                            alt={show.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Show Info */}
                                    <div className="p-6 bg-white">
                                        <h3 className="text-xl font-serif font-bold mb-3">
                                            {show.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
                                            <time dateTime={show.promotionDate}>
                                                {formatDate(show.promotionDate)}
                                            </time>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">No hay espectáculos registrados para esta murga.</p>
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="border-t mt-12 pt-8">
                    <Link
                        href={`/categorias/murgas/${slug}`}
                        className="inline-flex items-center gap-2 text-black hover:underline"
                    >
                        ← Volver a {murgaData.name}
                    </Link>
                </div>
            </div>
        </div>
    );
}
