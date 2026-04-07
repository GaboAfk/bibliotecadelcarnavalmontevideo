import { carnaval2026 } from '@/data/carnaval2026';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export default function Carnaval2026Page() {
    const { title, intro, puntajes, mencionesDirectas, mencionesTecnicasDirectas, mencionesTecnicasNominacion, mencionesColectivas, mencionesIndividuales } = carnaval2026;

    const categoriasPuntajes = [
        { label: "Murgas", items: puntajes.murgas },
        { label: "Parodistas", items: puntajes.parodistas },
        { label: "Sociedades de Negros y Lubolos", items: puntajes.sociedades },
        { label: "Humoristas", items: puntajes.humoristas },
        { label: "Revistas", items: puntajes.revistas },
    ];

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] bg-black overflow-hidden">
                <ImageWithFallback
                    src={carnaval2026.image}
                    alt={carnaval2026.alt}
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

                    {/* Puntajes */}
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

                    {/* Menciones directas */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-serif mb-6">Menciones Directas</h2>
                        <div className="space-y-2">
                            {mencionesDirectas.map((m, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                                    <span className="font-medium">{m.titulo}</span>
                                    <span className="text-gray-600">{m.ganador}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Menciones técnicas directas */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-serif mb-6">Menciones Técnicas Directas</h2>
                        <div className="space-y-8">
                            {mencionesTecnicasDirectas.map((grupo, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-5">
                                    <h3 className="text-base font-semibold uppercase tracking-wide text-gray-800 mb-3">{grupo.seccion}</h3>
                                    <div className="space-y-2">
                                        {grupo.items.map((m, j) => (
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

                    {/* Menciones técnicas con nominación */}
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

                    {/* Menciones colectivas */}
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

                    {/* Menciones individuales */}
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
                </div>
            </div>
        </div>
    );
}