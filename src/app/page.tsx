"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Homepage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/carrusel1.jpg",
            subtitle: "Sabemos que",
            title: "Solo hay cultura si se pone en valor",
        },
        {
            image: "/carrusel2.jpg",
            subtitle: "Preservamos",
            title: "La memoria viva del carnaval uruguayo",
        },
        {
            image: "/carrusel3.jpg",
            subtitle: "Celebramos",
            title: "La tradición y el arte carnavalesco",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const newsCards = [
        {
            color: "#F5A623",
            title: "Nueva colección: Murgas Históricas",
            image: "https://images.unsplash.com/photo-1697791173189-d56b15df4f33?w=800&q=80",
        },
        {
            color: "#F8E71C",
            title: "Exposición de fotografías 1920-1980",
            image: "https://images.unsplash.com/photo-1637862666931-be59da5dd8ca?w=800&q=80",
        },
        {
            color: "#417505",
            title: "Archivo sonoro digitalizado",
            image: "https://images.unsplash.com/photo-1764762164486-b6d565f706ff?w=800&q=80",
        },
        {
            color: "#FF69B4",
            title: "Entrevistas a directores históricos",
            image: "https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?w=800&q=80",
        },
        {
            color: "#8B5CF6",
            title: "Nuevos archivos digitales",
            image: "https://images.unsplash.com/photo-1553729459-efe14ef6085c?w=800&q=80",
        },
        {
            color: "#EC4899",
            title: "Exposición fotográfica histórica",
            image: "https://images.unsplash.com/photo-1589992344321-1234567890ab?w=800&q=80",
        },
    ];

    return (
        <div className="bg-white">
            {/* Simple Hero Carousel */}
            <section className="relative h-[70vh] md:h-screen mt-16 overflow-hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false
                    }}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination',
                        type: 'bullets',
                        bulletClass: 'swiper-pagination-bullet',
                        bulletActiveClass: 'swiper-pagination-bullet-active',
                    }}
                    className="h-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="min-w-full h-full relative">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        console.error(`Error loading image: ${slide.image}`);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
                                    <p className="text-base md:text-lg mb-4 tracking-wide drop-shadow-lg">{slide.subtitle}</p>
                                    <h1 className="text-4xl md:text-5xl lg:text-7xl max-w-4xl text-center leading-tight font-serif drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Carousel Indicators */}
                <div className="swiper-pagination absolute bottom-8 left-0 right-0"></div>
            </section>

            {/* Novedades Section */}
            <section className="w-full px-6 py-16 relative">
                <div className="flex max-w-7xl mx-auto items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif">Novedades:</h2>
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={16}
                        loop={true}
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
                        className="mySwiper"
                    >
                        {newsCards.map((card: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
                                    <div className="h-48 bg-gray-100 relative">
                                        <ImageWithFallback
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                        />
                                    </div>
                                    <div
                                        className="p-6 h-32 flex flex-col justify-between"
                                        style={{ backgroundColor: card.color }}
                                    >
                                        <h3 className="text-white font-semibold text-lg leading-tight">
                                            {card.title}
                                        </h3>
                                        <a href="#" className="text-white underline hover:no-underline transition-all">
                                            Más info
                                        </a>
                                    </div>
                                </div>
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
                        <ChevronLeft size={24} className="rotate-180" />
                    </button>
                </div>
            </section>
        </div>
    );
}