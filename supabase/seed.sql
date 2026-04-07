-- ============================================================
-- SEED 001: Datos iniciales
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, image, info_image, info_alt, info_badge, info_description) VALUES
(
    'Murgas', 'murgas',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    '/images/murgas/murgas.png',
    'Murgas en escenario',
    'Doña Bastarda: Primer premio de la categoría Murgas, Carnaval 2025',
    'La murga es una de las mayores expresiones de la cultura uruguaya por su adhesión popular. Si bien se identifica como uno de sus orígenes a Cádiz, (sobre todo desde 1908), ha tenido innumerables transformaciones desde finales del siglo XIX.

Es un género único y en las últimas décadas se ha transformado en una manifestación cultural que cosecha adeptos en todo el mundo.

La murga uruguaya, actualmente está integrada por 17 componentes: un director escénico y coral, 13 componen el coro y 3 integrantes que conforman la batería, compuesta por platillos, bombo y redoblante.'
),
(
    'Humoristas', 'humoristas',
    'https://images.unsplash.com/photo-1514306688772-e0d5d0b17d31?w=800&q=80',
    '/images/humoristas/humoristas.jpg',
    'Elenco de humoristas en el escenario',
    'Los Carlitos: Premio a mejor espectáculo humorístico 2025',
    'Esta categoría tiene como principal finalidad el humor.

A diferencia de otras categorías del carnaval, el eje del espectáculo de humoristas se encuentra en la construcción de situaciones humorísticas originales, más que en la parodia de argumentos previamente conocidos. Los distintos cuadros que integran el espectáculo pueden abordar temas de actualidad, escenas de la vida cotidiana o personajes caricaturescos, recurriendo al absurdo, la sátira, el juego verbal y el humor físico como principales recursos expresivos.'
),
(
    'Parodistas', 'parodistas',
    'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
    '/images/parodistas/parodistas.jpg',
    'Parodistas en escena teatral',
    'Los Muchachos: primer premio en categoría parodistas 2020',
    'Los conjuntos de parodistas presentan espectáculos teatrales-musicales basados en la parodia de argumentos provenientes de obras literarias, relatos históricos, biografías o hechos y personajes de conocimiento público.'
),
(
    'Revistas', 'revistas',
    'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=800&q=80',
    '/images/revistas/revistas.jpg',
    'Vestuario colorido de revistas',
    'Tabú: primer premio en categoría revistas 2020',
    'Inspiradas en el formato de la revista musical teatral, estas agrupaciones se caracterizan por el protagonismo de las coreografías, los arreglos musicales y la puesta en escena, así como por la utilización de vestuarios elaborados, escenografías y cambios de cuadro que construyen un espectáculo dinámico y variado.'
),
(
    'Sociedad de negros y lubolos', 'sociedades',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    '/images/sociedades/sociedad_de_negros_y_lubolos.jpg',
    'Comparsa de negros y lubolos',
    'Yambo Kenia - 2018',
    'La categoría Sociedades de Negros y Lubolos es una de las expresiones tradicionales del carnaval, vinculada históricamente a la cultura afro-uruguaya.

Los conjuntos de esta categoría presentan espectáculos basados en la interpretación del candombe, mediante un cuerpo de baile, personajes tradicionales y una cuerda de tambores integrada por chico, repique y piano, instrumentos característicos de este género musical.'
);


