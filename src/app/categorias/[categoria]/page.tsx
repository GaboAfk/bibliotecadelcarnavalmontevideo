import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import { NovedadesSection } from "@/components/NovedadesSection";
import { AlphabetGrid } from "@/components/AlphabetGrid";

import { fetchCategories, fetchAgrupacionesByCategory } from "@/lib/data-queries";

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
    const { categoria } = await params;
    const categories = await fetchCategories();
    const currentCategory = categories.find((category) => category.slug === categoria);

    // Si no se encuentra la categoría, mostrar página de error
    if (!currentCategory) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center px-6">
                    <div className="mb-8">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Categoría no encontrada
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            La categoría que buscas no existe. Por favor, selecciona una categoría válida desde el menú.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="border-t pt-8">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                Categorías disponibles:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categorias/${category.slug}`}
                                        className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <h4 className="font-medium text-gray-900 mb-2">
                                            {category.name}
                                        </h4>
                                        {category.info_image && (
                                            <div className="relative h-20 mb-2 rounded overflow-hidden">
                                                <ImageWithFallback
                                                    src={category.info_image}
                                                    alt={category.info_alt || category.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-600">
                                            Explorar {category.name.toLowerCase()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <ChevronRight className="rotate-180 mr-2" size={16} />
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const agrupaciones = await fetchAgrupacionesByCategory(categoria);
    const hasAgrupaciones = agrupaciones.length > 0;

    return (
        <div className="bg-white pt-28 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">{currentCategory?.name || 'Categoría'}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span className="">Categorías</span>
                    <ChevronRight size={16} />
                    <span>{currentCategory?.name || 'Categoría'}</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src={currentCategory?.info_image || ""}
                        alt={currentCategory?.info_alt || ""}
                        fill
                        className="object-cover "
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">{currentCategory?.info_badge}</p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12">
                    <p className="text-lg leading-relaxed mb-4 whitespace-pre-wrap">{currentCategory?.info_description}</p>
                </div>

                {hasAgrupaciones && (
                    <AlphabetGrid
                        category={categoria}
                        baseUrl={`/categorias/${categoria}`}
                        title={`Explorá nuestro archivo de ${currentCategory?.name?.toLowerCase() || 'categoría'}:`}
                    />
                )}
            </div>

            <NovedadesSection />
        </div>
    );
}