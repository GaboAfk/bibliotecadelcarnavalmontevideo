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

export interface RevistaData {
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

export const revistasData: Record<string, RevistaData> = {
    "tabu": {
        name: "Tabú",
        description: "Tabú es un conjunto de revista uruguayo conocido por sus espectáculos de gran formato y coreografías elaboradas.",
        history: "Fundado en 2000, Tabú se ha destacado por sus vestuarios lujosos y sus puestas en escena vistosas.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
                year: 2020,
            }
        ],
        positions: [
            "Primer lugar 2020",
            "Mejor vestuario 2019"
        ],
        discography: [
            "Tabú - Álbum 2021"
        ],
        trivia: [
            "Conocidos por sus coreografías elaboradas",
            "Especialistas en espectáculos de revista"
        ],
        gallery: [],
        information: "Tabú representa el glamour y la espectacularidad en el carnaval uruguayo."
    },
    "feelings": {
        name: "Feelings",
        description: "Feelings es un conjunto de revista uruguayo especializado en espectáculos modernos y coreografías contemporáneas.",
        history: "Fundado en 2010, Feelings ha innovado en el género de revista con propuestas frescas y actuales.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
                year: 2021,
            }
        ],
        positions: [
            "Segundo lugar 2021",
            "Mejor coreografía 2020"
        ],
        discography: [
            "Feelings - Álbum 2022"
        ],
        trivia: [
            "Innovadores en coreografías modernas",
            "Especialistas en espectáculos contemporáneos"
        ],
        gallery: [],
        information: "Feelings aporta modernidad y frescura al género de revista."
    }
};

export const revistasAlphabet: Record<string, string[]> = {
    A: ["Araca la Cana"],
    B: ["Blanca Luz"],
    C: ["Contrafarsa"],
    D: ["Diablos Verdes"],
    E: ["Espectáculo"],
    F: ["Feelings"],
    L: ["Los Choby Choby"],
    M: ["Momolandia"],
    R: ["Revistas Unidas"],
    S: ["Salpicón"],
};

export const availableRevistas = Object.values(revistasData).map(revista => revista.name);

export const revistasInfo = {
    image: "/images/revistas/revistas.jpg",
    alt: "Vestuario colorido de revistas",
    badge: "Tabú: primer premio en categoría revistas 2020",
    description: `Inspiradas en el formato de la revista musical teatral, estas agrupaciones se caracterizan por el protagonismo de las coreografías, los arreglos musicales y la puesta en escena, así como por la utilización de vestuarios elaborados, escenografías y cambios de cuadro que construyen un espectáculo dinámico y variado. A lo largo del espectáculo pueden abordarse distintos temas o situaciones mediante números musicales, escenas humorísticas y pasajes coreográficos.`,
};
