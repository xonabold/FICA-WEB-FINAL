// =======================================================
// MAIN.JS LIMPIO - FICA LANDING
// =======================================================

// Marca inicial (quita la clase no-js para estilos progresivos)
document.body.classList.remove("no-js");

// ===== VARIABLES GLOBALES =====
const header = document.querySelector(".header");
const backToTop = document.querySelector(".back-to-top");
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector("#navMenu");
const navBackdrop = document.querySelector("[data-backdrop]");
const modal = document.querySelector("[data-modal]");
const videoEl = modal?.querySelector("video");
const openVideoBtn = document.querySelector("[data-open-video]");
const openVideoFullscreenBtn = document.querySelector("[data-open-video-fullscreen]");
const closeVideoBtn = document.querySelector("[data-close-video]");
let lastFocused = null;

// =======================================================
// 1️⃣ MENÚ HAMBURGUESA - NAVEGACIÓN MÓVIL
// =======================================================
function initMobileNavigation() {
  // Esperar un poco más para asegurar que todo esté listo
  setTimeout(() => {
    console.log('🔍 Iniciando búsqueda de elementos...');
    
    const navToggle = document.querySelector('#navToggle');
    const navMenu = document.querySelector('#navMenu');
    
    console.log('navToggle:', navToggle);
    console.log('navMenu:', navMenu);
    
    if (!navToggle) {
      console.error('❌ Botón hamburguesa no encontrado');
      console.log('Elementos con clase nav__toggle:', document.querySelectorAll('.nav__toggle'));
      return;
    }
    
    if (!navMenu) {
      console.error('❌ Menú de navegación no encontrado');
      console.log('Elementos con clase nav__menu:', document.querySelectorAll('.nav__menu'));
      return;
    }
    
    console.log('✅ Elementos encontrados, configurando eventos...');
    
    // Evento click con manejo robusto
    navToggle.onclick = function(e) {
      console.log('🖱️ CLICK DETECTADO EN HAMBURGUESA');
      e.preventDefault();
      e.stopPropagation();
      
      const isCurrentlyOpen = navMenu.classList.contains('is-open');
      console.log('¿Menú abierto actualmente?', isCurrentlyOpen);
      
      if (isCurrentlyOpen) {
        // Cerrar menú
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        console.log('🔴 MENÚ CERRADO');
      } else {
        // Abrir menú
        navMenu.classList.add('is-open');
        navToggle.classList.add('is-active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        console.log('🟢 MENÚ ABIERTO');
      }
      
      console.log('Clases finales del menú:', navMenu.className);
      console.log('Clases finales del botón:', navToggle.className);
    };
    
    // Cerrar menú al hacer click en enlaces
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        console.log('🍔 Menú cerrado por navegación');
      });
    });
    
    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        console.log('🍔 Menú cerrado con Escape');
      }
    });
    
    console.log('✅ Eventos configurados correctamente');
  }, 500); // delay de 500ms
}

// =======================================================
// 2️⃣ NAV STICKY + SCROLL SHADOW + BACK TO TOP
// =======================================================
function handleScroll() {
  const scrolled = window.scrollY > 8;
  if (header) {
    header.classList.toggle("header--scrolled", scrolled);
  }
  if (backToTop) {
    backToTop.hidden = window.scrollY < 300;
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// =======================================================
// 2️⃣ MENÚ MÓVIL ACCESIBLE MEJORADO
// =======================================================
function closeMenu() {
  if (!navMenu || !navToggle) return;
  
  navMenu.classList.remove("is-open");
  if (navBackdrop) navBackdrop.hidden = true;
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("lock-scroll");
  
  console.log("📱 Menú cerrado");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    
    if (expanded) {
      closeMenu();
    } else {
      navMenu.classList.add("is-open");
      if (navBackdrop) navBackdrop.hidden = false;
      navToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("lock-scroll");
      
      console.log("📱 Menú abierto");
    }
  });

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      closeMenu();
    }
  });
}

