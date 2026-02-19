"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { novedadesCards } from '@/data/novedadesCards';
import { categoriesData } from '@/data/categoriesData';

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

    return (
        <div className="bg-white">
            {/* Simple Hero Carousel */}
            <section className="relative h-[90vh] mt-16 overflow-hidden">
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
            <section className="w-full px-6 py-10 relative">
                <div className="flex max-w-7xl mx-auto items-center justify-between mb-8">
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

            {/* Nuestra Biblioteca Section */}
            <section className="w-full py-10 bg-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl mb-8 font-serif">Nuestra Biblioteca</h2>
                            <div className="space-y-4 text-lg leading-relaxed">
                                <p>
                                    La Biblioteca Oficial del Carnaval Montevideano es un espacio dedicado a la preservación,
                                    investigación y difusión de la memoria del carnaval uruguayo.
                                </p>
                                <p>
                                    Nuestro acervo incluye documentos históricos, fotografías, grabaciones audiovisuales,
                                    partituras, textos de espectáculos y testimonios orales que dan cuenta de más de un siglo
                                    de tradición carnavalera.
                                </p>
                                <p>
                                    Trabajamos día a día para poner en valor este patrimonio cultural invaluable, haciéndolo
                                    accesible a investigadores, estudiantes, artistas y al público en general.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/plaza-cagancha.jpg"
                                    alt="Plaza Cagancha - Montevideo"
                                    width={800}
                                    height={384}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        console.error('Error loading plaza cagancha image');
                                        e.currentTarget.src = "https://mediospublicos.uy/wp-content/uploads/20230119_ZINA_8030-1005x670.jpg";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categorías Section */}
            <section className="w-full px-6 py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl mb-12 font-serif">Categorías</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {categoriesData.map((category) => (
                            <a
                                key={category.slug}
                                href={`/categorias/${category.slug}`}
                                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-64 ">
                                    <ImageWithFallback
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white font-bold text-xl text-center px-4 text-shadow-strong group-hover:scale-110 transition-transform duration-300">
                                        {category.name}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}