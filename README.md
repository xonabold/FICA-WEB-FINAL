# 🌿 FICA — vivir & compartir

**Landing narrativa y modular para FICA**, una plataforma de vivienda colaborativa con foco en conciliación, crianza compartida y comunidad.  
Desarrollada con enfoque en **HTML5, CSS3, JavaScript Vanilla** y una arquitectura **Bootstrap 5.3 híbrida**.  
El objetivo es combinar **eficiencia técnica**, **identidad visual cálida** y **experiencia de usuario emocionalmente coherente**.

---

## 🧭 Concepto general

**FICA** no es solo una marca: es una propuesta de vida en comunidad.  
La web está pensada como un **viaje emocional**, donde cada scroll invita al usuario a comprender, conectar y finalmente actuar (sumarse o contactar).

Es una **One Page con función de landing**, donde la conversión final es el **formulario de contacto**.

---

## 🏗️ Estructura general del proyecto



---

## 🧩 Secciones principales

1️⃣ **Hero**  
> Mensaje central + 2 CTAs  
CTA primario → “Sumarme a FICA” → #contacto  
CTA secundario → “Ver video manifiesto” (overlay modal)

2️⃣ **Viviendas**  
> Cards con imágenes y descripciones (Co-FICA, Urban-FICA, Terra-FICA)  
CTA → “Descubrir FICA” → #contacto

3️⃣ **Nosotros**  
> Texto + valores + propósito  
Título → “Conócenos”  
Subtítulo → “Personas, valores y el porqué de FICA.”

4️⃣ **Testimonios**  
> Carrusel con autoplay (6s)  
Sin CTA

5️⃣ **Cita editorial**  
> Pausa visual — sin CTA  
Frase inspiradora y minimalista

6️⃣ **Prensa**  
> 3 tarjetas con imagen, medio y enlace  
CTA → “Ser parte” → #contacto

7️⃣ **Blog**  
> Listado de artículos recientes  
Título → “Crónicas del habitar”

8️⃣ **Contacto**  
> Formulario + honeypot + validación JS + mensaje de éxito  
CTA → “Quiero sumarme” → #contacto

9️⃣ **Footer**  
> Cierre institucional + selector de idioma + redes  
CTA → “Únete a la comunidad FICA” → #contacto

---

## 🎨 Identidad visual

### Colores base

| Rol | Nombre | HEX | Uso |
|------|---------|------|------|
| 🟦 Principal | FICA Teal `#405E69` | Nav, Footer, Botones primarios |
| 🟧 Acento cálido | Miel `#D29A4A` | Hover, iconos, detalles |
| 🏜 Fondo neutro | Arena `#D3AD96` | Tarjetas, bloques cálidos |
| 🌫 Fondo claro | Humo `#D6DEE1` | Fondo general y respiros |

**Texto:** `#0E1113`  
**Fondo global:** `#F7F9FA`

### Tipografías

- **Titulares/Subtítulos:** [Outfit Variable](https://fonts.google.com/specimen/Outfit)
- **Texto/UI:** [Work Sans Variable](https://fonts.google.com/specimen/Work+Sans)

---

## ✨ Interacción y animación

### JS general
- Menú hamburguesa accesible (`aria-expanded`, focus-trap, cierre con ESC)
- Scroll suave entre anclas
- Botón flotante “↑” para volver al Hero
- Validación de formulario con honeypot y mensaje de éxito

### AOS (Animate On Scroll)
- Animaciones suaves: `fade-up`, `zoom-in-up`, `fade-left`  
- Respeto a `prefers-reduced-motion`  
- Stagger progresivo por sección (Hero, KPIs, Viviendas, Prensa)

---

## ♿ Accesibilidad

- HTML5 semántico (`header`, `main`, `section`, `footer`)
- Orden lógico de tabulación
- Focus visible
- ARIA roles y labels en nav, toggles y formularios
- Contraste AA en todos los estados

---

## ⚙️ Flujo de trabajo

1. Maquetado base con HTML5 semántico.  
2. Aplicación de Bootstrap para layout y grilla.  
3. Integración de tokens FICA (CSS variables).  
4. Añadir interacciones (JS vanilla).  
5. Aplicar animaciones AOS (solo nivel 1).  
6. Validar accesibilidad y performance (Lighthouse).  
7. Minificación y empaquetado para entrega.

---

## 📈 Requisitos de aceptación

- Lighthouse ≥ 90 en **Performance, Accessibility, Best Practices y SEO**  
- Navbar sticky y accesible (teclado + screen readers)  
- Hero + CTAs funcionales  
- Sin CLS perceptible  
- Formulario validado y funcional (fake submit OK)  
- Metadatos sociales (OG + favicon)  
- Código limpio, comentado y listo para producción

---

## 🧰 Tecnologías clave

- **HTML5 semántico**
- **CSS3 (custom properties, grid, flexbox)**
- **Bootstrap 5.3 (CDN o local)**
- **JavaScript Vanilla (ES Modules)**
- **AOS.js (local)**
- **Google Fonts Variables**
- **Accesibilidad AA**
- **Diseño responsive (mobile-first)**

---

## 💬 Autoría

**UX/UI + Front-end Lead:** Jona 🧠  
**IA colaborativa:** GPT-5 (Compañero de Desarrollo Web)  
**Licencia:** Proyecto FICA (uso interno y demostrativo)

---

> “Construimos comunidad compartiendo tiempo.”  
> — *FICA — vivir & compartir*

