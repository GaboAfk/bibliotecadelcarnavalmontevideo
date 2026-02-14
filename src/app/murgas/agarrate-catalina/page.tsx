import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function MurgaIndividualPage() {
    const menuItems = [
        "Historia",
        "Espectáculos",
        "Posiciones",
        "Discografía",
        "Trivia",
        "Galería",
        "Información",
    ];

    return (
        <div className="bg-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mb-8 text-sm">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span className="hover:underline cursor-pointer">Categorías</span>
                    <ChevronRight size={16} />
                    <Link href="/categorias/murgas" className="hover:underline">Murgas</Link>
                    <ChevronRight size={16} />
                    <span>Agarrate Catalina</span>
                </nav>

                {/* Hero */}
                <div className="relative h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1637862666931-be59da5dd8ca?w=1200&q=80"
                        alt="Agarrate Catalina"
                        fill
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                        <h1 className="text-4xl md:text-6xl text-white mb-4 font-serif">Agarrate Catalina</h1>
                    </div>
                </div>

                {/* Historia */}
                <div className="max-w-4xl mb-12">
                    <h2 className="text-3xl mb-6 font-serif">Historia</h2>
                    <p className="text-lg leading-relaxed mb-4">
                        Fundada en el año 2001, Agarrate Catalina irrumpió en el carnaval uruguayo con una propuesta fresca y
                        renovadora que rápidamente conquistó al público. Con su estilo único y su compromiso con la calidad artística,
                        la murga se estableció como una de las más importantes del panorama carnavalero nacional.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        A lo largo de su trayectoria, Agarrate Catalina ha cosechado numerosos premios en el Concurso Oficial,
                        incluyendo primeros premios en los años 2005, 2006, 2008, 2011 y 2020.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Más allá de las fronteras nacionales, Agarrate Catalina se ha convertido en embajadora de la cultura
                        carnavalesca uruguaya, llevando sus espectáculos a diversos escenarios internacionales.
                    </p>
                </div>

                {/* Descubrí Section */}
                <div>
                    <h2 className="text-3xl mb-8 font-serif">Descubrí</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={`/murgas/agarrate-catalina/${item.toLowerCase()}`}
                                className="bg-gray-200 hover:bg-gray-300 transition-colors py-8 px-6 rounded-lg text-center text-lg"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}