import { ImageWithFallback } from './ImageWithFallback';

interface ShowCardProps {
    show: any;
    accent: { bg: string; text: string };
    isMiddleColumn: boolean;
    showDetalles?: boolean;
}

export function ShowCard({ show, accent, isMiddleColumn, showDetalles = true }: ShowCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-UY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`show-card group relative ${isMiddleColumn ? 'lg:mt-12' : ''}`}>
            {/* Show Image with Triangle Badge */}
            <div className="relative overflow-hidden rounded-xl shadow-xl bg-gray-200 aspect-[4/3] mb-6">
                <ImageWithFallback
                    src={show.image || ''}
                    alt={show.title}
                    fill
                    className="show-image w-full h-full object-cover transition-transform duration-700 ease-out"
                />

                {/* Year Triangle Badge */}
                {show.year && (
                    <div className="absolute top-0 left-6 z-20">
                        <div
                            className="triangle-badge w-14 h-20 flex flex-col items-center pt-2 shadow-lg font-serif font-black text-sm tracking-tighter"
                            style={{ backgroundColor: accent.bg, color: accent.text }}
                        >
                            {show.year}
                        </div>
                    </div>
                )}

                {/* Hover Overlay */}
                {showDetalles && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button className="flex items-center gap-2 text-white font-semibold">
                            Ver Detalles &rarr;
                        </button>
                    </div>
                )}
            </div>

            {/* Show Info */}
            <div>
                <h3
                    className="text-2xl font-serif font-bold transition-colors"
                    style={{ color: accent.bg }}
                >
                    {show.title}
                </h3>
                <div
                    className="w-12 h-1 mt-3 group-hover:w-24 transition-all duration-500"
                    style={{ backgroundColor: accent.bg }}
                ></div>

                {show.promotion_date && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                        <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
                        <time dateTime={show.promotion_date}>
                            {formatDate(show.promotion_date)}
                        </time>
                    </div>
                )}
            </div>
        </div>
    );
}
