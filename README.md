# Visita de la Reliquia de San Francisco de Asís — Gamarra, Cesar

Sitio web en Next.js para la visita del 2 al 4 de noviembre de 2026. Incluye portada pública, programación, noticias, galería y panel administrativo con Supabase Auth.

## Requisitos
- Node.js 20.9 o posterior
- Cuenta en GitHub, Vercel y Supabase

## 1. Crear la base de datos
1. Crea un proyecto en https://supabase.com.
2. Abre **SQL Editor → New query**.
3. Copia y ejecuta `supabase/schema.sql`.
4. En **Project Settings → API** (o Connect), copia la URL del proyecto y la clave publicable/anon.
5. En **Authentication → Providers → Email**, deja habilitado el proveedor Email. Desactiva el registro público si aparece habilitado.
6. En **Authentication → Users**, crea manualmente el usuario que administrará la web.
7. Abre el usuario creado y edita sus **App Metadata** para agregar: `{ "role": "admin" }`. Debe ser `app_metadata`, no `user_metadata`, porque el rol no debe poder editarlo el propio usuario.

Las políticas de Row Level Security solo permiten escritura a usuarios cuyo `app_metadata.role` sea `admin`. La API del panel también comprueba este rol.

## 2. Ejecutar en tu computador
1. Instala Node.js LTS desde https://nodejs.org.
2. Descomprime el proyecto y abre una terminal dentro de la carpeta.
3. Ejecuta `npm install`.
4. Copia `.env.example` a un archivo llamado `.env.local`.
5. Completa las variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICABLE_O_ANON
```

6. Ejecuta `npm run dev` y abre http://localhost:3000.
7. Entra a http://localhost:3000/admin/login e inicia sesión con el usuario creado en Supabase.

**Nunca agregues una clave `service_role` o una clave secreta de Supabase a variables `NEXT_PUBLIC_*`, al repositorio o al navegador.** Esta aplicación usa la clave publicable/anon junto con RLS.

## 3. Publicar en GitHub
1. Crea un repositorio nuevo en https://github.com (puede ser privado).
2. Sube todos los archivos de esta carpeta. No subas `.env.local`.
3. Si usas Git en la terminal, ejecuta:

```bash
git init
git add .
git commit -m "Primera versión de la web de la reliquia"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## 4. Publicar en Vercel
1. Entra a https://vercel.com y elige **Add New → Project**.
2. Importa el repositorio de GitHub.
3. Vercel detectará Next.js automáticamente.
4. En **Environment Variables**, agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con los mismos valores de `.env.local`.
5. Pulsa **Deploy**.
6. Cuando termine, abre la URL `.vercel.app` asignada.
7. En Supabase → Authentication → URL Configuration, configura **Site URL** con esa URL y agrega las URLs de producción y desarrollo que vayas a usar a **Redirect URLs** (por ejemplo, `https://TU-SITIO.vercel.app/**` y `http://localhost:3000/**`).
8. Tras cambiar variables en Vercel, vuelve a desplegar para aplicarlas.

## 5. Publicar contenido
- Abre `/admin/login` en tu dominio.
- Entra con el usuario con rol `admin`.
- En **Programación**, agrega el título, fecha y hora local de Colombia, lugar y descripción.
- En **Noticias**, agrega título, resumen, texto e URL pública de imagen.
- En **Galería**, agrega título, URL pública de imagen y pie de foto.
- Marca **Publicar inmediatamente** para que se muestre en la página pública. Si no está marcado, queda como borrador.
- La fecha/hora se guarda con zona horaria del navegador. Al introducirla, selecciona la hora local de Colombia.

## 6. Imágenes
Las imágenes de noticias y galería deben tener una URL HTTPS pública y estable. Para la portada se usa una fotografía de fondo de Unsplash como imagen temporal; puedes reemplazar la URL en `app/globals.css` por una imagen autorizada de San Francisco o de la reliquia. Verifica derechos de uso y evita presentar una imagen ilustrativa como fotografía real de la reliquia.

## Estructura
```text
app/
  admin/login/page.tsx     Inicio de sesión
  admin/page.tsx           Protección y carga del panel
  api/admin/{events,news,gallery}/route.ts  API protegida
  globals.css              Diseño adaptable
  layout.tsx               Metadatos globales
  page.tsx                 Página pública
components/admin-dashboard.tsx
lib/data.ts                Consultas públicas
lib/supabase/server.ts     Cliente de servidor y cookies
lib/supabase/browser.ts    Cliente del navegador
supabase/schema.sql        Tablas, índices y políticas RLS
.env.example
```

