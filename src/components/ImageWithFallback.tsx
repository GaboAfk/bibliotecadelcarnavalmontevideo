"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    fallbackSrc?: string;
    sizes?: string;
    priority?: boolean;
    lazy?: boolean;
}

export function ImageWithFallback({
    src,
    alt,
    className = "",
    fill = false,
    width,
    height,
    fallbackSrc = "/logo_default.png",
    priority = false,
    lazy = true,
    sizes = fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined,
}: ImageWithFallbackProps) {
    const [error, setError] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    if (!src || error || useFallback) {
        if (fallbackSrc && !useFallback) {
            setUseFallback(true);
            setError(false);
            return null;
        }

        if (useFallback && fallbackSrc) {
            return (
                <Image
                    src={fallbackSrc}
                    alt={alt}
                    {...(fill
                        ? { fill, className: `object-contain ${className}`, sizes }
                        : { width: width || 800, height: height || 600, className, sizes })}
                    loading={priority ? "eager" : (lazy ? "lazy" : "eager")}
                    priority={priority}
                />
            );
        }

        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
                <span className="text-gray-400 text-sm">Imagen no disponible</span>
            </div>
        );
    }

    const imageProps = fill
        ? { fill, className: `object-contain ${className}`, sizes }
        : { width: width || 800, height: height || 600, className, sizes };

    // Detectar si es una URL local de Supabase
    const isLocalSupabase = src.includes('127.0.0.1:54321')

    return (
        <Image
            src={src}
            alt={alt}
            onError={() => setError(true)}
            {...imageProps}
            loading={priority ? "eager" : (lazy ? "lazy" : "eager")}
            priority={priority}
            unoptimized={isLocalSupabase}
        />
    );
}