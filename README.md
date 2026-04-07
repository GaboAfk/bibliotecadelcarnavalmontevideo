# Biblioteca del Carnaval Montevideo

Proyecto de la Biblioteca del Carnaval de Montevideo construido con Next.js 16, React 19 y Tailwind CSS 4, utilizando Supabase como backend.

## Instalación y Configuración

### 1. Instalar Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Instalar Supabase con Homebrew

```bash
brew install supabase/tap/supabase
```

### 3. Configurar Variables de Entorno

Copiar el archivo de ejemplo:
```bash
cp .env.example .env.local
```

Las variables locales ya están configuradas para usar Supabase local:
- API: http://127.0.0.1:54321
- Studio: http://127.0.0.1:54323 (panel de administración)
- DB: postgresql://postgres:postgres@127.0.0.1:54322/postgres

### 4. Desplegar con run dev:full

```bash
npm run dev:full
```

Este comando iniciará Supabase local (usando la instalación de Homebrew) y luego el servidor de desarrollo de Next.js.