-- ============================================================
-- STATIC CONTENT
-- ============================================================
INSERT INTO static_content (id, title, body, image) VALUES (
    'nuestra-biblioteca',
    'Nuestra Biblioteca',
    'La Biblioteca Oficial del Carnaval funciona desde la convicción de que sólo existe la cultura si la misma es puesta en valor. Cada libreto, fotografía y recuerdo de nuestro carnaval es una identidad que forma parte de nuestra historia colectiva. La idea nace de observar una ausencia, un punto en común, en donde podemos encontrar todos estos registros, materiales históricos que nos constituyen.

Este proyecto comienza como una iniciativa de recopilación y organización, transformándose en algo más amplio: un espacio de preservación, investigación y acceso. Dar orden, contexto y visibilidad a estos contenidos, intentando universalizarlos.

Nuestra misión es preservar, organizar y difundir el acervo cultural del carnaval, garantizando que artistas, estudiantes y público general puedan acceder a información confiable y en constante desarrollo. Creemos en el conocimiento abierto, y en el valor de la memoria como herramienta para transitar el presente.

Aspiramos a que esta Biblioteca no sea solo un espacio de consulta, sino un punto de encuentro donde la historia dialogue con la creación contemporánea.

Este proyecto se desarrolla de manera progresiva, sumando materiales, clasificando contenidos, estableciendo criterios claros de catalogación y construyendo una estructura que permita el crecimiento constante.

Nuestra Biblioteca busca trascender la función del archivo, construir una iniciativa orientada a la memoria colectiva. Esto implica reconocer el valor histórico del carnaval y la necesidad de su preservación como parte de nuestra cultura, recorrido e historia.

Los montevideanos fueron los protagonistas de la fiesta durante décadas, luego esa participación fue decayendo y hoy se han vuelto simplemente espectadores. Se ha delegado el protagonismo a los carnavaleros (pues son "los que saben"), de este modo el espectáculo se fue volviendo más profesional y menos amateur, no tan callejero y ya no tan popular.

El Carnaval es la mayor fiesta popular de nuestro país. En Uruguay se festeja desde tiempos de la Colonia, habiéndose transformado desde la tradicional "fiesta bárbara" con asaltos y guerrillas callejeras características del Siglo XIX, hasta la "civilizada" fiesta de desfiles y tablados barriales consolidada en el Siglo XX y hasta la actualidad. En Montevideo esta fiesta se inaugura con un desfile que se realiza por la avenida 18 de Julio, en el que participan las principales agrupaciones del carnaval (parodistas, murgas, humoristas, revistas y comparsas de negros y lubolos), que forman parte del Concurso Oficial.

Dos semanas después se realiza la máxima fiesta de la colectividad afro-uruguaya: el Desfile de Llamadas, donde las protagonistas son decenas de comparsas que tocan y danzan el ritmo del candombe, mientras recorren la calle Isla de Flores entre los barrios Sur y Palermo.

Durante sus primeras décadas, los carnavales en Uruguay se festejaban con bailes de disfraces, juegos de agua, caballadas por la ciudad, sin la presencia de la colectividad afrodescendiente. Las Comparsas o Sociedades de Negros y Lubolos, comenzaron a incorporarse a los desfiles de Carnaval en la década de 1870, pero recién a comienzos del Siglo XX incorporando en sus participaciones la práctica del candombe. A lo largo del siglo XX las comparsas se fueron consolidando en relación con las festividades del carnaval montevideano, participando también de su concurso y tablados.

En sus inicios, los desfiles de Carnaval abarcaban un largo recorrido: partían de la Plaza Constitución, recorrían varias calles de la Ciudad Vieja, pasaban por 18 de Julio, llegaban hasta la Plaza Cagancha y regresaban al punto de partida por otro recorrido. Los avances tecnológicos trajeron la iluminación, primero a gas y después a electricidad, que engalanaron las avenidas cada año con más esplendor.

Entre finales del siglo XIX y comienzos del XX, nuestro Carnaval se convirtió en uno de los más largos del mundo, extendiéndose a lo largo de cuarenta días. Durante todo febrero y parte de marzo las agrupaciones actúan en escenarios barriales llamados tablados, y en el concurso oficial en el Teatro de Verano Ramón Collazo.

Junto a las actividades centrales y tradicionales del Concurso Oficial, Desfile Inaugural, Desfile de Llamadas y tablados y corsos barriales, en las últimas décadas se han consolidado otros espacios de gran participación en torno a las festividades de carnaval: el Desfile de Escuelas de Samba, desarrollado en la Av. 18 de Julio al día siguiente del Desfile Inaugural; el Carnaval de las Promesas, que en las 5 categorías del carnaval nuclea a niñas, niños y adolescentes de diversos barrios de la capital; y el encuentro de Murga Joven, que nuclea decenas de jóvenes entre 15 y 35 años que forman parte de colectivos de murga.

La palabra "carnaval" proviene del italiano carnavale, y ésta del latín carnelevare, asociada al comienzo del ayuno de Cuaresma, una suerte de "adiós a la carne". El carnaval incluye a numerosas manifestaciones populares que, según se sostenía ya en 1444, "son necesarios para que lo ridículo, que es nuestra segunda naturaleza, innata en el hombre, pueda manifestarse libremente al menos una vez al año".

En Uruguay, los festejos de carnaval llegaron desde España y de la mano de las prácticas que los primeros pobladores del país fueron imponiendo en la zona, como la costumbre de tirarse con huevos frescos o vaciados y rellenados con agua, imitando el carnaval medieval Europeo. A fines del siglo XVIII se intentó "racionalizar" estos desbordados festejos callejeros y espontáneos, institucionalizando las manifestaciones artísticas.

Momo es la figura del carnaval por excelencia. En la mitología griega, el Dios Momo personificaba el sarcasmo, la burla y la ironía. Era representado con una máscara y sosteniendo un muñeco o un cetro que tenía en su extremo una cabeza grotesca.', '/plaza-cagancha.jpg'
);