// Cerrar menú con Escape y manejar resize
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (navMenu && navMenu.classList.contains("is-open")) closeMenu();
    if (modal && !modal.hidden) closeModal();
    
    // Cerrar menús de idioma
    document.querySelectorAll('.lang__btn[aria-expanded="true"]').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      const menu = btn.parentElement.querySelector('.lang__menu');
      if (menu) menu.hidden = true;
    });
  }
});

// Cerrar menú móvil al cambiar a desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});

// =======================================================
// 3️⃣ MODAL VIDEO
// =======================================================
function closeModal() {
  if (!modal) return;
  
  modal.hidden = true;
  if (videoEl) {
    videoEl.pause();
    videoEl.currentTime = 0;
  }
  
  if (lastFocused) {
    lastFocused.focus();
    lastFocused = null;
  }
  
  document.body.classList.remove("lock-scroll");
}

if (openVideoBtn && modal) {
  openVideoBtn.addEventListener("click", () => {
    lastFocused = openVideoBtn;
    modal.hidden = false;
    document.body.classList.add("lock-scroll");
  });
}

if (openVideoFullscreenBtn && modal) {
  openVideoFullscreenBtn.addEventListener("click", () => {
    lastFocused = openVideoFullscreenBtn;
    modal.hidden = false;
    document.body.classList.add("lock-scroll");
  });
}

if (closeVideoBtn) {
  closeVideoBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// =======================================================
// 4️⃣ BACK TO TOP
// =======================================================
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================================================
// 5️⃣ SELECTOR DE IDIOMA - MÚLTIPLES CON OCULTACIÓN
// =======================================================
const languages = {
  es: 'Español',
  ca: 'Català',
  eu: 'Euskera', 
  gl: 'Galego',
  en: 'English'
};

function updateLanguageMenus(selectedLang) {
  document.querySelectorAll('[data-lang-selector]').forEach(selector => {
    const btn = selector.querySelector('.lang__btn');
    const menu = selector.querySelector('.lang__menu');
    const langText = btn.querySelector('[data-lang-text]');
    
    // Actualizar texto del botón
    if (langText) {
      langText.textContent = selectedLang.toUpperCase();
    }
    
    // Actualizar atributo data-lang-current
    btn.setAttribute('data-lang-current', selectedLang);
    
    // Mostrar/ocultar opciones del menú
    menu.querySelectorAll('li').forEach(li => {
      const button = li.querySelector('button');
      const langCode = button.getAttribute('data-lang');
      li.hidden = langCode === selectedLang;
    });
  });
}

function initLanguageSelector(langBtn, langMenu) {
  if (!langBtn || !langMenu) {
    console.warn("❌ Selector de idioma no encontrado:", { btn: langBtn, menu: langMenu });
    return;
  }
  
  console.log("✅ Inicializando selector:", langBtn.id, langMenu.id);
  
  langBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🖱️ Click en botón de idioma:", langBtn.id);
    
    const expanded = langBtn.getAttribute("aria-expanded") === "true";
    langBtn.setAttribute("aria-expanded", String(!expanded));
    langMenu.hidden = expanded;
    
    console.log("📋 Estado del menú:", { expanded: !expanded, hidden: langMenu.hidden });
  });

  langMenu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute('data-lang');
      updateLanguageMenus(selectedLang);
      
      langBtn.setAttribute("aria-expanded", "false");
      langMenu.hidden = true;
    });
  });

  document.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langBtn.setAttribute("aria-expanded", "false");
      langMenu.hidden = true;
    }
  });
}

// Inicializar todos los selectores de idioma
document.querySelectorAll("[data-lang-selector]").forEach(langContainer => {
  const btn = langContainer.querySelector(".lang__btn");
  const menu = langContainer.querySelector(".lang__menu");
  console.log("🌐 Inicializando selector de idioma:", btn?.id, menu?.id);
  initLanguageSelector(btn, menu);
});

