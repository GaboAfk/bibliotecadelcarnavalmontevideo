import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";

// ─── Data ─────────────────────────────────────────────────────
const murgas: Record<string, string[]> = {
    A: [
        "Agarrate Catalina",
        "Antimurga BCG",
        "Araca la Cana",
        "Asaltantes con Patente",
    ],
    B: ["Bal Condal"],
    C: [
        "Cayó la Cabra",
        "Contrafarsa",
        "Curtidores de Hongos",
    ],
    D: [
        "Diablos Verdes",
        "Don Timoteo",
        "Doña Bastarda",
    ],
    F: ["Falta y Resto"],
    L: [
        "La Antimurga Joven",
        "La Clave",
        "La Gran Muñeca",
        "La Margarita",
        "La Mojigata",
        "Los Aristócratas",
        "Los Choby Choby",
        "Los Diablos Verdes",
        "Los Diablos",
        "Los Enchufados",
        "Los Guardiola",
        "Los Muchachos",
    ],
    M: [
        "Metele que son Pasteles",
        "Momolandia",
    ],
    N: ["Nazarenos"],
    P: ["Patos Cabreros"],
    Q: ["Queso Magro"],
    R: ["Reina de la Teja"],
    S: ["Sacate el Pulover", "Salpicón"],
    V: ["Vengador Anónimo"],
    Z: ["Zíngaros"],
};

function slugify(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export default function MurgasPage() {
    const letters = Object.keys(murgas).sort();

    return (
        <div className="bg-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1701974832971-785ff3b3ef49?w=1200&q=80"
                        alt="Murgas en escenario"
                        fill
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                    {/* Badge */}
                    <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Doña Bastarda:</strong> Primer premio de la categoría Murgas, Carnaval 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-4xl mb-12">
                    <h1 className="text-4xl mb-6 font-serif">Murgas</h1>
                    <p className="text-lg leading-relaxed mb-4">
                        La murga es uno de los géneros más emblemáticos del carnaval uruguayo. Surgida a principios del siglo XX
                        con influencias europeas, la murga se caracteriza por su coro de voces masculinas, su crítica social
                        incisiva y su humor popular.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        Con instrumentos de percusión como bombo, platillos y redoblante, las murgas presentan espectáculos que
                        combinan música, poesía, teatro y crítica social.
                    </p>
                </div>

                {/* Alphabet grid */}
                <div>
                    <h2 className="text-2xl mb-8 font-serif">Explorá nuestro archivo de murgas:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200">
                        {letters.map((letter) => (
                            <div
                                key={letter}
                                className="bg-white p-5 hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-2xl font-bold mb-3 text-black transition-all duration-200 cursor-default">{letter}</div>
                                <ul className="space-y-1">
                                    {murgas[letter].map((name) => (
                                        <li key={name}>
                                            <Link
                                                href={`/categorias/murgas/${slugify(name)}`}
                                                className="block py-1 text-black hover:scale-90 hover:font-black cursor-default transition-all "
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}