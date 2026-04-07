"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { NovedadesSection } from "@/components/NovedadesSection";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCategories, useFrasesPromo } from '@/hooks/useData';

export default function Homepage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { frases, loading: frasesLoading } = useFrasesPromo();
    const { categories, loading: categoriesLoading } = useCategories();

    const slides = frases;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Loading states
    if (frasesLoading || categoriesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Simple Hero Carousel */}
            <section className="relative h-[90vh] mt-16 overflow-hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={slides.length > 1}
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

            <NovedadesSection />

            {/* Nuestra Biblioteca Section */}
            {/* <section className="w-full py-10 bg-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl mb-8 font-serif">{nuestraBiblioteca.title}</h2>
                            <div className="space-y-4 text-lg leading-relaxed">
                                {nuestraBiblioteca.body.split("\n\n").map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
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
            </section> */}

            {/* Categorías Section */}
            <section className="w-full px-6 py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl mb-12 font-serif">Categorías</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {categories.map((category) => (
                            <a
                                key={category.slug}
                                href={`/categorias/${category.slug}`}
                                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-64 ">
                                    <ImageWithFallback
                                        src={category.image || '/placeholder.jpg'}
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