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

export interface HumoristaData {
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

export const humoristasData: Record<string, HumoristaData> = {
    "los-carlitos": {
        name: "Los Carlitos",
        description: "Los Carlitos es un conjunto humorístico uruguayo conocido por su sátira política y sketches cómicos.",
        history: "Fundado en 1995, Los Carlitos se han consolidado como uno de los referentes del humor en el carnaval uruguayo.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1474949104756-4dc2b0f3d71c?w=400&q=80",
                year: 2020,
            }
        ],
        positions: [
            "Primer lugar 2020",
            "Segundo lugar 2019"
        ],
        discography: [
            "Los Carlitos - Álbum 2021"
        ],
        trivia: [
            "Conocidos por su crítica política aguda",
            "Más de 25 años de trayectoria"
        ],
        gallery: [],
        information: "Los Carlitos representan el humor crítico y social del carnaval uruguayo."
    },
    "los-choby-choby": {
        name: "Los Choby Choby",
        description: "Los Choby Choby es un dúo humorístico uruguayo especializado en sketches y personajes cómicos.",
        history: "Formado en 2005, Los Choby Choby se caracterizan por su humor fresco y sus personajes memorables.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1474949104756-4dc2b0f3d71c?w=400&q=80",
                year: 2021,
            }
        ],
        positions: [
            "Tercer lugar 2021",
            "Mención especial 2020"
        ],
        discography: [
            "Los Choby Choby - Álbum 2022"
        ],
        trivia: [
            "Dúo cómico muy popular",
            "Especialistas en personajes cómicos"
        ],
        gallery: [],
        information: "Los Choby Choby aportan frescura y originalidad al humor carnavalero."
    }
};

export const humoristasAlphabet: Record<string, string[]> = {
    A: ["Agarrate Catalina"],
    B: ["Blanca Luz"],
    C: ["Contrafarsa"],
    D: ["Diablos Verdes"],
    E: ["Espectáculo"],
    L: ["Los Carlitos", "Los Choby Choby"],
    M: ["Momolandia"],
    P: ["Parodistas Unidos"],
    S: ["Salpicón"],
};

export const availableHumoristas = Object.values(humoristasData).map(humorista => humorista.name);
