'use client'

import { useCarnaval2026Data } from '@/hooks/useData';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export default function Carnaval2026Page() {
    const { menciones, puntajes, edicion2026, loading, error } = useCarnaval2026Data();

    // Show loading state if data is still loading or if no 2026 edition found yet
    if (loading || !edicion2026) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                        <p className="mt-4 text-gray-600">Cargando resultados...</p>
                    </div>
                </div>
            </div>
        );
    }

    const title = edicion2026?.title || "Carnaval 2026";
    const intro = edicion2026?.intro || "Resultados y menciones del Carnaval 2026";
    const image = edicion2026?.image || "/images/carnaval-2026-hero.jpg";
    const alt = edicion2026?.alt || "Carnaval 2026";

    if (error) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-serif mb-4 text-red-600">Error</h1>
                        <p className="text-gray-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Group puntajes by category
    const categoriasPuntajes = [
        { label: "Murgas", items: puntajes.filter(p => p.categoria === "murgas") },
        { label: "Parodistas", items: puntajes.filter(p => p.categoria === "parodistas") },
        { label: "Sociedades de Negros y Lubolos", items: puntajes.filter(p => p.categoria === "sociedades") },
        { label: "Humoristas", items: puntajes.filter(p => p.categoria === "humoristas") },
        { label: "Revistas", items: puntajes.filter(p => p.categoria === "revistas") },
    ];

    // Group menciones by type
    const mencionesDirectas = menciones.filter(m => m.tipo === 'directa');
    const mencionesTecnicasDirectas = menciones.filter(m => m.tipo === 'tecnica_directa');
    const mencionesTecnicasNominacion = menciones.filter(m => m.tipo === 'tecnica_nominacion');
    const mencionesColectivas = menciones.filter(m => m.tipo === 'colectiva');
    const mencionesIndividuales = menciones.filter(m => m.tipo === 'individual');

    // Group technical mentions by section
    const mencionesTecnicasDirectasGrouped = mencionesTecnicasDirectas.reduce((acc, m) => {
        if (m.seccion) {
            if (!acc[m.seccion]) {
                acc[m.seccion] = [];
            }
            acc[m.seccion].push({
                categoria: m.categoria || '',
                ganadores: m.ganadores
            });
        }
        return acc;
    }, {} as Record<string, Array<{ categoria: string, ganadores: string[] }>>);

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] bg-black overflow-hidden">
                <ImageWithFallback
                    src={image}
                    alt={alt}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="bg-white pt-10 pb-10">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl mb-4 font-serif">{title}</h1>
                    <p className="text-lg mb-10 text-gray-600">{intro}</p>

                    {/* Only show content when we have data */}
                    {menciones.length > 0 || puntajes.length > 0 ? (
                        <>
                            {/* Puntajes */}
                            {puntajes.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-serif mb-6">Puntajes</h2>
                                    <div className="space-y-8">
                                        {categoriasPuntajes.map((cat) => (
                                            <div key={cat.label}>
                                                <h3 className="text-lg font-semibold mb-3 border-b pb-1">{cat.label}</h3>
                                                <ol className="space-y-1">
                                                    {cat.items.map((item, i) => (
                                                        <li key={i} className="flex justify-between items-center text-base px-2 py-1 rounded hover:bg-gray-100 transition-colors group">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs text-gray-400 w-5 text-right group-hover:text-gray-600">{item.puesto}°</span>
                                                                <span>{item.nombre}</span>
                                                            </div>
                                                            <span className="text-gray-500 group-hover:text-gray-800">{item.puntos} pts</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {/* Menciones directas */}
                            {mencionesDirectas.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-serif mb-6">Menciones Directas</h2>
                                    <div className="space-y-2">
                                        {mencionesDirectas.map((m, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                                                <span className="font-medium">{m.titulo}</span>
                                                <span className="text-gray-600">{m.ganadores.join(", ")}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Menciones técnicas directas */}
                            {mencionesTecnicasDirectas.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-serif mb-6">Menciones Técnicas Directas</h2>
                                    <div className="space-y-8">
                                        {Object.entries(mencionesTecnicasDirectasGrouped).map(([seccion, items]) => (
                                            <div key={seccion} className="bg-gray-50 rounded-lg p-5">
                                                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-800 mb-3">{seccion}</h3>
                                                <div className="space-y-2">
                                                    {items.map((m, j) => (
                                                        <div key={j} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-2 last:border-0">
                                                            <span className="font-medium text-sm text-gray-500">{m.categoria}</span>
                                                            <span className="text-sm">{m.ganadores.join(", ")}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Menciones técnicas con nominación */}
                            {mencionesTecnicasNominacion.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-serif mb-6">Menciones Técnicas Con Nominación</h2>
                                    <div className="space-y-2">
                                        {mencionesTecnicasNominacion.map((m, i) => (
                                            <div key={i} className="border-b py-2">
                                                <span className="font-medium">{m.titulo}: </span>
                                                <span className="text-gray-600">{m.ganadores.join(", ")}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Menciones colectivas */}
                            {mencionesColectivas.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-serif mb-6">Menciones Colectivas</h2>
                                    <div className="space-y-2">
                                        {mencionesColectivas.map((m, i) => (
                                            <div key={i} className="border-b py-2">
                                                <span className="font-medium">{m.titulo}: </span>
                                                <span className="text-gray-600">{m.ganadores.join(", ")}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Menciones individuales */}
                            {mencionesIndividuales.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-serif mb-6">Menciones Individuales</h2>
                                    <div className="space-y-2">
                                        {mencionesIndividuales.map((m, i) => (
                                            <div key={i} className="border-b py-2">
                                                <span className="font-medium">{m.titulo}: </span>
                                                <span className="text-gray-600">{m.ganadores.join(", ")}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            <p className="mt-4 text-gray-600">Cargando contenido...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}