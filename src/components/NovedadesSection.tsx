"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { novedadesCards } from '@/data/novedadesCards';

export function NovedadesSection() {
    return (
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
    );
}
