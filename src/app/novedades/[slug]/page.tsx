import Link from "next/link";
import { ChevronRight } from "lucide-react";
// import { useNovedades } from "@/hooks/useData";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { NovedadesSection } from "@/components/NovedadesSection";
import { fetchNovedades } from "@/lib/data-queries";

interface NovedadPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function NovedadPage({ params }: NovedadPageProps) {
    const { slug } = await params;
    const novedades = await fetchNovedades();
    const novedad = novedades.find(n => n.id === slug);

    if (!novedad) {
        return (
            <div className="pt-32 pb-16 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-serif font-bold">Novedad no encontrada</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">{novedad.title}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <Link href="/novedades" className="hover:underline">Novedades</Link>
                    <ChevronRight size={16} />
                    <span>{novedad.title}</span>
                </nav>

                {/* Hero Image */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src={novedad.image || '/logo_default.png'}
                        alt={novedad.title}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: novedad.color || '#000' }}></span>
                            <time dateTime={novedad.date || ''}>
                                {new Date(novedad.date || '').toLocaleDateString('es-UY', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-12">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            {novedad.description}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {novedad.content}
                        </p>
                    </div>
                </div>

                {/* Novedades Section */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <NovedadesSection />
                </div>
            </div>
        </div>
    );
}