## Seguridad y mantenimiento
- No existe formulario de inscripción, conforme a lo solicitado.
- No habilites registro público de usuarios; crea cuentas administrativas manualmente.
- Asigna `app_metadata.role = admin` solo a personas autorizadas.
- Las imágenes se guardan como URL, no se cargan directamente al almacenamiento de Supabase en esta versión.
- Haz pruebas con un elemento borrador y otro publicado antes de anunciar el enlace.
- La programación se muestra vacía hasta que la parroquia incorpore y publique los horarios oficiales. No se inventaron horarios ni lugares.


## Imágenes de San Francisco e invitación
La portada y la sección de invitación usan representaciones artísticas de San Francisco de Asís alojadas en Wikimedia Commons. No deben presentarse como fotografías de la reliquia real. Las obras indicadas son reproducciones de obras de dominio público; revisa las páginas de cada archivo para los detalles de atribución y condiciones aplicables en tu jurisdicción:
- [Saint Francis of Assisi by Jusepe de Ribera](https://commons.wikimedia.org/wiki/File:Saint_Francis_of_Assisi_by_Jusepe_de_Ribera.jpg)
- [Francis of Assisi - Cimabue](https://commons.wikimedia.org/wiki/File:Francis_of_Assisi_-_Cimabue.jpg)

El texto de invitación identifica a la Parroquia Inmaculada Concepción de Gamarra, Cesar, y a la Comunidad Franciscana, Provincia de la Santa Fe, como entidades invitantes. El pie de página conserva el crédito “Creada por Gamarra TV”.

## 8. Icono de pestaña y posicionamiento en Google

El proyecto incluye metadatos SEO en `app/layout.tsx`, además de las rutas automáticas `/robots.txt` y `/sitemap.xml`. El emblema oficial se utiliza como icono de pestaña y como imagen para compartir enlaces. Google puede tardar días o semanas en rastrear e indexar el sitio; estos ajustes no garantizan una posición concreta.

1. En Vercel, abre **Settings → Environment Variables** y agrega `NEXT_PUBLIC_SITE_URL` con la URL pública exacta del sitio, incluyendo `https://` y sin una barra final. Por ejemplo: `https://tu-dominio.vercel.app`. Si tienes un dominio propio, utiliza ese dominio.
2. Guarda el cambio y haz un nuevo despliegue (**Redeploy**).
3. Abre `https://TU-DOMINIO/robots.txt` y `https://TU-DOMINIO/sitemap.xml` para comprobar que las rutas estén disponibles.
4. Entra en [Google Search Console](https://search.google.com/search-console/), añade el dominio o prefijo de URL y completa la verificación de propiedad.
5. En Search Console, abre **Sitemaps**, escribe `sitemap.xml` y pulsa **Enviar**.
6. En **Inspección de URLs**, introduce la dirección de la página principal y pulsa **Solicitar indexación**.
7. Asegúrate de que el sitio sea público y que no tenga una contraseña de acceso. Para que Google pueda mostrar el icono, el emblema debe ser accesible públicamente por HTTPS.

Importante: el dominio de ejemplo configurado como respaldo debe reemplazarse por la URL real del proyecto. El valor de `NEXT_PUBLIC_SITE_URL` evita que los enlaces canónicos y el sitemap señalen a un dominio equivocado.


## Historia y programación en páginas independientes

Se añadieron estas rutas:
- `/historia-san-francisco`: historia, conversión, fraternidad franciscana, amor por la creación y legado del santo.
- `/programacion`: agenda de la visita por día, del 2 al 4 de noviembre de 2026.

La página principal incluye enlaces a ambas subpáginas y el sitemap las anuncia a los buscadores. Antes de publicar, la parroquia debe confirmar los horarios con el afiche oficial; las confesiones aparecen sin hora especificada en el contenido recibido.

## Actualización de identidad y contenido (octubre de 2026)
- Se actualizó el mensaje principal a «San Francisco de Asís, semilla de Vida Eterna».
- Se incorporó el texto de presentación de la peregrinación y se aclaró que invitan la Parroquia Inmaculada Concepción de Gamarra, Cesar, y la Comunidad Franciscana, Provincia de la Santa Fe.
- Se añadieron los afiches oficiales de referencia en `public/images/afiche-peregrinacion-san-francisco.png` y `public/images/fechas-peregrinacion.png` para su uso en la página o galería.
- Se actualizaron los metadatos generales del sitio.
