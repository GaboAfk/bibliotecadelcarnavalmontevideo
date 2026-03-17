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
    priority?: boolean;
    fallbackSrc?: string;
}

export function ImageWithFallback({
    src,
    alt,
    className = "",
    fill = false,
    width,
    height,
    priority = false,
    fallbackSrc,
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
                    priority={priority}
                    {...(fill
                        ? { fill, className: `object-contain ${className}` }
                        : { width: width || 800, height: height || 600, className })}
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
        ? { fill, className: `object-contain ${className}` }
        : { width: width || 800, height: height || 600, className };

    return (
        <Image
            src={src}
            alt={alt}
            onError={() => setError(true)}
            priority={priority}
            {...imageProps}
        />
    );
}