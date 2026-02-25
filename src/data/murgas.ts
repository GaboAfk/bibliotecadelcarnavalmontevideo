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
        description: "Agarrate Catalina es una murga uruguaya fundada en 2001. En 2003 hacen su debut en el Carnaval mayor, y desde entonces obtienen el primer lugar del concurso oficial en los años 2005, 2006, 2008, 2011 y 2020 es la murga uruguaya más premiada, popular, reconocida y convocante de los últimos años. Ha trascendido las fronteras de la fiesta carnavalera local transformándose en uno de los máximos referentes de la escena artística de su país. Devenida en compañía itinerante y estable, ha recorrido como embajadora cultural de su país los cinco continentes. Sin abandonar las raíces populares comparte en cada función fotografías certeras y crudamente irónicas del ser uruguayo. Agarrate Catalina universaliza la tradición y la lleva como bandera hecha puente por el mundo. Su director responsable es Yamandú Cardozo, y los textos son realizados por el mismo junto a su hermano Tabaré Cardozo y a Carlos Tanco. Por varios años la dirección escénica y los arreglos corales estuvieron a cargo de Martin Duarte. Actualmente esa tarea la desempeña Tabaré Cardozo.",
        history: "Fundada en 1972, Agarrate Catalina es una de las murgas más queridas del carnaval montevideano. Su nombre surge de una expresión popular y representa la esencia del carnaval tradicional.",
        shows: [
            {
                id: "el-viaje",
                title: "El Viaje",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                year: 2008,
                repertoire: [
                    {
                        title: "Presentación",
                        content: "Introducción el novio de la nieta"
                    },
                    {
                        title: "Novio de la nieta",
                        content: "Novio de la nieta"
                    },
                    {
                        title: "Introducción los energizantes",
                        content: "Los Energizantes"
                    },
                    {
                        title: "Los Energizantes",
                        content: "Auto Asamblea"
                    },
                    {
                        title: "Los Viejos Militares",
                        content: "La Niebla - En prosa"
                    },
                    {
                        title: "La Niebla",
                        content: "Recitado Retirada"
                    },
                    {
                        title: "Retirada: El Viaje",
                        lyrics: "Este es el comienzo de mi viaje,\nes el final de mi camino.\nNo llevo prisa ni equipaje,\nsolo cenizas en el mar\nde este remendado corazón,\npara viajar.\n\nNavegar, siempre navegar\nsobre el cielo azul\ntan fugaz, todo es tan fugaz,\nvieja juventud,\nserá mi piel del viento sur.\nMi nombre será tierra y nada más,\nmi sangre sol, tu llanto luz,\nsemillas de la ingenua eternidad.\n\nCuando las campanas de la vieja catedral\nhablen de las huellas de mi eterna soledad,\ntodo habrá sido sólo un instante\nde fulgurante y triste oropel.\nSi el dolor se adueña del momento de partir,\nllevo contraseñas, escondites para mí\ndonde gritarle a la muerte ciega\ntodas las cosas que yo le robé.\nGuardo, para soltarle y empañarle\nla victoria,\nbalas atropelladas,\nun minuto de memoria,\ntodas mis madrugadas,\nnueve lunas, mil botellas,\nuna muchacha pobre\nque un día fue mi doncella.\nEl patio de mi infancia,\nmi ventana, todo el cielo,\nlas manos de mi padre\nprotegiéndome del mundo entero.\n\nSolo esperando mi tren\nme arrancan de mi camino\nmi sombra quemándose,\ngota por gota,\npálida,\núnica.\nEl miedo de la nada,\nla esperanza de un sendero,\nla sangre de mi sangre\ndespidiéndome del mundo entero.\nAmigos con el alma buena y el abrazo cálido,\namores de miradas limpias y de sueños ávidos,\nmillones de carcajadas empapadas de alcohol,\ncanciones a quemarropa derrotando al dolor.\nSegundos de felicidad y tres o cuatro lágrimas.\nSobrevivientes, náufragos, inquilinos,\nsomos la sombra heroica de lo que fuimos.\nFuimos peleando tercos como pudimos\nesta batalla inútil contra el destino.\nLlevo un juramento sin jurar,\nllevo una oración sin terminar,\nel dolor de no ser nada más\ny mi testamento sin firmar.\nNada tuve, nada dejé:\nmi pobreza ya me la gasté.\nSi hoy tengo una flor en el ojal\nes para dejarle en el final.\nSi he de morir\nque me muera de tanto vivir,\ncon la furia de la tempestad\nincendiándome el alma\nal partir.\n\nSi he de partir\nque me parta la vida\nun amor\ny transforme mis huesos en flor\nen algún carnaval.\nY todo lo que fui\nlo dejo en el adiós,\nviviendo en el lugar\nde lo que soy.\nY lo que quise ser\ndetrás de este telón\napenas fue\nuna efímera ilusión\nYa se encienden las luces del final.\nAgradezco porque llegué hasta acá\nescapando a la muerte en un camión,\nen un camión que se va."
                    }
                ],
                credits: [
                    {
                        role: "Director Responsable",
                        names: [
                            "Yamandú Cardozo"
                        ]
                    },
                    {
                        role: "Textos",
                        names: [
                            "Yamandú Cardozo",
                            "Tabaré Cardozo",
                            "Carlos Tanco (con aportes de: Martín Cardozo, Rafael Cotelo y Gonzalo Camarotta)"
                        ]
                    },
                    {
                        role: "Director escénico",
                        names: [
                            "Martín Duarte"
                        ]
                    },
                    {
                        role: "Arreglos corales",
                        names: [
                            "Martín Duarte"
                        ]
                    },
                    {
                        role: "Puesta en escena",
                        names: [
                            "Freddy González"
                        ]
                    },
                    {
                        role: "Vestuario",
                        names: [
                            "Hugo Millán"
                        ]
                    },
                    {
                        role: "Realización de vestuario",
                        names: [
                            "Hugo Millán",
                            "Mariela Villasante",
                            "María Brum"
                        ]
                    },
                    {
                        role: "Maquillaje",
                        names: [
                            "Paula Gómez"
                        ]
                    },
                    {
                        role: "Sombreros",
                        names: [
                            "Daniel Ovidio",
                            "Mariana Fernández Cabrera",
                            "Marian Ghougassian"
                        ]
                    },
                    {
                        role: "Escenografía, seres humanos, pelucas y accesorios",
                        names: [
                            "Alfredo Iriarte",
                            "Mariano Junio",
                            "María López",
                            "Gabriela Guastavino"
                        ]
                    },
                    {
                        role: "Cuerda de primos",
                        names: [
                            "Yamandú Cardozo",
                            "Matías Beracochea",
                            "Martín Cardozo",
                            "Darío Rabotti",
                            "Andrés Pazos",
                            "Leonardo Viana"
                        ]
                    },
                    {
                        role: "Cuerda de sobreprimos",
                        names: [
                            "Carolina Gómez",
                            "Victoria Gómez",
                            "Ivanna Amarillo"
                        ]
                    },
                    {
                        role: "Cuerda de segundos",
                        names: [
                            "Rafael Cotelo",
                            "Richard Parado",
                            "Diego Pérez",
                            "Eder Fructos",
                            "Carlos Barraza",
                            "Maximiliano Pérez",
                            "Levón Guiondjián"
                        ]
                    },
                    {
                        role: "Bombo",
                        names: [
                            "Nicolás Arnicho"
                        ]
                    },
                    {
                        role: "Platillos",
                        names: [
                            "Humberto Orique"
                        ]
                    },
                    {
                        role: "Redoblante",
                        names: [
                            "Diego Bustelo"
                        ]
                    },
                    {
                        role: "Iluminación",
                        names: [
                            "Martín Blanchet"
                        ]
                    },
                    {
                        role: "Asistente de iluminación",
                        names: [
                            "Adrián Basedas"
                        ]
                    },
                    {
                        role: "Utilería",
                        names: [
                            "Federico Fernández",
                            "Lilia Fernández",
                            "Nicolás Gentile",
                            "Hugo Moroni"
                        ]
                    },
                    {
                        role: "Transporte",
                        names: [
                            "Rodolfo \"Manzana\" Montemurro"
                        ]
                    }
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
                id: "tablado-amateur",
                title: "Tablado Amateur",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
                year: 2010,
                repertoire: [
                    {
                        title: "Presentación",
                        content: "Introducción el novio de la nieta"
                    }
                ]
            },
            {
                id: "el-fin-del-mundo",
                title: "El Fin del Mundo",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
            },
            {
                id: "defensores-causas",
                title: "Defensores Causas",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
            },
            {
                id: "el-tiempo",
                title: "El Tiempo",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
            },
            {
                id: "el-corso-del-humano",
                title: "El Corso del Humano",
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
            },
            {
                id: "la-comunidad",
                title: "La Comunidad",
                image: "https://www.agarratecatalina.com.uy/media/widgetkit/lacomunidad-254ed9f508419fb53c2738506175540d.jpg",
                year: 2012,
                credits: [
                    {
                        role: "Director Responsable",
                        names: [
                            "Yamandú Cardozo "
                        ]
                    },
                    {
                        role: "Textos",
                        names: [
                            "Yamandú Cardozo, Tabaré Cardozo  (con aportes de: Carlos Tanco, Martín Cardozo, Rafael Cotelo)"
                        ]
                    },
                    {
                        role: "Músicas inéditas",
                        names: [
                            "Pablo Porciúncula, Tabaré Cardozo, Darío Prieto"
                        ]
                    }
                ],
                data: "La Comunidad\n: \n\nTextos: Yamandú Cardozo, Tabaré Cardozo  (con aportes de: Carlos Tanco, Martín Cardozo, Rafael Cotelo)\n\nMúsicas inéditas: Pablo Porciúncula, Tabaré Cardozo, Darío Prieto\n\nArreglos corales: Darío Prieto (colaboración de Tabaré Cardozo, Pablo Porciúncula)\n\nPuesta en escena: Alberto “Coco” Rivero\n\nDiseño de vestuario: Mercedes Lalanne\n\nAsistente de vestuario: Victoria Cretenze\n\nRealización de vestuario: Mari Grün \n\nRealización de Sombreros: Daniel Ovidio Fernández y Mariana Fernández\n\nMáscaras, escenografía, accesorios: Diseño: Alfredo Iriarte, Gabriela\n\nGuastavino Realización: Alfredo Iriarte, Gabriela Guastavino, Mariano Junio, María López\n\nMaquillaje: Paula Gómez\n\nIluminación: José María Papariello\n\nSonido: Carlos Sículi \n\nDirector escénico: Darío Prieto\n\nCuerda de primos: Yamandú Cardozo, Matías Beracochea, Martín Cardozo, Darío Rabotti, Andrés Pazos, Maximiliano Porciúncula\n\nCuerda de sobreprimos: Carolina Gómez, Victoria Gómez, Maximiliano       Porciúncula, Freddy Bessio\n\nCuerda de segundos: Diego Pérez, Aníbal Pazos, Eder Fructos, Levón Guiondjián, Leonardo Viana, Nicolás Minetti\n\nBombo: Freddy “Zurdo” Bessio  \n\nPlatillos: Humberto “Samanta” Orique, Nicolás Verde\n\nRedoblante: Diego Bustelo, Nicolás Verde\n\nSuplentes en giras: Dustin Scotto, Michel González, Pablo Porciúncula\n\nUtilería: Federico Fernández, Nicolás Gentile, Hernán Futten\n\nTransporte: Pablo Cabrera\n\nVentas: Viviana Ortiz\n\nLocal de ensayo: Club Banco Hipotecario, Iglesia Metodista del Buceo y Anfiteatro  Torre de las Telecomunicaciones\n\nCoordinación general: Aníbal Pazos, Andrés Pazos y Fernando Mino\n\nProducción comercial y contrataciones: Fernando Mino",
                gallery: [
                    "/images/murgas/lacomunidad-agarrate-catalina.jpg"
                ]
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
