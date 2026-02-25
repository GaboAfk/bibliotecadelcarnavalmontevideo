import { slugify } from '@/utils/slugify';

export interface Novedad {
    id: string;
    color: string;
    title: string;
    image: string;
    description: string;
    content: string;
    date: string;
}

export const novedadesData: Novedad[] = [
    {
        id: slugify("Nueva colección: Murgas Históricas"),
        color: "var(--color-carnaval-orange)",
        title: "Nueva colección: Murgas Históricas",
        image: "https://images.unsplash.com/photo-1697791173189-d56b15df4f33?w=800&q=80",
        description: "Descubre la nueva colección de documentos históricos sobre las murgas más emblemáticas del carnaval uruguayo.",
        content: "Esta colección reúne fotografías, programas, vestuarios y documentos originales de las murgas más importantes de la historia del carnaval montevideano. Incluye material inédito de los años 50 hasta la actualidad, permitiendo a los investigadores y aficionados acceder a fuentes primarias de gran valor histórico.",
        date: "2024-02-15",
    },
    {
        id: slugify("Exposición de fotografías 1920-1980"),
        color: "var(--color-carnaval-yellow)",
        title: "Exposición de fotografías 1920-1980",
        image: "https://images.unsplash.com/photo-1637862666931-be59da5dd8ca?w=800&q=80",
        description: "Una retrospectiva visual de seis décadas del carnaval a través de las lentes de los fotógrafos más destacados.",
        content: "Esta exposición presenta más de 200 fotografías originales que documentan la evolución del carnaval uruguayo desde los años 20 hasta los 80. Las imágenes capturan momentos icónicos de desfiles, tablados y ensayos, mostrando cómo ha evolucionado la celebración a lo largo del tiempo. Muchas de estas fotografías nunca antes habían sido expuestas públicamente.",
        date: "2024-02-10",
    },
    {
        id: slugify("Archivo sonoro digitalizado"),
        color: "var(--color-carnaval-green)",
        title: "Archivo sonoro digitalizado",
        image: "https://images.unsplash.com/photo-1764762164486-b6d565f706ff?w=800&q=80",
        description: "Accede a grabaciones históricas de murgas, humoristas y parodistas del carnaval uruguayo.",
        content: "Hemos digitalizado cientos de grabaciones de audio que datan desde los años 60 hasta la actualidad. El archivo incluye presentaciones completas, ensayos, entrevistas y documentos sonoros que permiten escuchar la evolución de la música y el humor del carnaval. Todas las grabaciones han sido restauradas digitalmente para mejorar su calidad.",
        date: "2024-02-05",
    },
    {
        id: slugify("Entrevistas a directores históricos"),
        color: "var(--color-carnaval-pink)",
        title: "Entrevistas a directores históricos",
        image: "https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?w=800&q=80",
        description: "Conoce las historias de los grandes directores que moldearon el carnaval moderno.",
        content: "En esta sección encontrarás entrevistas en video y texto con los directores más influyentes del carnaval uruguayo. Ellos comparten sus experiencias, anécdotas y reflexiones sobre cómo crearon algunas de las presentaciones más memorables de la historia. Estas entrevistas ofrecen una perspectiva única sobre el proceso creativo detrás de los grandes espectáculos.",
        date: "2024-01-30",
    },
    {
        id: slugify("Nuevos archivos digitales"),
        color: "var(--color-carnaval-purple)",
        title: "Nuevos archivos digitales",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6085c?w=800&q=80",
        description: "Ampliamos constantemente nuestro acervo digital con nuevos documentos y materiales históricos.",
        content: "Cada mes agregamos nuevos documentos a nuestra biblioteca digital. Estos incluyen programas de mano, carteles, vestuarios digitalizados, manuscritos originales y otros materiales que enriquecen nuestro conocimiento del carnaval. Todos los archivos son catalogados cuidadosamente para facilitar su búsqueda y acceso.",
        date: "2024-01-25",
    },
    {
        id: slugify("Exposición fotográfica histórica"),
        color: "var(--color-carnaval-rose)",
        title: "Exposición fotográfica histórica",
        image: "https://images.unsplash.com/photo-1589992344321-1234567890ab?w=800&q=80",
        description: "Una mirada profunda a los momentos más icónicos del carnaval a través de la fotografía.",
        content: "Esta exposición especial reúne fotografías de archivo que documentan los momentos más significativos del carnaval uruguayo. Desde los primeros desfiles hasta las presentaciones contemporáneas, cada imagen cuenta una historia única. La exposición está acompañada de contexto histórico y testimonios de los fotógrafos originales.",
        date: "2024-01-20",
    },
];

export const novedadesAlphabet: Record<string, string[]> = {
    "N": novedadesData.map(n => n.title),
};

export const availableNovedades = novedadesData.map(n => n.title);