// Inicializar estado por defecto (español seleccionado)
updateLanguageMenus('es');

// =======================================================
// 6️⃣ TARJETAS CON BACKGROUND IMAGES
// =======================================================
function setCardBackgroundImages() {
  console.log('🖼️ Configurando imágenes de fondo para tarjetas');
  
  // Tarjetas de prensa
  const prensaCards = document.querySelectorAll('#prensa .card');
  prensaCards.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img && img.src) {
      card.style.backgroundImage = `url("${img.src}")`;
      console.log(`📰 Prensa card ${index + 1}: ${img.src}`);
    }
  });

  // Tarjetas de blog
  const blogCards = document.querySelectorAll('#blog .card');
  blogCards.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img && img.src) {
      card.style.backgroundImage = `url("${img.src}")`;
      console.log(`📝 Blog card ${index + 1}: ${img.src}`);
    }
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setCardBackgroundImages);
} else {
  setCardBackgroundImages();
}

// =======================================================
// 7️⃣ ANIMACIONES ICONOS FORMULARIO - IGUAL QUE NOSOTROS
// =======================================================
function initFormIconAnimations() {
  console.log('🎬 Inicializando animaciones de iconos del formulario');
  
  const formContainer = document.getElementById('form-details-container');
  const formIcons = document.querySelectorAll('.animate-on-form');
  
  if (!formContainer || formIcons.length === 0) {
    console.warn('❌ No se encontraron elementos del formulario para animar');
    return;
  }
  
  console.log(`🔗 Encontrados ${formIcons.length} iconos para animar`);
  
  // Función para activar animación de entrada (escalonada)
  function activateFormEntryAnimations() {
    console.log('🎬 Activando animaciones de entrada de iconos (muy lentas y escalonadas)');
    
    formIcons.forEach((icon, index) => {
      // Limpiar clases previas
      icon.classList.remove('animate__fadeOutLeft', 'animate__animated');
      
      // Aplicar animación de entrada con delay MUY escalonado
      setTimeout(() => {
        icon.classList.add('animate__animated', 'animate__fadeInRight');
        console.log(`✨ Icono ${index + 1} (${icon.src.split('/').pop()}) -> fadeInRight (delay: ${index * 800}ms)`);
      }, index * 800); // Escalonado MUY lento: 0ms, 800ms, 1600ms, 2400ms
    });
  }
  
  // Función para activar animación de salida (simultánea)
  function activateFormExitAnimations() {
    console.log('🎬 Activando animaciones de salida de iconos (simultáneas)');
    
    formIcons.forEach((icon, index) => {
      // Limpiar clases de entrada
      icon.classList.remove('animate__fadeInRight');
      
      // Aplicar animación de salida SIN delay (todos juntos)
      icon.classList.add('animate__animated', 'animate__fadeOutLeft');
      console.log(`🌊 Icono ${index + 1} (${icon.src.split('/').pop()}) -> fadeOutLeft (inverso de entrada)`);
    });
  }
  
  // Usar IntersectionObserver como en la sección nosotros
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === formContainer) {
        if (entry.isIntersecting) {
          console.log('👁️ Formulario visible - activando animaciones de iconos');
          activateFormEntryAnimations();
        } else {
          console.log('👁️ Formulario no visible - activando animaciones de salida');
          activateFormExitAnimations();
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px'
  });
  
  observer.observe(formContainer);
  
  console.log('✅ Sistema de animaciones "Iconos Formulario" inicializado');
}

// Inicializar cuando el DOM esté listo
function initializeAll() {
  console.log('🚀 Inicializando funcionalidades...');
  
  // Pequeño delay para asegurar que todo esté renderizado
  setTimeout(() => {
    initMobileNavigation();
    initFormIconAnimations();
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}

console.log('✅ Main.js cargado correctamente');