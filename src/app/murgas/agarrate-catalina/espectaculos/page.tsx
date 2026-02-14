import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function EspectaculosPage() {
    const espectaculos = [
        { year: 2003, title: "El Debut", color: "#F5A623" },
        { year: 2004, title: "Segundo Aliento", color: "#417505" },
        { year: 2005, title: "Tercer Tiempo", color: "#FF69B4" },
        { year: 2006, title: "Cuatro Vientos", color: "#F8E71C" },
        { year: 2007, title: "La Quinta Estación", color: "#F5A623" },
        { year: 2008, title: "El Viaje", color: "#417505" },
        { year: 2010, title: "Diez Años", color: "#FF69B4" },
        { year: 2011, title: "Once por Todas", color: "#F8E71C" },
        { year: 2012, title: "El Refugio", color: "#F5A623" },
        { year: 2019, title: "La Vuelta", color: "#417505" },
        { year: 2020, title: "Veinte Veinte", color: "#FF69B4" },
        { year: 2021, title: "Resistencia", color: "#F8E71C" },
    ];

    return (
        <div className="bg-white pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl md:text-4xl mb-12 font-serif">Espectáculos de Agarrate Catalina</h1>

                {/* Timeline */}
                <div className="relative">
                    {/* Línea vertical */}
                    <div className="absolute left-12 md:left-20 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                    {espectaculos.map((show, index) => (
                        <div key={index} className="relative mb-16 pl-20 md:pl-32">
                            {/* Banderín triangular */}
                            <div
                                className="absolute left-0 w-16 md:w-24 h-12 md:h-16 flex items-center justify-center text-white text-base md:text-xl font-medium"
                                style={{
                                    backgroundColor: show.color,
                                    clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)",
                                }}
                            >
                                <span>{show.year}</span>
                            </div>

                            {/* Contenido */}
                            <Link
                                href={`/murgas/agarrate-catalina/espectaculos/${show.year}`}
                                className="block group"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl md:text-2xl group-hover:underline transition-all font-serif">{show.title}</h3>
                                </div>
                                <div className="rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow bg-gray-100 h-48 md:h-64 relative">
                                    <ImageWithFallback
                                        src={`https://images.unsplash.com/photo-${[
                                            "1767320618406-c03b1884e91a",
                                            "1701974832971-785ff3b3ef49",
                                            "1649142898818-f1648c41081b",
                                        ][index % 3]}?w=800&q=80`}
                                        alt={`${show.title} - ${show.year}`}
                                        fill
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}