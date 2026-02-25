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

export interface SociedadData {
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

export const sociedadesData: Record<string, SociedadData> = {
    "yambo-kenia": {
        name: "Yambo Kenia",
        description: "Yambo Kenia es una sociedad de negros y lubolos uruguaya conocida por su potencia rítmica y su presencia en el desfile.",
        history: "Fundada en 1975, Yambo Kenia ha sido una de las sociedades más importantes en la historia del carnaval uruguayo.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
                year: 2018,
            }
        ],
        positions: [
            "Primer lugar 2018",
            "Mejor cuerda de tambores 2017"
        ],
        discography: [
            "Yambo Kenia - Álbum 2019"
        ],
        trivia: [
            "Conocidos por su potencia rítmica",
            "Más de 45 años de trayectoria"
        ],
        gallery: [],
        information: "Yambo Kenia representa la tradición y la fuerza del candombe en el carnaval uruguayo."
    },
    "valores": {
        name: "Valores",
        description: "Valores es una sociedad de negros y lubolos uruguaya reconocida por su calidad rítmica y su tradición.",
        history: "Fundada en 1980, Valores ha mantenido viva la tradición del candombe con propuestas contemporáneas.",
        shows: [
            {
                id: slugify("Tablado Amateur"),
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
                year: 2021,
            }
        ],
        positions: [
            "Segundo lugar 2021",
            "Mejor cuerpada 2020"
        ],
        discography: [
            "Valores - Álbum 2022"
        ],
        trivia: [
            "Calidad rítmica reconocida",
            "Tradición con propuestas modernas"
        ],
        gallery: [],
        information: "Valores representa la evolución y la tradición del candombe montevideano."
    }
};

export const sociedadesAlphabet: Record<string, string[]> = {
    A: ["Ataques del Barrio"],
    B: ["Barrio Rampla"],
    C: ["Candombe Joven"],
    D: ["Diablos Negros"],
    E: ["Espíritu del Candombe"],
    L: ["Los Negros del Barrio"],
    M: ["Mozo Viejo"],
    P: ["Palermo Candombero"],
    R: ["Raza Negra"],
    V: ["Valores"],
};

export const availableSociedades = Object.values(sociedadesData).map(sociedad => sociedad.name);
