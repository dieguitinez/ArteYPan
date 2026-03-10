# Documentación de Contexto: Proyecto Arte & Pan

## Resumen del Proyecto

Arte & Pan es una panadería artesanal ubicada en La Línea de la Concepción, liderada por Cristian Arango y Jessica Asencio. El sitio web sirve como una plataforma de "escaparate premium" para sus productos de masa madre y bollería fina, además de funcionar como un portal de captación B2B, un sistema de recepción de pedidos por encargo (Pick-up) y un panel privado de administración y contabilidad para los dueños.

## Tecnologías Clave (Tech Stack)

- **Frontend / Framework:** React.js (construido y empaquetado con Vite).
- **Estilos:** Tailwind CSS (con una configuración altamente personalizada de colores y tipografía).
- **Iconografía:** Lucide React.
- **Base de Datos / Backend:** Firebase Firestore (para almacenamiento de transacciones en la colección `orders`).
- **Notificaciones de Pedidos:** EmailJS (configurado para alertar al administrador `arteypanaderia@hotmail.com`).
- **Manejo de Estado Global:** React Context API (`OrderContext`, `CartContext`).

## Arquitectura y Componentes Principales

- **`src/App.jsx`**: Es la estructura vertebral (Single Page Application). Contiene el enrutador condicional, los Layouts principales y las secciones clave de la página de aterrizaje (Hero, Filosofía, Menú/El Horno, Sección B2B, Reconocimientos, Contacto y el Footer interactivo).
- **`src/components/AdminPanel.jsx`**: El Dashboard de gerencia. Reemplaza los datos simulados obteniendo la colección de Firebase en tiempo real para generar KPIs financieros (Ingresos Acumulados, Volumen de Pedidos, Ticket Medio) y exportar reportes.
- **`src/components/OrderForm.jsx`**: Formulario final de compra. Adaptado estrictamente para "Recogida en tienda" (Pick-up only). Implanta lógica JavaScript para forzar un margen de preparación mínimo de 2 horas.
- **`src/components/CartDrawer.jsx`**: Elemento deslizable (drawer) lateral donde los clientes modulan las cantidades de sus cestas antes de pasar al cierre del pedido.
- **`src/components/CookieBanner.jsx`**: Componente RGPD. Ofrece granularidad real en la gestión de permisos (Necesarias, Analíticas, Publicitarias), guardando el perfil exacto en el `localStorage` del visitante.

## Reglas de Construcción, Diseño y UI/UX (¡Importante para Agentes!)

- **Paleta de Colores Exclusiva:**
  - Usa `crust` y `crust-dark` (tonalidades marrón oscuro casi negro) para dotar de profundidad a textos principales y fondos de secciones premium.
  - Usa `flour` (crema/blanco texturizado) para dar calidez a las fuentes y los fondos claros.
  - Usa `olive` y `olive-light` para acentos, iconos destacados y botones primarios.
- **Tipografía:** Fuerte énfasis en tipografías Serif (`font-serif`) para titulares (evocando artesanía y clasicismo), en contraste directo con variables sans-serif (`font-light` para lectura, o `font-black uppercase tracking-widest` para microtexto de botones).
- **Recursos Gráficos:** No utilices Emojis de sistema para iconografía UI; emplea siempre componentes SVG importados de `lucide-react`. Aprovecha utilidades de Tailwind como `backdrop-blur`, gradientes (`bg-gradient-to-t`) y efectos hover (`group-hover:scale-105`) para mantener la sensación "Premium".

## Historial de Implementaciones Recientes Clave (Puntos de Inflexión - Marzo 2026)

1. **Seguridad del Dashboard (`/#admin`)**: Acceso ruteado con el usuario "Gerencia" (que ha sido programado `case-insensitive`) y conexión a Firebase Firestore.
2. **Ingeniería del OrderForm**: Se removió la solicitud de "Dirección de Entrega" al no contar con red de repartidores. Se implementó un `<input type="datetime-local">` bloqueado por JavaScript a un tiempo de recogida de `now() + 2 Horas` como mínimo vital de horneado.
3. **Copywriting Evolucionado**: Desligamiento verbal de las "Franquicias". Enfoque comunicativo hacia los beneficios genéticos de la masa madre (24 horas) y la adición fluida de la línea de captación corporativa (B2B) enganchada directamente a WhatsApp Web.
4. **Pie de Página (Footer)**: Centralización de horarios operativos reales estructurados vía listas, integrando un link de credencial corporativa estilizado hacia la agencia Nivo Partners.

## Variables de Entorno (Cuidado Operacional)

- Las claves de Firebase y APIs en este proyecto deben inyectarse usando el prefijo modificado `artypan_` (ej. `artypan_FIREBASE_API_KEY`). **NO se usa** el clásico `VITE_` para Firebase con el objetivo de evitar interferencias en el entorno.
- Variables de EmailJS conservan el formato `VITE_EMAILJS_*`.
- Las variables operan y deben ser instanciadas correctamente al desplegar en contenedores como Vercel o Netlify.

---
_Este documento fue generado algorítmicamente para brindar "Contexto Cero" a futuros LLMs y Agentes de Ingeniería que mantengan y expandan el repositorio de Arte & Pan._
