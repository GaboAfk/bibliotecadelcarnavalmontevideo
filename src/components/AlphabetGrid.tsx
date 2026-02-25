"use client";

import Link from "next/link";

interface AlphabetGridProps {
    data: Record<string, string[]>;
    baseUrl: string;
    title: string;
    slugify: (name: string) => string;
}

export function AlphabetGrid({ data, baseUrl, title, slugify }: AlphabetGridProps) {
    const letters = Object.keys(data).sort();

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
                            {data[letter].map((name) => (
                                <li key={name}>
                                    <Link
                                        href={`${baseUrl}/${slugify(name)}`}
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
    );
}
