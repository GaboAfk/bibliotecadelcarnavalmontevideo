"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function Homepage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentNews, setCurrentNews] = useState(0);

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
    ];

    return (
        <div className="bg-white">
            {/* Simple Hero Carousel */}
            <section className="relative h-[70vh] md:h-screen mt-16 overflow-hidden">
                <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-full h-full relative"
                        >
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
                    ))}
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50 w-3"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Novedades Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif">Novedades:</h2>
                    <button
                        onClick={() => setCurrentNews((prev) => (prev > 0 ? prev - 1 : newsCards.length - 4))}
                        className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newsCards.slice(currentNews, currentNews + 4).map((card, index) => (
                        <div
                            key={index}
                            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
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
                    ))}
                </div>
            </section>
        </div>
    );
}