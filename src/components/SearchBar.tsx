"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { murgasData } from "@/data/murgas";
import { humoristasData } from "@/data/humoristas";
import { parodistasData } from "@/data/parodistas";
import { revistasData } from "@/data/revistas";
import { sociedadesData } from "@/data/sociedades";

interface SearchResult {
    id: string;
    title: string;
    category: string;
    type: "category" | "show";
    href: string;
}

interface SearchBarProps {
    onSelect?: () => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const allResults = useMemo(() => {
        const results: SearchResult[] = [];

        // Add categories
        const categories = [
            { name: "Murgas", href: "/categorias/murgas", data: murgasData },
            { name: "Humoristas", href: "/categorias/humoristas", data: humoristasData },
            { name: "Parodistas", href: "/categorias/parodistas", data: parodistasData },
            { name: "Revistas", href: "/categorias/revistas", data: revistasData },
            { name: "Sociedades", href: "/categorias/sociedades", data: sociedadesData },
        ];

        // Add category results
        categories.forEach((cat) => {
            results.push({
                id: cat.name.toLowerCase(),
                title: cat.name,
                category: "Categoría",
                type: "category",
                href: cat.href,
            });
        });

        // Add items and shows from each category
        Object.entries(murgasData).forEach(([slug, data]) => {
            results.push({
                id: `murga-${slug}`,
                title: data.name,
                category: "Murga",
                type: "category",
                href: `/categorias/murgas/${slug}`,
            });

            data.shows.forEach((show) => {
                results.push({
                    id: `murga-show-${slug}-${show.id}`,
                    title: `${show.title} - ${data.name}`,
                    category: "Espectáculo",
                    type: "show",
                    href: `/categorias/murgas/${slug}/espectaculos/${show.id}`,
                });
            });
        });

        Object.entries(humoristasData).forEach(([slug, data]) => {
            results.push({
                id: `humorista-${slug}`,
                title: data.name,
                category: "Humorista",
                type: "category",
                href: `/categorias/humoristas/${slug}`,
            });

            data.shows.forEach((show) => {
                results.push({
                    id: `humorista-show-${slug}-${show.id}`,
                    title: `${show.title} - ${data.name}`,
                    category: "Espectáculo",
                    type: "show",
                    href: `/categorias/humoristas/${slug}/espectaculos/${show.id}`,
                });
            });
        });

        Object.entries(parodistasData).forEach(([slug, data]) => {
            results.push({
                id: `parodista-${slug}`,
                title: data.name,
                category: "Parodista",
                type: "category",
                href: `/categorias/parodistas/${slug}`,
            });

            data.shows.forEach((show) => {
                results.push({
                    id: `parodista-show-${slug}-${show.id}`,
                    title: `${show.title} - ${data.name}`,
                    category: "Espectáculo",
                    type: "show",
                    href: `/categorias/parodistas/${slug}/espectaculos/${show.id}`,
                });
            });
        });

        Object.entries(revistasData).forEach(([slug, data]) => {
            results.push({
                id: `revista-${slug}`,
                title: data.name,
                category: "Revista",
                type: "category",
                href: `/categorias/revistas/${slug}`,
            });

            data.shows.forEach((show) => {
                results.push({
                    id: `revista-show-${slug}-${show.id}`,
                    title: `${show.title} - ${data.name}`,
                    category: "Espectáculo",
                    type: "show",
                    href: `/categorias/revistas/${slug}/espectaculos/${show.id}`,
                });
            });
        });

        Object.entries(sociedadesData).forEach(([slug, data]) => {
            results.push({
                id: `sociedad-${slug}`,
                title: data.name,
                category: "Sociedad",
                type: "category",
                href: `/categorias/sociedades/${slug}`,
            });

            data.shows.forEach((show) => {
                results.push({
                    id: `sociedad-show-${slug}-${show.id}`,
                    title: `${show.title} - ${data.name}`,
                    category: "Espectáculo",
                    type: "show",
                    href: `/categorias/sociedades/${slug}/espectaculos/${show.id}`,
                });
            });
        });

        return results;
    }, []);

    const filteredResults = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        return allResults
            .filter((result) =>
                result.title.toLowerCase().includes(lowerQuery) ||
                result.category.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 10);
    }, [query, allResults]);

    return (
        <div className="relative">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar categoría o espectáculo..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-72 px-4 py-2 pl-10 text-sm border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {isOpen && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {filteredResults.map((result) => (
                        <Link
                            key={result.id}
                            href={result.href}
                            onClick={() => {
                                setQuery("");
                                setIsOpen(false);
                                onSelect?.();
                            }}
                            className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-black">{result.title}</p>
                                    <p className="text-xs text-gray-500">{result.category}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isOpen && query && filteredResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
                    <p className="text-sm text-gray-500 text-center">No se encontraron resultados</p>
                </div>
            )}
        </div>
    );
}
