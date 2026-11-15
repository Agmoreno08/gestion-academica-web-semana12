# Gestión Académica Web — Sesión 12 (Consumo de API REST desde React)

SIS0421 Servicios Web · Grupo 2 · Angel Moreno, Andrea Cuadra

## Qué se agregó
| Archivo | Responsabilidad |
|---|---|
| `src/features/carreras/model/types.ts` | Tipo `Carrera` según el contrato real (`CarreraResponse`) |
| `src/features/carreras/api/carrerasApi.ts` | Acceso a datos: `GET /carreras` y `GET /carreras/{id}` con el `httpClient` compartido |
| `src/features/carreras/hooks/useCarreras.ts` | `useState` + `useEffect` + `AbortController` (carga, éxito, error, recarga) |
| `src/features/carreras/hooks/useCarreraDetalle.ts` | Opción A: detalle al seleccionar un registro |
| `src/features/carreras/components/*` | Tabla y panel de detalle (solo presentación) |
| `src/shared/ui/StatusViews.tsx` | Vistas de carga, error (con reintento) y vacío; mensajes distintos para red/401/403/404 |
| `src/app/AppLayout.tsx`, `src/app/router.tsx` | Navegación y ruta protegida `/carreras` |

## Requisitos
- Backend `gestion-academica` (Spring Boot 4, Java 21) corriendo en **http://localhost:9090** con PostgreSQL (`universidad`).
- Node 20+ y pnpm (`npm i -g pnpm`).

## Variables del backend (IntelliJ → Run/Debug Configurations → Environment variables)
```
JWT_SECRET=<clave Base64 de al menos 32 bytes>      # p. ej. salida de: openssl rand -base64 32
ADMIN_PASSWORD=<mínimo 8 caracteres>               # crea el usuario 'admin' al primer arranque
```

## Ejecutar el frontend
```bash
pnpm install
pnpm dev          # http://localhost:5173  (el proxy de Vite envía /api → http://localhost:9090)
```

## Corrección necesaria en el backend (documentada en el informe)
El repositorio del docente trae dos errores de configuración que provocan 403/400 en todos los
endpoints protegidos por rol. Ver `backend-fix.patch` y la sección de diagnóstico del documento.