-- ============================================================
-- HERO FRASES
-- ============================================================
INSERT INTO hero_frases (image, subtitle, title, sort_order, active) VALUES
('/hero/Copia de IMG_5647.jpg', 'Sabemos que', 'Solo hay cultura si se pone en valor', 1, true);


-- ============================================================
-- NOVEDADES
-- ============================================================
INSERT INTO novedades (id, color, title, image, description, content, date) VALUES
(
    'nueva-coleccion-murgas-historicas',
    'var(--color-carnaval-orange)',
    'Nueva colección: Murgas Históricas',
    'https://images.unsplash.com/photo-1697791173189-d56b15df4f33?w=800&q=80',
    'Descubre la nueva colección de documentos históricos sobre las murgas más emblemáticas del carnaval uruguayo.',
    'Esta colección reúne fotografías, programas, vestuarios y documentos originales de las murgas más importantes de la historia del carnaval montevideano.',
    '2024-02-15'
),
(
    'exposicion-de-fotografias-1920-1980',
    'var(--color-carnaval-yellow)',
    'Exposición de fotografías 1920-1980',
    'https://images.unsplash.com/photo-1637862666931-be59da5dd8ca?w=800&q=80',
    'Una retrospectiva visual de seis décadas del carnaval a través de las lentes de los fotógrafos más destacados.',
    'Esta exposición presenta más de 200 fotografías originales que documentan la evolución del carnaval uruguayo desde los años 20 hasta los 80.',
    '2024-02-10'
),
(
    'archivo-sonoro-digitalizado',
    'var(--color-carnaval-green)',
    'Archivo sonoro digitalizado',
    'https://images.unsplash.com/photo-1764762164486-b6d565f706ff?w=800&q=80',
    'Accede a grabaciones históricas de murgas, humoristas y parodistas del carnaval uruguayo.',
    'Hemos digitalizado cientos de grabaciones de audio que datan desde los años 60 hasta la actualidad.',
    '2024-02-05'
);


-- ============================================================
-- CARNAVAL 2026 EDITION
-- ============================================================
INSERT INTO carnaval_editions (id, year, title, image, alt, badge, intro)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    2026,
    'Carnaval 2026',
    '/carnaval2026.png',
    'Carnaval 2026',
    'Doña Bastarda: Primer premio Murgas · Sociedad Anónima: Primer premio Humoristas · Momosapiens: Primer premio Parodistas · Yambo Kenia: Primer premio Sociedades · La Compañía: Primer premio Revistas',
    'Finalizó el Concurso Oficial del Carnaval 2026 y estos son los resultados:'
);


