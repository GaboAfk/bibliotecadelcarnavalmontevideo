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

## Despliegue en Supabase Remoto

### 1. Configurar Credenciales del Proyecto Remoto

Actualizar `.env.local` con las credenciales de tu proyecto Supabase remoto:

```env
# Supabase Cloud (descomentar para producción)
NEXT_PUBLIC_SUPABASE_URL=https://vsaiechaxvspkftenlnp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Autenticarse y Conectar al Proyecto Remoto

```bash
# Iniciar sesión en Supabase CLI
supabase login

# Conectar el proyecto local con el remoto
supabase link --project-ref [tu-project-url]
```

### 3. Configurar Contraseña de Base de Datos

Agregar la contraseña de la base de datos a tu `.env.local`:

```env
# Supabase Cloud (descomentar para producción)
NEXT_PUBLIC_SUPABASE_URL=https://vsaiechaxvspkftenlnp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_PASSWORD=bibliotecadeRomi
```

### 4. Configurar Seeds para Remote

Asegurarse que el archivo `supabase/config.toml` tenga habilitado los seeds:

```toml
[db.seed]
enabled = true
sql_paths = ["./seed.sql"]
```

### 5. Sincronizar Base de Datos Remota

**Opción A: Reset Completo (Recomendado para primera vez)**

```bash
# Resetear y aplicar migraciones + seeds en remote
npm run db:reset
```

**Opción B: Solo Migraciones (Si solo cambió el esquema)**

```bash
# Aplicar solo migraciones al remote
npm run db:push
```

### 6. Verificar Conexión

```bash
# Verificar datos en la base de datos remota
npm run db:status
```

## Diferencias Importantes

### `db push` vs `db reset`

- **`db push --linked`**: Solo aplica migraciones (esquema), NO ejecuta seeds
- **`db reset --linked`**: Aplica migraciones + seeds (datos completos)

### Local vs Remote

- **Local**: `supabase start` ejecuta migraciones + seeds automáticamente
- **Remote**: `supabase db reset --linked` ejecuta migraciones + seeds manualmente

## Flujo de Trabajo Recomendado

### Desarrollo Local:
```bash
npm run dev:full  # Inicia Supabase local + Next.js
```

### Producción/Remote:
```bash
# 1. Hacer cambios en migraciones o seeds
# 2. Sincronizar con remote
npm run db:reset
```

## Troubleshooting

### Error: "duplicate key value violates unique constraint"
- Solución: Usar `ON CONFLICT DO NOTHING` en migraciones que crean buckets

### Error: "permission denied to alter role"
- Solución: Configurar `SUPABASE_DB_PASSWORD` correctamente

### Los seeds no se ejecutan en remote
- Solución: Habilitar `[db.seed]` en `config.toml` y usar `db reset --linked`

## Variables de Entorno Requeridas

Para producción, asegúrate de tener estas variables en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
SUPABASE_DB_PASSWORD=tu-db-password  # Para CLI commands
```

## Scripts Disponibles

```bash
npm run db:push     # Aplicar migraciones al remote
npm run db:reset    # Reset completo con seeds al remote  
npm run db:status   # Verificar estado de la base de datos remota
npm run dev:full    # Iniciar Supabase local + Next.js
```

