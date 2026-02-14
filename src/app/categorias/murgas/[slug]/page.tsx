"use client";

import { murgasData } from "@/data/murgas";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "next/navigation";
import React from "react";

type MurgaPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function MurgaDetailPage({ params }: MurgaPageProps) {
    const router = useRouter();
    const { slug } = React.use(params);
    const murgaData = murgasData[slug];

    if (!murgaData) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Murga no encontrada</h1>
                    <p className="text-lg mb-8">La murga que buscas no existe en nuestro archivo.</p>
                    <button
                        onClick={() => router.back()}
                        className="text-black hover:underline"
                    >
                        ← Volver a Murgas
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/" className="text-black hover:underline">Inicio</Link>
                    <span className="mx-2">/</span>
                    <Link href="/categorias" className="text-black hover:underline">Categorías</Link>
                    <span className="mx-2">/</span>
                    <Link href="/categorias/murgas" className="text-black hover:underline">Murgas</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-600">{murgaData.name}</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1701974832971-785ff3b3ef49?w=1200&q=80"
                        alt={`${murgaData.name} en escenario`}
                        fill
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-5xl md:text-6xl font-black text-white text-center uppercase tracking-wider">
                            {murgaData.name}
                        </h1>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-serif mb-6">Historia</h2>
                            <p className="text-lg leading-relaxed mb-6">
                                {murgaData.history}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-serif mb-6">Repertorio</h2>
                            <div className="space-y-4">
                                {murgaData.repertoire.map((work, index) => (
                                    <div key={index} className="border-l-4 border-black pl-4">
                                        <h3 className="text-xl font-semibold mb-2">{work}</h3>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-xl font-serif mb-4">Descripción</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {murgaData.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-serif mb-4">Logros</h3>
                            <ul className="space-y-2">
                                {murgaData.achievements.map((achievement, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Back Button */}
                <div className="border-t pt-8">
                    <Link
                        href="/categorias/murgas"
                        className="inline-flex items-center gap-2 text-black hover:underline"
                    >
                        ← Volver a todas las murgas
                    </Link>
                </div>
            </div>
        </div>
    );
}
