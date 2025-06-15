# ChambaFacil - Backend

ChambaFacil es una plataforma tipo LinkedIn para trabajos informales. Conecta a personas que ofrecen servicios como plomería, jardinería, electricidad, entre otros, con clientes potenciales que necesitan contratar dichos servicios.

Este repositorio contiene el backend de la aplicación, desarrollado en **Node.js** con **TypeScript**, usando el patrón de diseño **Clean Architecture**. La aplicación se conecta a una base de datos **MariaDB** y utiliza **Prisma ORM** para la manipulación de datos.

---

## Tecnologías utilizadas

- **Node.js** + **TypeScript**
- **Express** como framework web
- **Prisma ORM**
- **MariaDB**
- **JWT** para autenticación
- **bcrypt** para cifrado de contraseñas
- **ESLint** y **Prettier** para calidad de código
- **Clean Architecture** como modelo de organización

---

## Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/chambafacil-back.git
cd chambafacil-back
```

2. **Instala dependencias**

```bash
npm install
```

3. **Configura variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="tu_url"
JWT_SECRET="una_clave_secreta_segura_base64"
```

> Asegúrate de que tu `JWT_SECRET` tenga al menos 256 bits de entropía (32 caracteres aleatorios si está en base64).

4. **Ejecuta Prisma**

```bash
npx prisma generate
npx prisma migrate dev --name init  # Crea la migración inicial

# Para siguientes migraciones, usa:
npx prisma migrate dev --name nombre_de_migracion

```

5. **Inicia el servidor en desarrollo**

```bash
npm run dev
```

---

## Scripts útiles

```bash
npm run dev       # Inicia servidor en modo desarrollo
npm run build     # Compila TypeScript a JavaScript
npm run lint      # Linter con ESLint
npm run format    # Formateo con Prettier
```

---

## Seguridad

- Contraseñas hasheadas con **bcrypt**
- Autenticación por **JWT HS256**
- Claves y tokens almacenados como variables de entorno (en `.env`)
- Protección de rutas privadas con middlewares

---

## Base de datos

El sistema se conecta a una base de datos **MariaDB**
El ORM **Prisma** gestiona el acceso y migraciones a través del archivo `prisma/schema.prisma`.

---
