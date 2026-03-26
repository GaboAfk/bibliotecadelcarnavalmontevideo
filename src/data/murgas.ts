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

export interface MurgaData {
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

export const murgasData: Record<string, MurgaData> = {
    "agarrate-catalina": {
        name: "Agarrate Catalina",
        description: "",
        history: "La murga surge en abril de 2001, producto de la unión de Yamandú Cardozo y Carlos Tanco y otros artistas e integrantes de la murga \"Eterna madrugada\". Realizan su debut en el Concurso Oficial del Carnaval en el año 2003 con el espectáculo \"Tablado Amateur\". Obtuvieron el primer lugar del concurso oficial en los años 2005, 2006, 2008, 2011 y 2020.",
        shows: [
            { id: "tablado-amateur", title: "El Tablado Amateur", year: 2003, image: "" },
            { id: "el-tiempo", title: "El Tiempo", year: 2004, image: "https://www.agarratecatalina.com.uy/media/widgetkit/eltiempo-76b69a1e346eb6436b84537d935c65ce.jpg" },
            { id: "los-suenos", title: "Los Sueños", year: 2005, image: "https://www.agarratecatalina.com.uy/media/widgetkit/los-suenos-45ef072ffb6e0ffcc67269f313c44c49.jpg" },
            { id: "el-fin-del-mundo", title: "El Fin del Mundo", year: 2006, image: "https://www.agarratecatalina.com.uy/media/widgetkit/el-fin-del-mundo-85e074ff73a0f33d995f7179ea28aaab.jpg" },
            { id: "el-corso-del-ser-humano", title: "El Corso del Ser Humano", year: 2007, image: "" },
            {
                id: "el-viaje",
                title: "El Viaje",
                image: "https://www.agarratecatalina.com.uy/media/widgetkit/Agarrate_Catalina-El_Viaje-Frontal-e116284641831ec7497b7a40ed2c6370.jpg",
                year: 2008,
                repertoire: [
                    { title: "Presentación", content: "Introducción el novio de la nieta" },
                    { title: "Novio de la nieta", content: "Novio de la nieta" },
                    { title: "Introducción los energizantes", content: "Los Energizantes" },
                    { title: "Los Energizantes", content: "Auto Asamblea" },
                    { title: "Los Viejos Militares", content: "La Niebla - En prosa" },
                    { title: "La Niebla", content: "Recitado Retirada" },
                    { title: "Retirada: El Viaje", lyrics: "Este es el comienzo de mi viaje,\nes el final de mi camino.\nNo llevo prisa ni equipaje,\nsolo cenizas en el mar\nde este remendado corazón,\npara viajar.\n\nNavegar, siempre navegar\nsobre el cielo azul\ntan fugaz, todo es tan fugaz,\nvieja juventud,\nserá mi piel del viento sur.\nMi nombre será tierra y nada más,\nmi sangre sol, tu llanto luz,\nsemillas de la ingenua eternidad." }
                ],
                credits: [
                    { role: "Director Responsable", names: ["Yamandú Cardozo"] },
                    { role: "Textos", names: ["Yamandú Cardozo", "Tabaré Cardozo", "Carlos Tanco"] },
                    { role: "Director escénico", names: ["Martín Duarte"] },
                    { role: "Arreglos corales", names: ["Martín Duarte"] },
                    { role: "Vestuario", names: ["Hugo Millán"] },
                    { role: "Maquillaje", names: ["Paula Gómez"] }
                ],
                gallery: [
                    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
                ]
            },
            { id: "civilizacion", title: "Civilización", year: 2010, image: "https://www.agarratecatalina.com.uy/media/widgetkit/civilizacion-fcabb84afc30d2fcd4cf1105fc6db588.jpg" },
            { id: "gente-comun", title: "Gente Común", year: 2011, image: "" },
            {
                id: "la-comunidad",
                title: "La Comunidad",
                image: "https://www.agarratecatalina.com.uy/media/widgetkit/lacomunidad-254ed9f508419fb53c2738506175540d.jpg",
                year: 2012,
                credits: [
                    { role: "Director Responsable", names: ["Yamandú Cardozo"] },
                    { role: "Textos", names: ["Yamandú Cardozo", "Tabaré Cardozo"] },
                    { role: "Músicas inéditas", names: ["Pablo Porciúncula", "Tabaré Cardozo", "Darío Prieto"] }
                ],
                gallery: ["/images/murgas/lacomunidad-agarrate-catalina.jpg"]
            },
            { id: "un-dia-de-julio", title: "Un Día de Julio", year: 2015, image: "https://www.agarratecatalina.com.uy/media/widgetkit/un-dia-de-julio-b46b0d939562b21953ed6066bd17c947.jpg" },
            { id: "defensores-causas-perdidas", title: "Defensores de Causas Perdidas", year: 2019, image: "" },
            { id: "amor-y-odio", title: "Amor y Odio", year: 2020, image: "" },
            { id: "la-involucion-de-las-especies", title: "La Involución de las Especies", year: 2022, image: "" },
        ],
        positions: [
            "2003: 11°",
            "2004: 10°",
            "2005: 1°",
            "2006: 1°",
            "2007: 5°",
            "2008: 1°",
            "2009: No participa",
            "2010: 4°",
            "2011: 1°",
            "2012: 10°",
            "2013: No participa",
            "2014: No participa",
            "2015: No pasa Prueba de Admisión",
            "2016: No participa",
            "2017: No participa",
            "2018: No participa",
            "2019: 2°",
            "2020: 1°",
            "2021: No se realiza concurso",
            "2022: 2°",
            "2023: No participa",
            "2024: No participa",
            "2025: No participa",
            "2026: No participa"
        ],
        discography: [
            "El tiempo (2004)",
            "Los sueños (2005)",
            "El fin del mundo (2006)",
            "El corso del ser humano (2007)",
            "El viaje (2008)",
            "Grandes Éxitos (2008)",
            "Civilización (2010)",
            "Gente común (2011)",
            "10 Años (en vivo) (2011)",
            "La Comunidad (2012)",
            "Gira Mundial. vol 1 (2015)",
            "Gira Mundial. vol 2 (2015)",
            "Un Día de Julio (2016)",
            "15 años (+2) (2018)",
            "Defensores de Causas Perdidas (2019)",
            "Defensores de Causas Perdidas (En Vivo en el Sodre) (2021)",
            "La Involución de las Especies (2023)",
            "Amor y Odio (2020) (2024)"
        ],
        trivia: [
            "La murga surge en abril de 2001 por iniciativa de Yamandú Cardozo y Carlos Tanco",
            "Debutaron en el Concurso Oficial en 2003 con 'El Tablado Amateur'",
            "Obtuvieron 5 primeros premios: 2005, 2006, 2008, 2011 y 2020",
            "Han recorrido los cinco continentes como embajadores culturales del Uruguay"
        ],
    },
    "a-la-bartola": {
        name: "A La Bartola",
        description: "",
        history: "",
        shows: [
            {
                id: "profundo",
                title: "Profundo",
                year: 2026,
                image: "",
                credits: [
                    { role: "Local de ensayo", names: ["Club Carlitos Prado"] },
                    { role: "Arreglos corales", names: ["Carmela Viñas"] },
                    { role: "Textos", names: ["Pedro Alfonso", "Rodrigo Lema Mundini", "Matías Maldonado", "Carmela Viñas", "Ernesto Alvez"] },
                    { role: "Puesta en escena", names: ["Magalí Romero", "Carmela Viñas"] },
                    { role: "Dirección escénica", names: ["Carmela Viñas"] },
                    { role: "Primos", names: ["Mario Fernandez", "Felipe Pérez", "Matías Pacheco"] },
                    { role: "Primos Altos", names: ["Tamara Rosas", "Manuel Bautista"] },
                    { role: "Sobreprimas", names: ["Carla Villablanca", "Florencia Nova", "Melissa Piazza"] },
                    { role: "Segundos", names: ["Ignacio Tiscornia", "Matías Maldonado", "Pedro Alfonso"] },
                    { role: "Bajos", names: ["Germán Veglio", "Daniel Blanco"] },
                    { role: "Batería", names: ["Grecia Grilli", "Ernesto Álvez", "Andres Bedolla"] },
                    { role: "Utileros", names: ["Alejandro Rodriguez", "Federico Cerredelo"] },
                    { role: "Vestuario", names: ["Fernando Olita"] },
                    { role: "Maquillaje", names: ["Carolina Fontana"] },
                    { role: "Iluminación", names: ["Juan Andrés Piazza"] },
                    { role: "Sonido", names: ["Ulises Rivas", "Martín Brizolara"] },
                    { role: "Pantallas", names: ["Ernesto Alvez", "Grecia Grilli", "Carmela Viñas"] }
                ]
            }
        ],
        positions: [],
        discography: [],
        trivia: [],
        gallery: []
    },
    "cayo-la-cabra": {
        name: "Cayó la Cabra",
        description: "",
        history: "",
        shows: [
            { id: "que-tendra-la-libertad", title: "¿Qué tendrá la libertad que no tenga yo?", year: 2012, image: "" },
            { id: "madurar", title: "Madurar", year: 2013, image: "" },
            { id: "pop", title: "Pop!", year: 2014, image: "" },
            { id: "natural", title: "Natural", year: 2015, image: "" },
            { id: "relajo", title: "Relajo", year: 2016, image: "" },
            { id: "barato", title: "Barato", year: 2017, image: "" },
            { id: "las-aventuras-del-escuadron-rebelde", title: "Las aventuras del escuadrón rebelde", year: 2018, image: "" },
            { id: "el-club-de-los-malos-modales", title: "El club de los malos modales", year: 2019, image: "" },
            { id: "the-big-show", title: "The Big Show, un espectáculo destinado a fracasar", year: 2020, image: "" },
            { id: "en-una", title: "En una", year: 2022, image: "" },
            { id: "si-tengo-o-si-quiero", title: "Si tengo o si quiero", year: 2023, image: "" },
            { id: "catadores-de-humo", title: "Catadores de humo", year: 2024, image: "" },
            { id: "sorpresa", title: "Sorpresa", year: 2025, image: "" },
            {
                id: "la-republica-de-la-vereda",
                title: "La república de la vereda",
                year: 2026,
                image: "",
                credits: [
                    { role: "Dirección escénica y arreglos", names: ["Camilo Routin"] },
                    { role: "Primas y Primos", names: ["Emiliano Belmudes", "María Puime", "Fernando Balbuena", "Virginia Gervasio", "Mariana Cal"] },
                    { role: "Sobreprimas", names: ["Ximena De los Santos", "Madelen Da Silva", "Maira Sepúlveda"] },
                    { role: "Segundos", names: ["Gonzalo Villalba Ghelfa", "Pablo Castro", "Lautaro Cáceres Chiribao", "Matías Mollica Pesce", "Gonzalo Bueno"] },
                    { role: "Batería", names: ["Enzo Anthony Cuenca Goñi (Bombo)", "Nicolás García Galiardi (Platillos)", "Leandro García (Redoblante)"] },
                    { role: "Utilería", names: ["Bruno Ovando", "Gonzalo Isasmendi", "Joaquín Dangiolillo"] },
                    { role: "Textos", names: ["Camilo Fernández", "Maira Sepúlveda", "Rodrigo Quijano", "Pablo Castro"] },
                    { role: "Puesta en escena", names: ["Sebastián Calderón"] },
                    { role: "Diseño de Vestuario", names: ["Lucía Panizza"] },
                    { role: "Diseño de Maquillaje", names: ["Fiorela Apelo", "Betiana López"] },
                    { role: "Realización de Maquillaje", names: ["Betiana López", "Fiorela Apelo", "Camila Priore", "Claudia Piedeferri"] },
                    { role: "Iluminación", names: ["Enzo Rubín"] },
                    { role: "Diseño gráfico y de pantallas", names: ["Gerardo Borrás"] }
                ]
            }
        ],
        positions: [
            "2012: 19°",
            "2013: 8°",
            "2014: 6°",
            "2015: 4°",
            "2016: 8°",
            "2017: 7°",
            "2018: 2°",
            "2019: 3°",
            "2020: 10°",
            "2021: -",
            "2022: 19°",
            "2023: 15°",
            "2024: 14°",
            "2025: 8°",
            "2026: 5°"
        ],
        discography: [],
        trivia: [],
        gallery: []
    },
    "curtidores-de-hongos": {
        name: "Curtidores de Hongos",
        description: "",
        history: "",
        shows: [
            {
                id: "2026",
                title: "2026",
                year: 2026,
                image: "",
                credits: [
                    { role: "Coordinación General", names: ["Rodrigo Guillena", "Fabián Pérez"] },
                    { role: "Arreglos Corales", names: ["Diego Perrou"] },
                    { role: "Textos", names: ["Rodrigo Franco", "Mauricio Quintela", "Leandro Lacuesta", "Freddy González"] },
                    { role: "Puesta en Escena", names: ["Freddy González"] },
                    { role: "Director Responsable", names: ["Daniel Carluccio"] },
                    { role: "Director Escénico", names: ["Diego Perrou"] },
                    { role: "Primos", names: ["Sebastián Martínez", "Jorge Sanabria", "Rodrigo Guillenea", "Fabián Pérez", "Sebastián Veins"] },
                    { role: "Segundos", names: ["Freddy González", "Daniel Pintos", "Gonzalo Palau", "Gabriel Mutiuzabal", "Emiliano Pereyra"] },
                    { role: "Sobreprimos", names: ["Rafael Bruzzone", "Luis Pereira", "Leonor Chavarría"] },
                    { role: "Batería", names: ["Federico Lasena", "Nicolás Lasena", "Facundo Rodríguez"] },
                    { role: "Utilería", names: ["Manuel Souza", "Diego Muñoz"] },
                    { role: "Maquillaje", names: ["Romina Carluccio", "Daniela Aparicio", "Erica González", "Natalia Cheico", "Matilde Correa"] },
                    { role: "Diseño Vestuario y Sombreros", names: ["Leticia Sotura", "Dahiana Ramos (Asistencia)"] },
                    { role: "Realización de Vestuario", names: ["Marcela De Vera (Medio)", "Natalia Cal (Medio)", "Antonella Langone (Medio)", "Mariana Antúnez (Directora)", "Nora Aquino (Retirada)", "Shizuko Kunisawa (Retirada)"] },
                    { role: "Realización Crinolina", names: ["Claudia Acosta", "Matías Vizcaíno"] },
                    { role: "Sombreros", names: ["Ovidio Fernández"] },
                    { role: "Equipo Sombreros", names: ["Agustín Centurión", "María José Ramírez", "Marcelo González"] },
                    { role: "Redes Sociales", names: ["Gonzalo Palau", "Mateo Duarte"] },
                    { role: "Pantallas / Logo", names: ["Pablo Delgado"] },
                    { role: "Chofer", names: ["Miguel Marrero"] }
                ]
            }
        ],
        positions: [
            "1957: 1°",
            "1960: 1°",
            "1976: 1°",
            "1993: 7°",
            "1994: 3°",
            "1995: 4°",
            "1996: 5°",
            "1997: 14°",
            "2000: 5°",
            "2001: 5°",
            "2002: 4°",
            "2003: 7°",
            "2004: 1°",
            "2005: 6°",
            "2006: 2°",
            "2007: 3°",
            "2008: 2°",
            "2009: 3°",
            "2010: 3°",
            "2011: 4°",
            "2012: 2°",
            "2013: 11°",
            "2014: 8°",
            "2015: 6°",
            "2016: 11°",
            "2017: 10°",
            "2018: 3°",
            "2019: 8°",
            "2020: 9°",
            "2021: -",
            "2022: 11°",
            "2023: 7°",
            "2024: 9°",
            "2025: 10°",
            "2026: 11°"
        ],
        discography: [],
        trivia: [],
        gallery: []
    },
    "dona-bastarda": {
        name: "Doña Bastarda",
        description: "",
        history: "",
        shows: [
            { id: "un-cuento-de-terror", title: "Un cuento de terror", year: 2018, image: "" },
            { id: "un-mito-griego", title: "Un mito griego", year: 2019, image: "" },
            { id: "superheroes-uruguayos", title: "Superhéroes uruguayos", year: 2020, image: "" },
            { id: "la-fiesta-clandestina", title: "La fiesta clandestina", year: 2022, image: "" },
            { id: "tenemos-visitas", title: "Tenemos visitas", year: 2023, image: "" },
            { id: "enter", title: "Enter", year: 2024, image: "" },
            { id: "en-la-mala", title: "En la mala", year: 2025, image: "" },
            {
                id: "patria-o-tumba",
                title: "Patria o Tumba",
                year: 2026,
                image: "",
                credits: [
                    { role: "Dirección responsable", names: ["Camilo Abellá López"] },
                    { role: "Dirección artística", names: ["Camilo Abellá López", "Imanol Sibes", "Emiliano Tuala"] },
                    { role: "Textos", names: ["Emiliano Tuala", "Imanol Sibes", "Camilo Abellá López"] },
                    { role: "Arreglos corales y Dirección escénica", names: ["Camilo Abellá López"] },
                    { role: "Dirección de economía y finanzas", names: ["Gastón Abellá López", "Joaquín Dursi"] },
                    { role: "Coordinación", names: ["Gonzalo Rodríguez", "Sandra Abellá"] },
                    { role: "Producción", names: ["Marcelo Sanguinetti"] },
                    { role: "Gestión comercial", names: ["Malena Reyes", "Diego López", "Sandra Abellá"] },
                    { role: "Puesta en escena", names: ["Lucía García Aldaya"] },
                    { role: "Diseño de vestuario", names: ["Fernando Olita"] },
                    { role: "Realización de vestuario", names: ["Graciela Salles"] },
                    { role: "Realización de sombreros presentación y medios", names: ["Ricardo Rosas", "Sofía Beceiro", "Paula Migliaro", "Mariana Bardecio", "Gastón Haro", "Jhoanna Fonseca"] },
                    { role: "Realización de sombreros y hombreras retirada", names: ["Daniela Aparicio", "Erica Gonzalez", "Alina Kremarenko", "Martina Mansilla"] },
                    { role: "Pintado textil", names: ["Elizabeth Galarraga"] },
                    { role: "Maquillaje", names: ["Pinceladas grupo arte", "Analia Barboza", "Evangelina Paolino", "Leticia Pin"] },
                    { role: "Iluminación", names: ["Nicolás Amorín"] },
                    { role: "Pantalla", names: ["Victor González"] },
                    { role: "Sonido", names: ["Gustavo Ruvertoni"] },
                    { role: "Gestión de redes y comunicación", names: ["Diego López"] },
                    { role: "Diseño gráfico", names: ["Ramiro Garcia"] },
                    { role: "Utilería", names: ["Mauro Sánchez", "Gonzalo Rodríguez", "Gerardo Gollo", "Martín Fabruccini"] },
                    { role: "Primos", names: ["Joaquín Dursi", "Sergio Camargo", "Michael Cabrera", "Sebastián Costa", "Fernando Laforia"] },
                    { role: "Sobreprimos", names: ["Esteban Takoria", "Nicolás Ríos", "Camila Sosa"] },
                    { role: "Segundos", names: ["Gastón Abellá López", "Pablo Fernández", "Nahuel Mera", "Agustín Ríos", "Imanol Sibes"] },
                    { role: "Batería", names: ["Marcelo Sanguinetti", "Santiago de los Ángeles", "Mauricio Pérez"] }
                ]
            }
        ],
        positions: [
            "2018: 7°",
            "2019: 11°",
            "2020: 6°",
            "2021: -",
            "2022: 5°",
            "2023: 6°",
            "2024: 6°",
            "2025: 1°",
            "2026: 1°"
        ],
        discography: [],
        trivia: [],
        gallery: []
    },
    "falta-y-resto": {
        name: "Falta y Resto",
        description: "Falta y Resto es una murga uruguaya fundada en 1965. Ha sido una de las agrupaciones más influyentes y reconocidas del carnaval montevideano. Su nombre surge de una expresión utilizada en los juegos de cartas rioplatenses, y simboliza la perseverancia y la continuidad. A lo largo de su trayectoria ha obtenido múltiples primeros premios y ha sido reconocida como una de las murgas más importantes de la historia del carnaval uruguayo.",
        history: "Falta y Resto es una murga uruguaya fundada en 1965. Ha sido una de las agrupaciones más influyentes y reconocidas del carnaval montevideano. Su nombre surge de una expresión utilizada en los juegos de cartas rioplatenses, y simboliza la perseverancia y la continuidad. A lo largo de su trayectoria ha obtenido múltiples primeros premios y ha sido reconocida como una de las murgas más importantes de la historia del carnaval uruguayo.",
        shows: [
            {
                id: "2026",
                title: "2026",
                year: 2026,
                image: "",
                credits: [
                    { role: "Director responsable", names: ["Jorge Galemire", "Gustavo Remedi"] },
                    { role: "Director escénico", names: ["Gustavo Remedi"] },
                    { role: "Arreglos Corales", names: ["Gustavo Remedi"] },
                    { role: "Puesta en escena", names: ["Christian Abreu"] },
                    { role: "Textos", names: ["Joaquín Olivera", "Diego Delgrossi", "Claudio Baruzzo", "Mateo Ferreira", "Diego Ferreira", "Gustavo Remedi"] },
                    { role: "Coordinación General", names: ["Jorge Galemire", "Gustavo Remedi"] },
                    { role: "Diseño de vestuario y Sombreros", names: ["Magalí Romero", "Raquel García"] },
                    { role: "Realización de vestuario", names: ["Magalí Romero", "Raquel García"] },
                    { role: "Pantallas", names: ["Alejandro Sasso"] },
                    { role: "Maquillaje", names: ["Romina Carluccio"] },
                    { role: "Iluminación", names: ["Rody Varela"] },
                    { role: "Sonido", names: ["Gustavo Ruvertoni"] },
                    { role: "Primos", names: ["Diego Ferreira", "Blas Rodríguez", "Matías Pintos", "Sebastián López"] },
                    { role: "Sobreprimos", names: ["Jorge Delgrossi", "Micaela Casanova", "Emiliano Brena"] },
                    { role: "Segundos", names: ["Joaquín Olivera", "Claudio Baruzzo", "Mateo Ferreira", "Diego Delgrossi", "Gustavo Remedi"] },
                    { role: "Batería", names: ["Lucía Galemire", "Agustín Galemire", "Rodrigo Altmark"] }
                ]
            }
        ],
        positions: [
            "1965: 2°", "1966: 2°", "1967: 2°", "1968: 1°", "1969: 4°",
            "1970: 5°", "1971: 3°", "1972: 3°", "1973: 4°", "1974: 4°",
            "1975: 2°", "1976: 3°", "1977: 2°", "1978: 1°", "1979: 1°",
            "1980: 1°", "1981: 1°", "1982: 1°", "1983: 2°", "1984: 2°",
            "1985: 1°", "1986: 1°", "1987: 1°", "1988: 1°", "1989: 3°",
            "1990: 1°", "1991: 1°", "1992: 1°", "1993: 1°", "1994: 2°",
            "1995: 1°", "1996: 2°", "1997: 7°", "1998: 5°", "1999: 3°",
            "2000: 4°", "2001: 6°", "2002: 3°", "2003: 8°", "2004: 3°",
            "2005: 4°", "2006: 5°", "2007: 4°", "2008: 4°", "2009: 4°",
            "2010: 7°", "2011: 6°", "2012: 4°", "2013: 3°", "2014: 9°",
            "2015: 10°", "2016: 3°", "2017: 11°", "2018: 4°", "2019: 5°",
            "2020: 2°", "2021: -", "2022: 3°", "2023: 2°", "2024: 7°",
            "2025: 7°", "2026: 4°"
        ],
        discography: [],
        trivia: [],
        gallery: []
    },
    "antimurga-bcg": {
        name: "Antimurga BCG",
        description: "Propuesta innovadora que fusiona la murga tradicional con elementos contemporáneos.",
        history: "La Antimurga BCG nace como una propuesta disruptiva que busca renovar el género manteniendo su esencia crítica y popular.",
        shows: [
            {
                id: "tablado-amateur",
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
            },
            {
                id: "el-fin-del-mundo",
                title: "El Fin del Mundo",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
            }
        ],
        positions: [
            "Mención especial 2022",
            "Semifinal 2021"
        ],
        discography: [
            "Antimurga BCG - 2022"
        ],
        trivia: [
            "Fusionan elementos clásicos con propuestas modernas"
        ],
        gallery: [],
        information: "Antimurga BCG representa una nueva generación de propuestas carnavaleras."
    }
};

export const murgasAlphabet: Record<string, string[]> = {
    A: [
        "A La Bartola",
        "Agarrate Catalina",
        "Antimurga BCG",
        "Araca la Cana",
        "Asaltantes con Patente",
    ],
    B: ["Bal Condal"],
    C: [
        "Cayó la Cabra",
        "Contrafarsa",
        "Curtidores de Hongos",
    ],
    D: [
        "Diablos Verdes",
        "Don Timoteo",
        "Doña Bastarda",
    ],
    F: ["Falta y Resto"],
    L: [
        "La Antimurga Joven",
        "La Clave",
        "La Gran Muñeca",
        "La Margarita",
        "La Mojigata",
        "Los Aristócratas",
        "Los Choby Choby",
        "Los Diablos Verdes",
        "Los Diablos",
        "Los Enchufados",
        "Los Guardiola",
        "Los Muchachos",
    ],
    M: [
        "Metele que son Pasteles",
        "Momolandia",
    ],
    N: ["Nazarenos"],
    P: ["Patos Cabreros"],
    Q: ["Queso Magro"],
    R: ["Reina de la Teja"],
    S: ["Sacate el Pulover", "Salpicón"],
    V: ["Vengador Anónimo"],
    Z: ["Zíngaros"],
};

export const availableMurgas = Object.values(murgasData).map(e => e.name);

export const murgasInfo = {
    image: "/images/murgas/murgas.png",
    alt: "Murgas en escenario",
    badge: "Doña Bastarda: Primer premio de la categoría Murgas, Carnaval 2025",
    description: `La murga es una de las mayores expresiones de la cultura uruguaya por su adhesión popular. Si bien se identifica como uno de sus orígenes a Cádiz, (sobre todo desde 1908), ha tenido innumerables transformaciones desde finales del siglo XIX.

Es un género único y en las últimas décadas se ha transformado en una manifestación cultural que cosecha adeptos en todo el mundo.

La murga uruguaya, actualmente está integrada por 17 componentes: un director escénico y coral, 13 componen el coro y 3 integrantes que conforman la batería, compuesta por platillos, bombo y redoblante.`,
};
