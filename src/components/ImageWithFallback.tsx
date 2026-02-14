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
}

export function ImageWithFallback({
    src,
    alt,
    className = "",
    fill = false,
    width,
    height,
    priority = false,
}: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
                <span className="text-gray-400 text-sm">Imagen no disponible</span>
            </div>
        );
    }

    const imageProps = fill
        ? { fill, className: `object-cover ${className}` }
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