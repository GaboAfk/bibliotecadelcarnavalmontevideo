import Link from "next/link";
import { slugify } from "@/lib/utils";
import { fetchAgrupacionesByCategory } from "@/lib/data-queries";

interface AlphabetGridProps {
    category: string;
    baseUrl: string;
    title: string;
    availableItems?: string[]; // Items that have detailed data and should be clickable
}



export async function AlphabetGrid({ category, baseUrl, title, availableItems }: AlphabetGridProps) {

    const data = await fetchAgrupacionesByCategory(category);
    console.log("category", category);
    console.log("data", data);

    // Agrupar por letra inicial
    const groupedByLetter = data.reduce((acc, item) => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(item);
        return acc;
    }, {} as Record<string, any[]>);
    // console.log("groupedByLetter", groupedByLetter);
    const allNames = Object.values(groupedByLetter).flat().map(item => item.name);
    console.log("agrupaciones", allNames);
    const letters = Object.keys(groupedByLetter).sort();

    return (
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl mb-8 font-serif">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-300">
                {letters.map((letter) => (
                    <div
                        key={letter}
                        className="bg-gray-50 p-5 hover:bg-gray-100 transition-colors"
                    >
                        <div className="text-2xl font-bold mb-3 text-black transition-all duration-200 cursor-default">{letter}</div>
                        <ul className="space-y-1">
                            {groupedByLetter[letter].map((item) => {
                                const isAvailable = availableItems?.includes(item.name);
                                if (isAvailable) {
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={`${baseUrl}/${slugify(item.name)}`}
                                                className="block py-1 text-black hover:scale-90 hover:font-black cursor-pointer transition-all "
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={item.name}>
                                            <span className="block py-1 text-gray-400 cursor-not-allowed">
                                                {item.name}
                                            </span>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
