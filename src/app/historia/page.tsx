import { ImageWithFallback } from "@/components/ImageWithFallback";
import { fetchStaticContent } from "@/lib/data-queries";

export default async function HistoriaPage() {
    const historia = await fetchStaticContent("historia");

    return (
        <div>
            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] bg-black overflow-hidden">
                <ImageWithFallback
                    src={historia?.image || "/plaza-cagancha.jpg"}
                    alt="Historia del Carnaval Montevideano"
                    fill
                    className="object-cover"
                    fallbackSrc="https://mediospublicos.uy/wp-content/uploads/20230119_ZINA_8030-1005x670.jpg"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="bg-white pt-10 pb-10">
                <div className="max-w mx-auto px-20">
                    <h1 className="text-4xl mb-8 font-serif">{historia?.title || "Historia del Carnaval"}</h1>
                    <div className="space-y-4 text-lg leading-relaxed">
                        {historia?.body?.split("\n\n").map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
