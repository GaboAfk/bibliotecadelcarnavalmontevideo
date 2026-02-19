"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { novedadesCards } from "@/data/novedadesCards";

export default function RevistasPage() {
    return (
        <div className="bg-white pt-24 pb-16">
            {/* Page Title Banner */}
            <div className="w-full bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-center tracking-wide">Revistas</h1>
                </div>
            </div>

            <div className="max-w mx-auto px-6">
                <nav className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Link href="/" className="hover:underline">Inicio</Link>
                    <ChevronRight size={16} />
                    <span>Categorías</span>
                    <ChevronRight size={16} />
                    <span>Revistas</span>
                </nav>

                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&q=80"
                        alt="Vestuario colorido de revistas"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Feelings:</strong> Mejor vestuario y coreografía 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-4xl mx-auto mb-12 space-y-4 text-lg leading-relaxed">
                    <p>
                        Las revistas combinan glamour, humor y crítica social con grandes cuadros coreográficos. Son espectáculos de revista musical
                        con vestuarios lujosos, cuerpos de baile numerosos y arreglos corales luminosos que transforman el tablado en una pasarela.
                    </p>
                    <p>
                        Cada conjunto crea historias visuales llenas de brillo y energía, donde los cambios de vestuario, la iluminación y el repertorio
                        pop convierten la categoría en uno de los momentos más vibrantes del carnaval.
                    </p>
                </div>
            </div>

            {/* Novedades Section */}
            <section className="w-full px-6 py-10 relative">
                <div className="flex max-w-7xl mx_auto items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif">Novedades:</h2>
                </div>
                <div className="relative max-w-7xl mx-auto overflow-visible">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={16}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="mySwiper overflow-visible"
                    >
                        {novedadesCards.map((card: any, index: number) => (
                            <SwiperSlide key={index}>
                                <a href="#" className="block rounded-lg overflow-hidden transition-all bg-white hover:scale-95">
                                    <div className="h-48 bg-gray-100 relative">
                                        <ImageWithFallback
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div
                                        className="p-6 h-24 flex flex-col justify-between relative"
                                        style={{ backgroundColor: card.color }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/2 to-transparent"></div>
                                        <div className="relative z-10">
                                            <h3 className="text-white font-bold text-base leading-tight text-shadow-strong">
                                                {card.title}
                                            </h3>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons for News Carousel */}
                    <button
                        onClick={() => {
                            const swiper = document.querySelector(".mySwiper") as any;
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
                            const swiper = document.querySelector(".mySwiper") as any;
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
        </div>
    );
}
