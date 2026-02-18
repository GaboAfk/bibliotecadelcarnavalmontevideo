"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { novedadesCards } from '@/data/novedadesCards';

// ─── Data ─────────────────────────────────────────────────────
const murgas: Record<string, string[]> = {
    A: [
        "Agarrate Catalina",
        "Antimurga BCG",
        "Araca la Cana",
        "Asaltantes con Patente",
    ],
    B: ["Bal Condal"],
    C: [
        "Cayó la Cabra",
        "Contrafarsa",
        "Curtidores de Hongos",
    ],
    D: [
        "Diablos Verdes",
        "Don Timoteo",
        "Doña Bastarda",
    ],
    F: ["Falta y Resto"],
    L: [
        "La Antimurga Joven",
        "La Clave",
        "La Gran Muñeca",
        "La Margarita",
        "La Mojigata",
        "Los Aristócratas",
        "Los Choby Choby",
        "Los Diablos Verdes",
        "Los Diablos",
        "Los Enchufados",
        "Los Guardiola",
        "Los Muchachos",
    ],
    M: [
        "Metele que son Pasteles",
        "Momolandia",
    ],
    N: ["Nazarenos"],
    P: ["Patos Cabreros"],
    Q: ["Queso Magro"],
    R: ["Reina de la Teja"],
    S: ["Sacate el Pulover", "Salpicón"],
    V: ["Vengador Anónimo"],
    Z: ["Zíngaros"],
};

function slugify(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export default function MurgasPage() {
    const letters = Object.keys(murgas).sort();

    return (
        <div className="bg-white pt-28 pb-16">
            <div className="max-w mx-auto px-6">
                {/* Hero */}
                <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                        src="/murga.png"
                        alt="Murgas en escenario"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white p-4 rounded-lg max-w-xs md:max-w-sm shadow-lg">
                        <p className="text-xs md:text-sm">
                            <strong>Doña Bastarda:</strong> Primer premio de la categoría Murgas, Carnaval 2025
                        </p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="max-w-7xl mx-auto mb-12">
                    <h1 className="text-4xl mb-6 font-serif">Murgas</h1>
                    <p className="text-lg leading-relaxed mb-4">
                        La murga es uno de los géneros más emblemáticos del carnaval uruguayo. Surgida a principios del siglo XX
                        con influencias europeas, la murga se caracteriza por su coro de voces masculinas, su crítica social
                        incisiva y su humor popular.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        Con instrumentos de percusión como bombo, platillos y redoblante, las murgas presentan espectáculos que
                        combinan música, poesía, teatro y crítica social.
                    </p>
                </div>

                {/* Alphabet grid */}
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl mb-8 font-serif">Explorá nuestro archivo de murgas:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-300">
                        {letters.map((letter) => (
                            <div
                                key={letter}
                                className="bg-gray-50 p-5 hover:bg-gray-100 transition-colors"
                            >
                                <div className="text-2xl font-bold mb-3 text-black transition-all duration-200 cursor-default">{letter}</div>
                                <ul className="space-y-1">
                                    {murgas[letter].map((name) => (
                                        <li key={name}>
                                            <Link
                                                href={`/categorias/murgas/${slugify(name)}`}
                                                className="block py-1 text-black hover:scale-90 hover:font-black cursor-default transition-all "
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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
                                        <div className="absolute inset-0 bg-black/15"></div>
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
        </div>
    );
}