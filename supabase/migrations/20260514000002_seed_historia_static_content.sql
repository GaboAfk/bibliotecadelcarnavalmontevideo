-- Seed historia page content into static_content table
INSERT INTO static_content (id, title, body, image)
VALUES (
    'historia',
    'Historia del Carnaval',
    'El carnaval uruguayo tiene sus raíces en las tradiciones europeas traídas por los inmigrantes, fusionadas con las expresiones culturales africanas y criollas.

A principios del siglo XX, comenzaron a surgir los primeros conjuntos organizados, dando forma a los géneros que hoy conocemos: murgas, parodistas, humoristas, revistas y sociedades de negros y lubolos.

El carnaval montevideano se consolidó como el más largo del mundo, extendiéndose por más de 40 días y convirtiéndose en un fenómeno cultural único que expresa la identidad y el sentir del pueblo uruguayo.',
    NULL
)
ON CONFLICT (id) DO NOTHING;
