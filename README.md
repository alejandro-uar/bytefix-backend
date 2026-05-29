# ByteFix API

API REST para el sistema de gestión de turnos de ByteFix, un servicio técnico de reparación y ensamblaje de PC.

## Stack

- **Runtime:** Node.js
- **Lenguaje:** TypeScript
- **Framework:** Express 4
- **ORM:** TypeORM 0.3
- **Base de datos:** PostgreSQL
- **Driver:** pg

## Requisitos

- Node.js >= 18
- PostgreSQL

## Variables de entorno

Copiar `.env.example` como `.env` y configurar:

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `DB_HOST` | Host de PostgreSQL | — |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USERNAME` | Usuario de BD | — |
| `DB_PASSWORD` | Contraseña de BD | — |
| `DB_DATABASE` | Nombre de la BD | — |
| `DB_SYNC` | Sincronizar esquema automáticamente | `true` |
| `DB_LOGGING` | Logging de consultas | `false` |
| `DB_DROP` | Eliminar esquema al iniciar | `true` |
| `DB_ENTITIES` | Patrón de archivos de entidades | `src/entities/**/*.ts` |

> ⚠️ `DB_DROP=true` borra todas las tablas cada vez que se inicia el servidor. Solo usar en desarrollo.

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Desarrollo (con nodemon + ts-node)
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/users` | Listar todos los usuarios |
| `GET` | `/users/:id` | Obtener usuario por ID (incluye turnos) |
| `POST` | `/users/register` | Registrar un nuevo usuario |
| `POST` | `/users/login` | Iniciar sesión |
| `GET` | `/appointments` | Listar todos los turnos |
| `GET` | `/appointments/:id` | Obtener turno por ID |
| `POST` | `/appointments/schedule` | Crear un nuevo turno |
| `PUT` | `/appointments/cancel/:id` | Cancelar un turno |

## Estructura

```
src/
├── index.ts              # Punto de entrada (inicia DB + servidor)
├── server.ts             # Configuración de Express
├── config/               # DataSource y variables de entorno
├── controllers/          # Handlers de rutas
├── dtos/                 # Data Transfer Objects
├── entities/             # Modelos TypeORM (User, Appointment, Credential)
├── interfaces/           # Interfaces TypeScript
├── repositories/         # Repositorios TypeORM
├── routers/              # Definición de rutas Express
├── services/             # Lógica de negocio
└── utils/                # Utilidades (errores, async handler)
```