-- ============================================================
-- PUNTAJES 2026
-- ============================================================
INSERT INTO puntajes (edition_id, categoria, puesto, nombre, puntos) VALUES
-- Murgas
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 1,  'Doña Bastarda',            2757),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 2,  'La Gran Muñeca',           2646),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 3,  'La Nueva Milonga',         2644),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 4,  'Falta y Resto',            2643),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 5,  'Cayó la Cabra',            2641),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 6,  'Patos Cabreros',           2621),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 7,  'Un Título Viejo',          2583),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 8,  'La Trasnochada',           2545),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 9,  'Queso Magro',              2454),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 10, 'Los Diablos Verdes',       2443),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 11, 'Curtidores de Hongos',     1531),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 12, 'La Margarita',             1504),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 13, 'Don Bochinche y Compañía', 1459),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 14, 'A la Bartola',             1435),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 15, 'La Mojigata',              1432),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 16, 'Jorge',                    1422),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 17, 'Gente Grande',             1396),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 18, 'Mi Vieja Mula',            1385),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'murgas', 19, 'Jardín del Pueblo',        1309),
-- Parodistas
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'parodistas', 1, 'Momosapiens',    1110),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'parodistas', 2, 'Caballeros',     1060),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'parodistas', 3, 'Zíngaros',       1047),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'parodistas', 4, 'Los muchachos',  950),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'parodistas', 5, 'Adam''s',        583),
-- Sociedades
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'sociedades', 1, 'Yambo Kenia',        1132),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'sociedades', 2, 'Valores',            1119),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'sociedades', 3, 'Integración',        1102),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'sociedades', 4, 'La Sara del Cordón', 1034),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'sociedades', 5, 'Más que lonja',      583),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'sociedades', 6, 'Herencia Ancestral', 495),
-- Humoristas
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'humoristas', 1, 'Sociedad Anónima', 1147),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'humoristas', 2, 'Cyranos',          1092),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'humoristas', 3, 'Los Rolin',        1075),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'humoristas', 4, 'Los Chobys',       596),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'humoristas', 5, 'Social Club',      536),
-- Revistas
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'revistas', 1, 'La Compañía',  1416),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'revistas', 2, 'Tabú',         1382),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'revistas', 3, 'Madame Gótica', 1253),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'revistas', 4, 'Carambola',    693),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'revistas', 5, 'House',        664);


-- ============================================================
-- MENCIONES 2026 - directas
-- ============================================================
INSERT INTO menciones (edition_id, tipo, titulo, ganadores) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'directa', 'Revelación Del Carnaval',                                        ARRAY['Más Que Lonja']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'directa', 'Figura Máxima Del Carnaval',                                     ARRAY['Imanol Sibes']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'directa', 'Figura De Oro',                                                  ARRAY['Raúl Castro']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'directa', 'Mejor Espectáculo De Carnaval',                                  ARRAY['Doña Bastarda']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'directa', 'Diploma Especial Al Espectáculo Promotor De Igualdad De Género', ARRAY['Madame Gótica']);

-- Menciones técnicas directas (agrupadas por sección y categoría)
INSERT INTO menciones (edition_id, tipo, titulo, seccion, categoria, ganadores) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Vestuario', 'Mejor Vestuario', 'Murgas',                    ARRAY['La Gran Muñeca']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Vestuario', 'Mejor Vestuario', 'Parodistas',                ARRAY['Zíngaros']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Vestuario', 'Mejor Vestuario', 'Sociedades de Negros y Lubolos', ARRAY['Yambo Kenia']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Vestuario', 'Mejor Vestuario', 'Humoristas',                ARRAY['Sociedad Anónima']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Vestuario', 'Mejor Vestuario', 'Revistas',                  ARRAY['La Compañía']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Maquillaje', 'Mejor Maquillaje', 'Murgas',                  ARRAY['Falta Y Resto']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Maquillaje', 'Mejor Maquillaje', 'Comparsas',               ARRAY['Valores']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_directa', 'Mejor Maquillaje', 'Mejor Maquillaje', 'Revistas',                ARRAY['La Compañía']);

