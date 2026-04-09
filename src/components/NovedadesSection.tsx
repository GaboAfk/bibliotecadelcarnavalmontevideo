"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNovedades } from '@/hooks/useData';
import { Novedad } from '@/lib/supabase-client';

export function NovedadesSection() {
    const { novedades, loading, error } = useNovedades();

    if (loading) {
        return (
            <section className="w-full px-6 py-10 relative">
                <div className="flex max-w-7xl mx-auto items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif">Novedades:</h2>
                </div>
                <div className="relative max-w-7xl mx-auto overflow-visible">
                    <div className="text-center py-10">Cargando novedades...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full px-6 py-10 relative">
                <div className="flex max-w-7xl mx-auto items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif">Novedades:</h2>
                </div>
                <div className="relative max-w-7xl mx-auto overflow-visible">
                    <div className="text-center py-10 text-red-600">Error al cargar novedades: {error}</div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-6 py-10 relative">
            <div className="flex max-w-7xl mx-auto items-center justify-between mb-8">
                <h2 className="text-3xl font-serif">Novedades:</h2>
            </div>
            <div className="relative max-w-7xl mx-auto overflow-visible">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={16}
                    loop={novedades.length > 3}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="mySwiper overflow-visible"
                >
                    {novedades.map((novedad: Novedad) => (
                        <SwiperSlide key={novedad.id}>
                            <Link href={`/novedades/${novedad.id}`} className="block rounded-lg overflow-hidden transition-all bg-white hover:scale-95">
                                <div className="h-48 bg-gray-100 relative">
                                    <ImageWithFallback
                                        src={novedad.image || '/placeholder.jpg'}
                                        alt={novedad.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div
                                    className="p-6 h-24 flex flex-col justify-between relative"
                                    style={{ backgroundColor: novedad.color || '#000' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/2 to-transparent"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-white font-bold text-base leading-tight text-shadow-strong">
                                            {novedad.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons for News Carousel */}
                <button
                    onClick={() => {
                        const swiper = document.querySelector('.mySwiper') as any;
                        if (swiper?.swiper) {
                            swiper.swiper.slidePrev();
                        }
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-lg border border-black hover:bg-black hover:text-white transition-all -translate-x-18 hidden md:block"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => {
                        const swiper = document.querySelector('.mySwiper') as any;
                        if (swiper?.swiper) {
                            swiper.swiper.slideNext();
                        }
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-lg border border-black hover:bg-black hover:text-white transition-all translate-x-18 hidden md:block"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}
