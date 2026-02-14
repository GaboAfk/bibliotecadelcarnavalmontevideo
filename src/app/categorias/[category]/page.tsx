import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: {
        category: string;
    };
}

const categoryNames: Record<string, string> = {
    humoristas: "Humoristas",
    parodistas: "Parodistas",
    revistas: "Revistas",
    sociedades: "Sociedad de negros y lubolos",
};

export default function CategoryPlaceholderPage({ params }: CategoryPageProps) {
    const categoryName = categoryNames[params.category];

    if (!categoryName) {
        notFound();
    }

    return (
        <div className="bg-white pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-4xl mb-8 font-serif">{categoryName}</h1>
                <p className="text-lg leading-relaxed mb-8">
                    Esta sección está en desarrollo. Pronto encontrarás aquí información completa sobre {categoryName.toLowerCase()}.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}