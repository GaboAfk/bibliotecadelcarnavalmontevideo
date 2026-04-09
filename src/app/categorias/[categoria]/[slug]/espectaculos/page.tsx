"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "next/navigation";
import React from "react";
import { ChevronRight } from "lucide-react";
import { fetchShowsByAgrupacion, fetchAgrupacionBySlug } from "@/lib/data-queries";
import { Show, Agrupacion } from "@/lib/supabase-client";

type ShowPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function ShowsPage({ params }: ShowPageProps) {
    const router = useRouter();
    const { slug } = React.use(params);
    const [agrupacion, setAgrupacion] = React.useState<Agrupacion | null>(null);
    const [shows, setShows] = React.useState<Show[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const agrupacionData = await fetchAgrupacionBySlug(slug);

                if (!agrupacionData) {
                    setError('Agrupación no encontrada');
                    return;
                }

                setAgrupacion(agrupacionData);
                const showsData = await fetchShowsByAgrupacion(agrupacionData.id);
                setShows(showsData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">Cargando...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !agrupacion) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Espectáculos no encontrados</h1>
                    <p className="text-lg mb-8">{error || 'Los espectáculos de esta agrupación no existen en nuestro archivo.'}</p>
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
                        Espectáculos - {agrupacion.name}
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
                    <Link href={`/categorias/${agrupacion.category_slug}`} className="hover:underline capitalize">
                        {agrupacion.category_slug}
                    </Link>
                    <ChevronRight size={16} />
                    <Link href={`/categorias/${agrupacion.category_slug}/${slug}`} className="hover:underline">
                        {agrupacion.name}
                    </Link>
                    <ChevronRight size={16} />
                    <span>Espectáculos</span>
                </nav>

                {/* Shows Grid */}
                <div className="mt-12">
                    <style>{`
                        .triangle-badge {
                            clip-path: polygon(0 0, 100% 0, 50% 100%);
                        }
                        .show-card:hover .show-image {
                            transform: scale(1.05);
                        }
                    `}</style>
                    {shows.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {shows.map((show, index) => {
                                const isMiddleColumn = index % 3 === 1;
                                const accentColors = [
                                    { bg: '#fbbf24', text: '#000', name: 'yellow' },
                                    { bg: '#9333ea', text: '#fff', name: 'purple' },
                                    { bg: '#059669', text: '#fff', name: 'green' },
                                    { bg: '#db2777', text: '#fff', name: 'pink' },
                                ];
                                const colorIndex = index % accentColors.length;
                                const accent = accentColors[colorIndex];

                                return (
                                    <div key={show.id} className={`show-card group relative ${isMiddleColumn ? 'lg:mt-12' : ''}`}>
                                        <Link
                                            href={`/categorias/${agrupacion.category_slug}/${slug}/espectaculos/${show.slug}`}
                                            className="block"
                                        >
                                            {/* Show Image with Triangle Badge */}
                                            <div className="relative overflow-hidden rounded-xl shadow-xl bg-gray-200 aspect-[4/3] mb-6">
                                                <ImageWithFallback
                                                    src={show.image || '/placeholder.jpg'}
                                                    alt={show.title}
                                                    fill
                                                    className="show-image w-full h-full object-cover transition-transform duration-700 ease-out"
                                                />

                                                {/* Year Triangle Badge */}
                                                {show.year && (
                                                    <div className="absolute top-0 left-6 z-20">
                                                        <div
                                                            className="triangle-badge w-14 h-20 flex flex-col items-center pt-2 shadow-lg font-serif font-black text-sm tracking-tighter"
                                                            style={{ backgroundColor: accent.bg, color: accent.text }}
                                                        >
                                                            {show.year}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                    <button className="flex items-center gap-2 text-white font-semibold">
                                                        Ver Detalles →
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Show Info */}
                                            <div>
                                                <h3
                                                    className="text-2xl font-serif font-bold transition-colors"
                                                    style={{ color: accent.bg }}
                                                >
                                                    {show.title}
                                                </h3>
                                                <div
                                                    className="w-12 h-1 mt-3 group-hover:w-24 transition-all duration-500"
                                                    style={{ backgroundColor: accent.bg }}
                                                ></div>

                                                {show.promotion_date && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                                                        <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
                                                        <time dateTime={show.promotion_date}>
                                                            {formatDate(show.promotion_date)}
                                                        </time>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">No hay espectáculos registrados para esta agrupación.</p>
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="border-t mt-12 pt-8">
                    <Link
                        href={`/categorias/${agrupacion.category_slug}/${slug}`}
                        className="inline-flex items-center gap-2 text-black hover:underline"
                    >
                        ← Volver a {agrupacion.name}
                    </Link>
                </div>
            </div>
        </div>
    );
}
