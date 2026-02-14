src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Estilos globales
│   ├── nuestra-biblioteca/
│   │   └── page.tsx
│   ├── categorias/
│   │   ├── murgas/
│   │   │   └── page.tsx
│   │   └── [category]/
│   │       └── page.tsx
│   ├── murgas/
│   │   └── agarrate-catalina/
│   │       ├── page.tsx            # Murga individual
│   │       └── espectaculos/
│   │           ├── page.tsx        # Timeline
│   │           └── [year]/
│   │               └── page.tsx    # Espectáculo individual
│   ├── historia/
│   │   └── page.tsx
│   └── carnaval-2026/
│       └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ImageWithFallback.tsx
│   └── ui/                         # shadcn/ui components
├── lib/
│   └── utils.ts
├── fonts/
│   └── (fuentes locales si las hay)
└── public/
    └── images/                     # Imágenes estáticas