-- Menciones técnicas nominación
INSERT INTO menciones (edition_id, tipo, titulo, ganadores) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_nominacion', 'Mejor Puesta En Escena Del Carnaval', ARRAY['Momosapiens', 'Doña Bastarda']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_nominacion', 'Mejor Libreto Del Carnaval',          ARRAY['Momosapiens', 'Cayó La Cabra']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_nominacion', 'Mejor Iluminación De Carnaval',       ARRAY['Zíngaros', 'Doña Bastarda', 'Yambo Kenia', 'Falta Y Resto', 'La Trasnochada', 'La Gran Muñeca']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'tecnica_nominacion', 'Mejor Arreglador Coral Del Carnaval', ARRAY['Agustín Amuedo (Los Muchachos)', 'Aníbal González (Yambo Kenia)', 'Martin Souza (La Trasnochada)']);

-- Menciones colectivas
INSERT INTO menciones (edition_id, tipo, titulo, ganadores) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'colectiva', 'Mejor Batería De Murga',   ARRAY['Cayó La Cabra', 'La Nueva Milonga', 'Patos Cabreros']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'colectiva', 'Mejor Cuerda De Tambores', ARRAY['Valores', 'Yambo Kenia', 'Integración']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'colectiva', 'Mejor Conjunto Musical',   ARRAY['La Compañía', 'Yambo Kenia', 'Tabú']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'colectiva', 'Mejor Coro De Murga',      ARRAY['Falta Y Resto', 'La Nueva Milonga', 'Patos Cabreros']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'colectiva', 'Mejor Retirada De Murga',  ARRAY['Doña Bastarda', 'Don Bochinche Y Compañía', 'Patos Cabreros', 'Falta Y Resto']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'colectiva', 'Mejor Parodia',            ARRAY['Coda (Momosapiens)', 'El Sabalero (Caballeros)', 'Alí (Zíngaros)']);

-- Menciones individuales
INSERT INTO menciones (edition_id, tipo, titulo, ganadores) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'individual', 'Mejor Vedette',                  ARRAY['Tamara Esnal (Valores)', 'Micaela Gares (Yambo Kenia)', 'Fatima Curzio (Integración)']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'individual', 'Mejor Actor',                    ARRAY['Mauricio González (Valores)', 'Maxi Azambuya (Momosapiens)', 'Federico Pereyra (Momosapiens)']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'individual', 'Mejor Actriz',                   ARRAY['Mariana Sayas (Adam''s)', 'María Elena Pérez (Valores)', 'Gabriela Fumia (La Compañía)']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'individual', 'Figura De Murgas',               ARRAY['Fabrizio Silvera (La Nueva Milonga)', 'Majo Gardiol (La Margarita)', 'Mayra Sepulveda (Cayó La Cabra)']),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'individual', 'Mejor Solista Masculino De Murga', ARRAY['Alexander Silva (Diablos Verdes)', 'Agustín Fuentes (La Margarita)', 'Agustín Pitaluga (Patos Cabreros)']);


