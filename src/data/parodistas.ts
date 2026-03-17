import { slugify } from '@/utils/slugify';

export interface ShowSection {
    title: string;
    content?: string;
    lyrics?: string;
}

export interface ShowCredit {
    role: string;
    names: string[];
}

export interface Show {
    id: string;
    title: string;
    image: string;
    year?: number;
    promotionDate?: string;
    repertoire?: ShowSection[];
    gallery?: string[];
    data?: string;
    credits?: ShowCredit[];
}

export interface ParodistaData {
    name: string;
    description: string;
    history: string;
    shows: Show[];
    positions?: string[];
    discography?: string[];
    trivia?: string[];
    gallery?: string[];
    information?: string;
}

export const parodistasData: Record<string, ParodistaData> = {
    "los-antiguos": {
        name: "Los Antiguos",
        description: "Los Antiguos es un conjunto parodista uruguayo especializado en parodias dramáticas y teatrales.",
        history: "Formado en 1985, Los Antiguos han destacado por sus puestas en escena elaboradas y su calidad actoral.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1462212210333-335063b676d2?w=400&q=80",
                year: 2020,
            }
        ],
        positions: [
            "Primer lugar 2020",
            "Mejor parodia dramática 2019"
        ],
        discography: [
            "Los Antiguos - Álbum 2021"
        ],
        trivia: [
            "Especialistas en parodias dramáticas",
            "Más de 35 años de trayectoria"
        ],
        gallery: [],
        information: "Los Antiguos representan la parodia teatral de alta calidad en el carnaval uruguayo."
    },
    "falta-y-resto": {
        name: "Falta y Resto",
        description: "Falta y Resto es un conjunto parodista uruguayo conocido por su versatilidad y humor inteligente.",
        history: "Fundado en 1998, Falta y Resto ha explorado diversos estilos de parodia con gran éxito.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1462212210333-335063b676d2?w=400&q=80",
                year: 2021,
            }
        ],
        positions: [
            "Segundo lugar 2021",
            "Mejor guion 2020"
        ],
        discography: [
            "Falta y Resto - Álbum 2022"
        ],
        trivia: [
            "Versatilidad en estilos de parodia",
            "Humor inteligente y sofisticado"
        ],
        gallery: [],
        information: "Falta y Resto aporta sofisticación y variedad al género parodista."
    }
};

export const parodistasAlphabet: Record<string, string[]> = {
    A: ["Agarrate Catalina"],
    B: ["Blanca Luz"],
    C: ["Contrafarsa"],
    D: ["Diablos Verdes"],
    E: ["Espectáculo"],
    F: ["Falta y Resto"],
    L: ["Los Antiguos", "Los Choby Choby"],
    M: ["Momolandia"],
    P: ["Parodistas Unidos"],
    S: ["Salpicón"],
};

export const availableParodistas = Object.values(parodistasData).map(parodista => parodista.name);

export const parodistasInfo = {
    image: "/images/parodistas/parodistas.jpg",
    alt: "Parodistas en escena teatral",
    badge: "Los Muchachos: primer premio en categoría parodistas 2020",
    description: `Los conjuntos de parodistas presentan espectáculos teatrales-musicales basados en la parodia de argumentos provenientes de obras literarias, relatos históricos, biografías o hechos y personajes de conocimiento público.

De acuerdo con la reglamentación del concurso oficial de carnaval, la parodia consiste en una imitación burlesca realizada en tono jocoso y con intención artística, a partir de obras, hechos o personajes reconocibles por el público. Estas historias son reinterpretadas mediante actuación, música, humor, danza y elaboradas puestas escénicas.

El espectáculo de parodistas suele organizarse alrededor de una o más parodias centrales, que desarrollan el argumento elegido mediante escenas teatrales, canciones y cuadros coreográficos, pudiendo incorporar también momentos humorísticos o dramáticos según la propuesta artística del conjunto.`,
};
