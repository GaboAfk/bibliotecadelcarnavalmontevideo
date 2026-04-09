"use client";

import { murgasData } from "@/data/murgas";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { fetchAgrupacionBySlug, fetchShowBySlug, fetchStaffByShow, fetchShowRepertory } from "@/lib/data-queries";
import { Agrupacion, Show, Staff, ShowRepertory } from "@/lib/supabase-client";

type ShowDetailPageProps = {
    params: Promise<{
        slug: string;
        showName: string;
    }>;
};

type SectionType = "repertorio" | "galeria" | "datos";

export default function ShowDetailPage({ params }: ShowDetailPageProps) {
    const router = useRouter();
    const { slug, showName } = React.use(params);
    console.log("slug", slug);
    console.log("showName", showName);

    const [agrupacion, setAgrupacion] = useState<Agrupacion | null>(null);
    const [show, setShow] = useState<Show | null>(null);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [repertory, setRepertory] = useState<ShowRepertory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Obtener el show usando showName (que es el slug del show)
                const showData = await fetchShowBySlug(showName);
                console.log("showData", showData);

                if (!showData) {
                    console.error("Show not found");
                    setLoading(false);
                    return;
                }

                // Obtener agrupación, staff y repertory en paralelo
                const [agrupacionData, staffData, repertoryData] = await Promise.all([
                    fetchAgrupacionBySlug(slug),
                    fetchStaffByShow(showData.id),
                    fetchShowRepertory(showData.id)
                ]);

                console.log("agrupacionData", agrupacionData);
                console.log("staffData", staffData);
                console.log("repertoryData", repertoryData);

                setAgrupacion(agrupacionData);
                setShow(showData);
                setStaff(staffData);
                setRepertory(repertoryData);
            } catch (error) {
                console.error('Error loading show data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [showName]);

    console.log("show.image", show?.image);
    // console.log("staff", staff);
    // console.log("repertory", repertory);

    // console.log("agrupación", agrupacion?.name);

    // console.log("repertory", repertory);

    const [expandedSections, setExpandedSections] = useState<Record<SectionType, boolean>>({
        repertorio: true,
        galeria: false,
        datos: false,
    });

    const [selectedRepertoireItem, setSelectedRepertoireItem] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(0);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const mainSwiperRef = useRef<SwiperType | null>(null);

    if (loading) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Cargando...</h1>
                </div>
            </div>
        );
    }

    if (!show) {
        return (
            <div className="bg-white pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl mb-6 font-serif">Espectáculo no encontrado</h1>
                    <p className="text-lg mb-8">El espectáculo que buscas no existe en nuestro archivo.</p>
                    <button
                        onClick={() => router.back()}
                        className="text-black hover:underline"
                    >
                        ← Volver
                    </button>
                </div>
            </div>
        );
    }

    const toggleSection = (section: SectionType) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const sections: { id: SectionType; label: string; hasContent: boolean }[] = [
        { id: "repertorio", label: "Repertorio", hasContent: !!repertory?.length },
        { id: "galeria", label: "Galería", hasContent: !!show.gallery?.length },
        { id: "datos", label: "Datos", hasContent: !!show.data },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-UY", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">
                        {agrupacion?.name}: {show.title} {show.year ? `(${show.year})` : ""}
                    </h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600 flex-wrap">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <Link href="/categorias/murgas" className="hover:underline">Murgas</Link>
                    <ChevronRight size={16} />
                    <Link href={`/categorias/murgas/${slug}`} className="hover:underline">
                        {agrupacion?.name}
                    </Link>
                    <ChevronRight size={16} />
                    <Link href={`/categorias/murgas/${slug}/espectaculos`} className="hover:underline">
                        Espectáculos
                    </Link>
                    <ChevronRight size={16} />
                    <span>{show.title}</span>
                </nav>

                {/* Image and Credits - Center Top */}
                <div className="grid md:grid-cols-2 gap-8 mt-2 mb-12">
                    {/* Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative h-96 w-full rounded-lg overflow-hidden">
                            <ImageWithFallback
                                src={show.image || ""}
                                alt={`${show.title} en escenario`}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Credits */}
                    {staff && staff.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 text-xs space-y-2">
                            {staff.map((member, index) => (
                                <div key={index}>
                                    <span className="font-semibold text-black">{member.role}:</span>
                                    <span className="text-gray-700 ml-1">{member.names.join(", ")}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Content Grid - Sidebar Left, Content Right */}
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1">
                        {/* Sections Navigation */}
                        <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                            <h3 className="text-lg font-serif font-bold mb-4">Secciones</h3>
                            <div className="space-y-2">
                                {sections.map((section) => (
                                    <div key={section.id}>
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            disabled={!section.hasContent}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${expandedSections[section.id] ? "bg-black text-white" : section.hasContent ? "hover:bg-gray-200 text-black" : "text-gray-400 cursor-not-allowed"} ${!section.hasContent ? "opacity-50" : ""}`}
                                        >
                                            <span>{section.label}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform ${expandedSections[section.id] ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Repertorio Submenu */}
                                        {section.id === "repertorio" && expandedSections.repertorio && repertory && (
                                            <div className="mt-2 space-y-1 pl-2">
                                                {repertory.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedRepertoireItem(index)}
                                                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedRepertoireItem === index
                                                            ? "bg-black text-white"
                                                            : "hover:bg-gray-200 text-black"
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:col-span-3">
                        {/* Repertorio */}
                        {expandedSections.repertorio && repertory && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Repertorio</h2>
                                <div className="bg-gray-50 rounded-lg p-8">
                                    <h3 className="text-2xl font-semibold mb-4">
                                        {repertory[selectedRepertoireItem].title}
                                    </h3>
                                    <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line text-center">
                                        {repertory[selectedRepertoireItem].lyrics || repertory[selectedRepertoireItem].content}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Galería */}
                        {expandedSections.galeria && show.gallery && show.gallery.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-serif mb-6">Galería</h2>

                                {/* Lightbox Modal with Swiper */}
                                {isLightboxOpen && (
                                    <div
                                        className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
                                        onClick={(e) => {
                                            if (e.target === e.currentTarget) {
                                                setIsLightboxOpen(false);
                                            }
                                        }}
                                        role="dialog"
                                        aria-modal="true"
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={() => setIsLightboxOpen(false)}
                                            className="absolute top-6 right-6 text-white hover:text-gray-300 text-2xl z-50"
                                            aria-label="Cerrar galería"
                                        >
                                            ✕
                                        </button>

                                        {/* Main Swiper */}
                                        <div
                                            className="w-full max-w-6xl mb-8"
                                            style={{
                                                '--swiper-navigation-color': '#ffffff',
                                                '--swiper-navigation-size': '24px',
                                            } as React.CSSProperties}
                                        >
                                            <style>{`
                                                .swiper-button-prev,
                                                .swiper-button-next {
                                                    display: none !important;
                                                }
                                            `}</style>
                                            <Swiper
                                                modules={[Thumbs]}
                                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                                initialSlide={selectedGalleryIndex}
                                                loop={true}
                                                onSwiper={(swiper) => {
                                                    mainSwiperRef.current = swiper;
                                                }}
                                                onSlideChange={(swiper) => {
                                                    setSelectedGalleryIndex(swiper.realIndex);
                                                    if (thumbsSwiper) {
                                                        thumbsSwiper.slideTo(swiper.realIndex);
                                                    }
                                                }}
                                                className="h-[70vh] rounded-lg overflow-hidden relative"
                                            >
                                                {show.gallery.map((image, index) => (
                                                    <SwiperSlide key={index} className="flex items-center justify-center bg-black">
                                                        <div className="relative w-full h-full">
                                                            <ImageWithFallback
                                                                src={image}
                                                                alt={`Galería ${index + 1}`}
                                                                fill
                                                                priority={index === selectedGalleryIndex}
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                                {/* Custom Navigation Buttons */}
                                                <button
                                                    onClick={() => mainSwiperRef.current?.slidePrev()}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-lg border border-black hover:bg-black hover:text-white transition-all"
                                                    aria-label="Imagen anterior"
                                                >
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button
                                                    onClick={() => mainSwiperRef.current?.slideNext()}
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-lg border border-black hover:bg-black hover:text-white transition-all"
                                                    aria-label="Imagen siguiente"
                                                >
                                                    <ChevronRight size={24} />
                                                </button>
                                            </Swiper>
                                        </div>

                                        {/* Thumbnails Swiper */}
                                        <div className="w-full px-4 flex items-center justify-center">
                                            <Swiper
                                                onSwiper={setThumbsSwiper}
                                                modules={[Thumbs]}
                                                spaceBetween={8}
                                                slidesPerView="auto"
                                                freeMode
                                                watchSlidesProgress
                                                loop={true}
                                                centeredSlides={true}
                                                className="w-full max-w-4xl"
                                            >
                                                {show.gallery.map((image, index) => (
                                                    <SwiperSlide
                                                        key={index}
                                                        className="!w-16 !h-16 sm:!w-20 sm:!h-20 flex-shrink-0"
                                                        onClick={() => {
                                                            setSelectedGalleryIndex(index);
                                                        }}
                                                    >
                                                        <div className={`relative w-full h-full rounded-lg overflow-hidden cursor-pointer flex items-center justify-center transition-all ${index === selectedGalleryIndex
                                                            ? "border-2 border-white shadow-lg"
                                                            : "border-2 border-transparent hover:border-gray-400"
                                                            }`}>
                                                            <ImageWithFallback
                                                                src={image}
                                                                alt={`Thumbnail ${index + 1}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                )}

                                {/* Gallery Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {show.gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedGalleryIndex(index);
                                                setIsLightboxOpen(true);
                                            }}
                                            className="relative h-40 rounded-lg overflow-hidden group cursor-pointer"
                                        >
                                            <ImageWithFallback
                                                src={image}
                                                alt={`Galería ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )
                        }

                        {/* Datos */}
                        {
                            expandedSections.datos && show.data && (
                                <section className="mb-12">
                                    <h2 className="text-3xl font-serif mb-6">Datos</h2>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                                            {show.data}
                                        </p>
                                    </div>
                                </section>
                            )
                        }
                    </div >
                </div >

                {/* Back Button */}
                < div className="border-t pt-8" >
                    <Link
                        href={`/categorias/murgas/${slug}/espectaculos`}
                        className="inline-flex items-center gap-2 text-black hover:underline"
                    >
                        ← Volver a Espectáculos
                    </Link>
                </div >
            </div >
        </div >
    );
}