-- ============================================================
-- AGRUPACIONES - Murgas
-- ============================================================
INSERT INTO agrupaciones (slug, category_slug, name, description, history, positions, discography, trivia) VALUES
(
    'agarrate-catalina', 'murgas', 'Agarrate Catalina',
    '',
    'La murga surge en abril de 2001, producto de la unión de Yamandú Cardozo y Carlos Tanco y otros artistas e integrantes de la murga "Eterna madrugada". Realizan su debut en el Concurso Oficial del Carnaval en el año 2003 con el espectáculo "Tablado Amateur". Obtuvieron el primer lugar del concurso oficial en los años 2005, 2006, 2008, 2011 y 2020.',
    ARRAY['2003: 11°','2004: 10°','2005: 1°','2006: 1°','2007: 5°','2008: 1°','2010: 4°','2011: 1°','2012: 10°','2019: 2°','2020: 1°','2022: 2°'],
    ARRAY['El tiempo (2004)','Los sueños (2005)','El fin del mundo (2006)','El viaje (2008)','Civilización (2010)','La Comunidad (2012)','Un Día de Julio (2016)','Defensores de Causas Perdidas (2019)','Amor y Odio (2020)','La Involución de las Especies (2023)'],
    ARRAY['La murga surge en abril de 2001 por iniciativa de Yamandú Cardozo y Carlos Tanco','Debutaron en el Concurso Oficial en 2003','Obtuvieron 5 primeros premios: 2005, 2006, 2008, 2011 y 2020','Han recorrido los cinco continentes como embajadores culturales del Uruguay']
),
(
    'falta-y-resto', 'murgas', 'Falta y Resto',
    'Falta y Resto es una murga uruguaya fundada en 1965. Ha sido una de las agrupaciones más influyentes y reconocidas del carnaval montevideano.',
    'Falta y Resto es una murga uruguaya fundada en 1965. Ha sido una de las agrupaciones más influyentes y reconocidas del carnaval montevideano. Su nombre surge de una expresión utilizada en los juegos de cartas rioplatenses.',
    ARRAY['1965: 2°','1968: 1°','1978: 1°','1979: 1°','1980: 1°','1985: 1°','1990: 1°','2020: 2°','2026: 4°'],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[]
),
(
    'a-la-bartola', 'murgas', 'A La Bartola',
    '',
    '',
    ARRAY['2018: 7°','2019: 11°','2020: 6°','2022: 5°','2023: 6°','2024: 6°','2025: 1°','2026: 1°'],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[]
);


-- ============================================================
-- SHOWS para Agarrate Catalina (ejemplo con datos completos)
-- ============================================================
-- Primero obtenemos el id de agarrate-catalina
DO $$
DECLARE
    ag_id UUID;
    show_id UUID;
BEGIN
    SELECT id INTO ag_id FROM agrupaciones WHERE slug = 'agarrate-catalina';

    -- Show: El Viaje 2008 (con repertorio y créditos)
    INSERT INTO shows (agrupacion_id, slug, title, image, year, gallery)
    VALUES (
        ag_id, 'el-viaje', 'El Viaje',
        'https://www.agarratecatalina.com.uy/media/widgetkit/Agarrate_Catalina-El_Viaje-Frontal.jpg',
        2008,
        ARRAY[
            'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'
        ]
    ) RETURNING id INTO show_id;

    INSERT INTO show_sections (show_id, title, content, lyrics, sort_order) VALUES
    (show_id, 'Presentación', 'Introducción el novio de la nieta', NULL, 1),
    (show_id, 'Novio de la nieta', 'Novio de la nieta', NULL, 2),
    (show_id, 'Los Energizantes', 'Auto Asamblea', NULL, 3),
    (show_id, 'La Niebla', 'Recitado Retirada', NULL, 4),
    (show_id, 'Retirada: El Viaje', NULL,
    'Este es el comienzo de mi viaje,
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
semillas de la ingenua eternidad.', 5);

    INSERT INTO show_credits (show_id, role, names) VALUES
    (show_id, 'Director Responsable', ARRAY['Yamandú Cardozo']),
    (show_id, 'Textos', ARRAY['Yamandú Cardozo', 'Tabaré Cardozo', 'Carlos Tanco']),
    (show_id, 'Director escénico', ARRAY['Martín Duarte']),
    (show_id, 'Arreglos corales', ARRAY['Martín Duarte']),
    (show_id, 'Vestuario', ARRAY['Hugo Millán']),
    (show_id, 'Maquillaje', ARRAY['Paula Gómez']);

    -- Show: Tablado Amateur 2003
    INSERT INTO shows (agrupacion_id, slug, title, image, year)
    VALUES (ag_id, 'tablado-amateur', 'El Tablado Amateur', '', 2003);

    -- Show: Los Sueños 2005
    INSERT INTO shows (agrupacion_id, slug, title, image, year)
    VALUES (ag_id, 'los-suenos', 'Los Sueños', 'https://www.agarratecatalina.com.uy/media/widgetkit/los-suenos.jpg', 2005);

END $$;
