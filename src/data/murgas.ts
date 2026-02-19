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
    promotionDate: string;
    year?: number;
    repertoire?: ShowSection[];
    presentation?: string;
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
        description: "Agarrate Catalina es una murga uruguaya fundada en 2001. En 2003 hacen su debut en el Carnaval mayor, y desde entonces obtienen el primer lugar del concurso oficial en los años 2005, 2006, 2008, 2011 y 2020 es la murga uruguaya más premiada, popular, reconocida y convocante de los últimos años. Ha trascendido las fronteras de la fiesta carnavalera local transformándose en uno de los máximos referentes de la escena artística de su país. Devenida en compañía itinerante y estable, ha recorrido como embajadora cultural de su país los cinco continentes. Sin abandonar las raíces populares comparte en cada función fotografías certeras y crudamente irónicas del ser uruguayo. Agarrate Catalina universaliza la tradición y la lleva como bandera hecha puente por el mundo. Su director responsable es Yamandú Cardozo, y los textos son realizados por el mismo junto a su hermano Tabaré Cardozo y a Carlos Tanco. Por varios años la dirección escénica y los arreglos corales estuvieron a cargo de Martin Duarte. Actualmente esa tarea la desempeña Tabaré Cardozo.",
        history: "Fundada en 1972, Agarrate Catalina es una de las murgas más queridas del carnaval montevideano. Su nombre surge de una expresión popular y representa la esencia del carnaval tradicional.",
        shows: [
            {
                id: "agarrate-el-viaje",
                title: "El Viaje",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-02-15",
                year: 2008,
                presentation: "Este es el comienzo de mi viaje, es el final de mi camino. No llevo prisa ni equipaje, solo cenizas en el mar de este remendado corazón, para viajar.",
                repertoire: [
                    { title: "Presentación", content: "Introducción el novio de la nieta" },
                    { title: "Novio de la nieta", content: "Novio de la nieta" },
                    { title: "Introducción los energizantes", content: "Los Energizantes" },
                    { title: "Los Energizantes", content: "Auto Asamblea" },
                    { title: "Los Viejos Militares", content: "La Niebla - En prosa" },
                    { title: "La Niebla", content: "Recitado Retirada" },
                    {
                        title: "Retirada: El Viaje",
                        lyrics: `Este es el comienzo de mi viaje,
es el final de mi camino.
No llevo prisa ni equipaje,
solo cenizas en el mar
de este remendado corazón,
para viajar.

Navegar, siempre navegar
sobre el cielo azul
tan fugaz, todo es tan fugaz,
vieja juventud,
será mi piel del viento sur.
Mi nombre será tierra y nada más,
mi sangre sol, tu llanto luz,
semillas de la ingenua eternidad.

Cuando las campanas de la vieja catedral
hablen de las huellas de mi eterna soledad,
todo habrá sido sólo un instante
de fulgurante y triste oropel.
Si el dolor se adueña del momento de partir,
llevo contraseñas, escondites para mí
donde gritarle a la muerte ciega
todas las cosas que yo le robé.
Guardo, para soltarle y empañarle
la victoria,
balas atropelladas,
un minuto de memoria,
todas mis madrugadas,
nueve lunas, mil botellas,
una muchacha pobre
que un día fue mi doncella.
El patio de mi infancia,
mi ventana, todo el cielo,
las manos de mi padre
protegiéndome del mundo entero.

Solo esperando mi tren
me arrancan de mi camino
mi sombra quemándose,
gota por gota,
pálida,
única.
El miedo de la nada,
la esperanza de un sendero,
la sangre de mi sangre
despidiéndome del mundo entero.
Amigos con el alma buena y el abrazo cálido,
amores de miradas limpias y de sueños ávidos,
millones de carcajadas empapadas de alcohol,
canciones a quemarropa derrotando al dolor.
Segundos de felicidad y tres o cuatro lágrimas.
Sobrevivientes, náufragos, inquilinos,
somos la sombra heroica de lo que fuimos.
Fuimos peleando tercos como pudimos
esta batalla inútil contra el destino.
Llevo un juramento sin jurar,
llevo una oración sin terminar,
el dolor de no ser nada más
y mi testamento sin firmar.
Nada tuve, nada dejé:
mi pobreza ya me la gasté.
Si hoy tengo una flor en el ojal
es para dejarle en el final.
Si he de morir
que me muera de tanto vivir,
con la furia de la tempestad
incendiándome el alma
al partir.

Si he de partir
que me parta la vida
un amor
y transforme mis huesos en flor
en algún carnaval.
Y todo lo que fui
lo dejo en el adiós,
viviendo en el lugar
de lo que soy.
Y lo que quise ser
detrás de este telón
apenas fue
una efímera ilusión
Ya se encienden las luces del final.
Agradezco porque llegué hasta acá
escapando a la muerte en un camión,
en un camión que se va.`
                    }
                ],
                credits: [
                    { role: "Director Responsable", names: ["Yamandú Cardozo"] },
                    { role: "Textos", names: ["Yamandú Cardozo", "Tabaré Cardozo", "Carlos Tanco (con aportes de: Martín Cardozo, Rafael Cotelo y Gonzalo Camarotta)"] },
                    { role: "Director escénico", names: ["Martín Duarte"] },
                    { role: "Arreglos corales", names: ["Martín Duarte"] },
                    { role: "Puesta en escena", names: ["Freddy González"] },
                    { role: "Vestuario", names: ["Hugo Millán"] },
                    { role: "Realización de vestuario", names: ["Hugo Millán", "Mariela Villasante", "María Brum"] },
                    { role: "Maquillaje", names: ["Paula Gómez"] },
                    { role: "Sombreros", names: ["Daniel Ovidio", "Mariana Fernández Cabrera", "Marian Ghougassian"] },
                    { role: "Escenografía, seres humanos, pelucas y accesorios", names: ["Alfredo Iriarte", "Mariano Junio", "María López", "Gabriela Guastavino"] },
                    { role: "Cuerda de primos", names: ["Yamandú Cardozo", "Matías Beracochea", "Martín Cardozo", "Darío Rabotti", "Andrés Pazos", "Leonardo Viana"] },
                    { role: "Cuerda de sobreprimos", names: ["Carolina Gómez", "Victoria Gómez", "Ivanna Amarillo"] },
                    { role: "Cuerda de segundos", names: ["Rafael Cotelo", "Richard Parado", "Diego Pérez", "Eder Fructos", "Carlos Barraza", "Maximiliano Pérez", "Levón Guiondjián"] },
                    { role: "Bombo", names: ["Nicolás Arnicho"] },
                    { role: "Platillos", names: ["Humberto Orique"] },
                    { role: "Redoblante", names: ["Diego Bustelo"] },
                    { role: "Iluminación", names: ["Martín Blanchet"] },
                    { role: "Asistente de iluminación", names: ["Adrián Basedas"] },
                    { role: "Utilería", names: ["Federico Fernández", "Lilia Fernández", "Nicolás Gentile", "Hugo Moroni"] },
                    { role: "Transporte", names: ["Rodolfo \"Manzana\" Montemurro"] }
                ],
                gallery: [
                    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
                    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
                    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
                    "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80",
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
                    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80"
                ]
            },
            {
                id: "agarrate-tablado-amateur",
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-02-15"
            },
            {
                id: "agarrate-fin-mundo",
                title: "El Fin del Mundo",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-02-20"
            },
            {
                id: "agarrate-defensores",
                title: "Defensores Causas",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-02-25"
            },
            {
                id: "agarrate-tiempo",
                title: "El Tiempo",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-03-01"
            },
            {
                id: "agarrate-corso",
                title: "El Corso del Humano",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-03-05"
            }
        ],
        positions: [
            "Primer lugar 2023",
            "Primer lugar 2020",
            "Primer lugar 2011",
            "Primer lugar 2008",
            "Primer lugar 2006",
            "Primer lugar 2005"
        ],
        discography: [
            "Agarrate Catalina - Álbum 2023",
            "Memorias de un Carnaval - 2021",
            "El País de las Maravillas - 2019",
            "Crisis de Identidad - 2017"
        ],
        trivia: [
            "La murga ha actuado en más de 50 países",
            "Su nombre proviene de una expresión popular uruguaya",
            "Yamandú Cardozo es el director desde su fundación",
            "Han ganado el premio mayor del carnaval 6 veces"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
        ],
        information: "Agarrate Catalina es una compañía de teatro itinerante que ha revolucionado la escena carnavalera uruguaya. Con una trayectoria de más de 20 años, se ha consolidado como una de las propuestas más innovadoras y convocantes del carnaval."
    },
    "antimurga-bcg": {
        name: "Antimurga BCG",
        description: "Propuesta innovadora que fusiona la murga tradicional con elementos contemporáneos.",
        history: "La Antimurga BCG nace como una propuesta disruptiva que busca renovar el género manteniendo su esencia crítica y popular.",
        shows: [
            {
                id: "antimurga-tablado",
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-02-18"
            },
            {
                id: "antimurga-fin",
                title: "El Fin del Mundo",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                promotionDate: "2024-02-22"
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
