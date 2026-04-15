import { ImageWithFallback } from "@/components/ImageWithFallback";
import { fetchStaticContent } from "@/lib/data-queries";

export default async function NuestraBibliotecaPage() {
    const nuestraBiblioteca = await fetchStaticContent("nuestra-biblioteca");

    return (
        <div>

            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] bg-black overflow-hidden">
                <ImageWithFallback
                    src={nuestraBiblioteca?.image || "/plaza-cagancha.jpg"}
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
                    <h1 className="text-4xl mb-8 font-serif">{nuestraBiblioteca?.title || "Nuestra Biblioteca"}</h1>
                    <div className="space-y-4 text-lg leading-relaxed">
                        {nuestraBiblioteca?.body?.split("\n\n").map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}