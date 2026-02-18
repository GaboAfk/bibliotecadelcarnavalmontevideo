import Image from 'next/image';
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function NuestraBibliotecaPage() {
    return (
        <div>

            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] bg-black overflow-hidden">
                <ImageWithFallback
                    src="/plaza-cagancha.jpg"
                    alt="Plaza Cagancha - Montevideo"
                    fill
                    className="object-cover"
                    fallbackSrc="https://mediospublicos.uy/wp-content/uploads/20230119_ZINA_8030-1005x670.jpg"
                />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="bg-white pt-10 pb-10">
                <div className="max-w mx-auto px-20">
                    <h1 className="text-4xl mb-8 font-serif">Nuestra Biblioteca</h1>
                    <div className="space-y-4 text-lg leading-relaxed">
                        <p>
                            La Biblioteca Oficial del Carnaval Montevideano es un espacio dedicado a la preservación,
                            investigación y difusión de la memoria del carnaval uruguayo.
                        </p>
                        <p>
                            Nuestro acervo incluye documentos históricos, fotografías, grabaciones audiovisuales,
                            partituras, textos de espectáculos y testimonios orales que dan cuenta de más de siglo
                            de tradición carnavalera.
                        </p>
                        <p>
                            Trabajamos día a día para poner en valor este patrimonio cultural invaluable, haciéndolo
                            accesible a investigadores, estudiantes, artistas y al público en general.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}