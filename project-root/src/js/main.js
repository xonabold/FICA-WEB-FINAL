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
// 7️⃣ SISTEMA DE ANIMACIONES COMPLETO - ENTRADA Y SALIDA
// =======================================================

// Configuración de animaciones por tipo de elemento
const ANIMATION_CONFIG = {
  // Títulos y encabezados
  titles: {
    entry: 'animate__fadeInDown',
    exit: 'animate__fadeOutUp',
    delay: 100
  },
  // Subtítulos y textos introductorios
  subtitles: {
    entry: 'animate__fadeInUp', 
    exit: 'animate__fadeOutDown',
    delay: 150
  },
  // Párrafos y texto general
  paragraphs: {
    entry: 'animate__fadeInLeft',
    exit: 'animate__fadeOutLeft', 
    delay: 120 // Delay más rápido pero mantendrá escalonado
  },
  // Iconos y elementos pequeños
  icons: {
    entry: 'animate__fadeInRight',
    exit: 'animate__fadeOutLeft',
    delay: 200
  },
  // Imágenes
  images: {
    entry: 'animate__zoomIn',
    exit: 'animate__zoomOut',
    delay: 250
  },
  // Botones y CTAs
  buttons: {
    entry: 'animate__fadeInUp',
    exit: 'animate__fadeOutDown',
    delay: 300
  }
};

function initComprehensiveAnimations() {
  console.log('🎬 Inicializando sistema completo de animaciones');
  
  // Desactivar AOS para elementos que vamos a controlar manualmente
  if (typeof AOS !== 'undefined') {
    // Deshabilitar AOS temporalmente
    console.log('⏸️ Pausando AOS para control manual');
  }
  
  // Seleccionar todos los elementos animables por sección
  const animatedSections = [
    {
      container: document.getElementById('hero'),
      elements: {
        titles: ['h1', '.hero__title'],
        subtitles: ['p.hero__subtitle'],
        buttons: ['.hero__actions .btn']
      }
    },
    {
      container: document.getElementById('nosotros'), 
      elements: {
        titles: ['h2'], // Solo el título principal, no los h3 internos
        subtitles: ['.section__intro']
        // Los bloques .animate-on-image serán manejados especialmente
      },
      // Sistema especial para bloques de texto escalonados
      specialBlocks: true
    },
    {
      container: document.getElementById('viviendas'),
      elements: {
        titles: ['h2'],
        subtitles: ['.section__intro'],
        buttons: ['.btn--cta']
      }
    },
    {
      container: document.getElementById('testimonios'),
      elements: {
        titles: ['h2'],
        subtitles: ['.section__intro']
      }
    },
    {
      container: document.getElementById('prensa'),
      elements: {
        titles: ['h2'],
        subtitles: ['.section__intro'],
        buttons: ['.btn--cta']
      }
    },
    {
      container: document.getElementById('blog'),
      elements: {
        titles: ['h2'],
        subtitles: ['.section__intro']
      }
    },
    {
      container: document.getElementById('contacto'),
      elements: {
        titles: ['h2'],
        subtitles: ['.section__intro'],
        buttons: ['.btn--cta']
      },
      // Sistema especial para iconos del formulario
      specialIcons: true
    }
  ];
  
  // Función para aplicar animaciones de entrada
  function applyEntryAnimations(container, elements) {
    Object.keys(elements).forEach(type => {
      const selectors = elements[type];
      const config = ANIMATION_CONFIG[type];
      
      if (!config) return;
      
      selectors.forEach(selector => {
        const elementList = container.querySelectorAll(selector);
        elementList.forEach((element, index) => {
          setTimeout(() => {
            // Limpiar clases previas
            element.classList.remove(config.exit, 'animate__animated');
            // Aplicar animación de entrada
            element.classList.add('animate__animated', config.entry);
            console.log(`✨ ${type} -> ${config.entry} (delay: ${index * config.delay}ms)`);
          }, index * config.delay);
        });
      });
    });
  }
  
  // Función para aplicar animaciones de salida
  function applyExitAnimations(container, elements) {
    Object.keys(elements).forEach(type => {
      const selectors = elements[type];
      const config = ANIMATION_CONFIG[type];
      
      if (!config) return;
      
      selectors.forEach(selector => {
        const elementList = container.querySelectorAll(selector);
        elementList.forEach((element, index) => {
          setTimeout(() => {
            // Limpiar clases previas
            element.classList.remove(config.entry, 'animate__animated');
            // Aplicar animación de salida
            element.classList.add('animate__animated', config.exit);
            console.log(`🌊 ${type} -> ${config.exit} (simultáneo)`);
          }, 0); // Salidas simultáneas
        });
      });
    });
  }
  
    // Configurar observers para cada sección
  animatedSections.forEach(section => {
    if (!section.container) return;
    
    // Observer principal para la mayoría de elementos
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === section.container) {
          if (entry.isIntersecting) {
            console.log(`👁️ Sección ${section.container.id} ENTRA - animaciones de entrada`);
            applyEntryAnimations(section.container, section.elements);
          } else {
            console.log(`👁️ Sección ${section.container.id} SALE - animaciones de salida`);
            applyExitAnimations(section.container, section.elements);
          }
        }
      });
    }, {
      threshold: 0.7, // Mayor threshold = salida más temprana
      rootMargin: '300px 0px 300px 0px' // Mayor margen = detección más temprana
    });
    
    // Observer específico para títulos (salida más temprana)
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === section.container) {
          if (!entry.isIntersecting) {
            console.log(`⚡ Títulos de ${section.container.id} - SALIDA TEMPRANA`);
            // Solo animar salida de títulos cuando salen del viewport
            const titleElements = section.elements.titles || [];
            titleElements.forEach(selector => {
              const elements = section.container.querySelectorAll(selector);
              elements.forEach(element => {
                element.classList.remove('animate__fadeInDown', 'animate__animated');
                element.classList.add('animate__animated', 'animate__fadeOutUp');
              });
            });
          }
        }
      });
    }, {
      threshold: 0.8, // Salida cuando solo 80% está visible = MUY TEMPRANA
      rootMargin: '400px 0px 400px 0px' // Margen mucho mayor para títulos
    });

    // Observer específico para subtítulos (salida temprana)
    const subtitleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === section.container) {
          if (!entry.isIntersecting) {
            console.log(`⚡ Subtítulos de ${section.container.id} - SALIDA TEMPRANA`);
            // Solo animar salida de subtítulos cuando salen del viewport
            const subtitleElements = section.elements.subtitles || [];
            subtitleElements.forEach(selector => {
              const elements = section.container.querySelectorAll(selector);
              elements.forEach(element => {
                element.classList.remove('animate__fadeInUp', 'animate__animated');
                element.classList.add('animate__animated', 'animate__fadeOutDown');
              });
            });
          }
        }
      });
    }, {
      threshold: 0.7, // Salida cuando 70% está visible = MUY TEMPRANA
      rootMargin: '350px 0px 350px 0px' // Margen mayor para subtítulos
    });
    
    observer.observe(section.container);
    titleObserver.observe(section.container);
    subtitleObserver.observe(section.container);
    
    // Sistema especial para imagen de nosotros (mantenerla estable)
    if (section.container.id === 'nosotros') {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target === section.container) {
            const image = section.container.querySelector('.nosotros__image');
            if (entry.isIntersecting && image) {
              console.log(`🖼️ Imagen nosotros ENTRA POR IZQUIERDA - animación única`);
              // Limpiar todas las clases de animación
              image.classList.remove('animate__fadeOutLeft', 'animate__fadeInLeft', 'animate__animated');
              // Aplicar animación de entrada desde la izquierda
              setTimeout(() => {
                image.classList.add('animate__animated', 'animate__fadeInLeft');
                // Después de la animación, limpiar clases para mantenerla estable
                setTimeout(() => {
                  image.classList.remove('animate__animated', 'animate__fadeInLeft');
                  image.style.opacity = '1';
                  image.style.transform = 'translateX(0)';
                  console.log(`🖼️ Imagen nosotros FIJADA - estable`);
                }, 800); // Duración de la animación
              }, 250);
            } else if (!entry.isIntersecting && image) {
              console.log(`🖼️ Imagen nosotros SALE POR IZQUIERDA`);
              image.classList.remove('animate__fadeInLeft', 'animate__animated');
              image.classList.add('animate__animated', 'animate__fadeOutLeft');
            }
          }
        });
      }, {
        threshold: 0.7, // Salida más temprana para la imagen también
        rootMargin: '200px 0px 200px 0px' // Mayor margen para detección temprana
      });
      
      imageObserver.observe(section.container);
    }
    
    // Sistema especial para bloques de texto de nosotros
    if (section.specialBlocks && section.container.id === 'nosotros') {
      const blocksObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target === section.container) {
            if (entry.isIntersecting) {
              console.log(`🎯 Nosotros ENTRA - bloques de texto escalonados`);
              applyNosotrosBlocksEntry(section.container);
            } else {
              console.log(`🎯 Nosotros SALE - bloques de texto en orden inverso`);
              applyNosotrosBlocksExit(section.container);
            }
          }
        });
      }, {
        threshold: 0.7,
        rootMargin: '300px 0px 300px 0px'
      });
      
      blocksObserver.observe(section.container);
    }
    
    // Sistema especial para iconos del formulario
    if (section.specialIcons && section.container.id === 'contacto') {
      const specialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target === section.container) {
            if (entry.isIntersecting) {
              console.log(`🎯 Contacto ENTRA - secuencia especial de iconos`);
              applySpecialFormIconsEntry(section.container);
            } else {
              console.log(`🎯 Contacto SALE - secuencia inversa de iconos`);
              applySpecialFormIconsExit(section.container);
            }
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '100px 0px 100px 0px'
      });
      
      specialObserver.observe(section.container);
    }
    
    console.log(`✅ Observers configurados para: ${section.container.id}`);
  });  // Funciones especiales para iconos del formulario
  function applySpecialFormIconsEntry(container) {
    const icons = container.querySelectorAll('.animate-on-form');
    const subtitle = container.querySelector('.section__intro');
    
    // 1. Primero título y subtítulo (ya manejados por el sistema principal)
    
    // 2. Después iconos escalonados (después del subtítulo)
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.remove('animate__fadeOutLeft', 'animate__animated');
        icon.classList.add('animate__animated', 'animate__fadeInRight');
        console.log(`🎯 Icono ${index + 1} -> fadeInRight (después de subtítulo)`);
      }, 400 + (index * 150)); // Empezar después del subtítulo (400ms) + escalonado
    });
  }
  
  function applySpecialFormIconsExit(container) {
    const icons = container.querySelectorAll('.animate-on-form');
    const subtitle = container.querySelector('.section__intro');
    const title = container.querySelector('h2');
    
    // 1. Primero iconos en orden INVERSO (últimos primero)
    icons.forEach((icon, index) => {
      const reverseIndex = icons.length - 1 - index;
      setTimeout(() => {
        icon.classList.remove('animate__fadeInRight', 'animate__animated');
        icon.classList.add('animate__animated', 'animate__fadeOutLeft');
        console.log(`🎯 Icono ${reverseIndex + 1} -> fadeOutLeft (orden inverso)`);
      }, index * 100); // Salida rápida en orden inverso
    });
    
    // 2. Después subtítulo (cuando termine el último icono)
    setTimeout(() => {
      if (subtitle) {
        subtitle.classList.remove('animate__fadeInUp', 'animate__animated');
        subtitle.classList.add('animate__animated', 'animate__fadeOutDown');
        console.log(`🎯 Subtítulo -> fadeOutDown (después de iconos)`);
      }
    }, icons.length * 100 + 100);
    
    // 3. Finalmente título
    setTimeout(() => {
      if (title) {
        title.classList.remove('animate__fadeInDown', 'animate__animated');
        title.classList.add('animate__animated', 'animate__fadeOutUp');
        console.log(`🎯 Título -> fadeOutUp (al final)`);
      }
    }, icons.length * 100 + 200);
  }
  
  // Funciones especiales para bloques de texto de nosotros
  function applyNosotrosBlocksEntry(container) {
    const blocks = container.querySelectorAll('.animate-on-image');
    
    blocks.forEach((block, index) => {
      const h3 = block.querySelector('h3');
      const p = block.querySelector('p');
      
      // Cada bloque completo (h3 + p) entra escalonado
      setTimeout(() => {
        // Limpiar animaciones previas
        if (h3) {
          h3.classList.remove('animate__fadeOutLeft', 'animate__animated');
          h3.classList.add('animate__animated', 'animate__fadeInLeft');
        }
        if (p) {
          p.classList.remove('animate__fadeOutLeft', 'animate__animated');
          // El párrafo entra ligeramente después del h3
          setTimeout(() => {
            p.classList.add('animate__animated', 'animate__fadeInLeft');
          }, 50);
        }
        console.log(`📝 Bloque ${index + 1} (h3+p) -> fadeInLeft escalonado`);
      }, index * 120); // Escalonado igual que párrafos: 0ms, 120ms, 240ms
    });
  }
  
  function applyNosotrosBlocksExit(container) {
    const blocks = container.querySelectorAll('.animate-on-image');
    
    // Salida en orden inverso (último bloque primero)
    blocks.forEach((block, index) => {
      const h3 = block.querySelector('h3');
      const p = block.querySelector('p');
      const reverseIndex = blocks.length - 1 - index;
      
      setTimeout(() => {
        // El párrafo sale primero
        if (p) {
          p.classList.remove('animate__fadeInLeft', 'animate__animated');
          p.classList.add('animate__animated', 'animate__fadeOutLeft');
        }
        // El h3 sale ligeramente después
        setTimeout(() => {
          if (h3) {
            h3.classList.remove('animate__fadeInLeft', 'animate__animated');
            h3.classList.add('animate__animated', 'animate__fadeOutLeft');
          }
        }, 30);
        console.log(`📝 Bloque ${reverseIndex + 1} (p+h3) -> fadeOutLeft orden inverso`);
      }, index * 80); // Salida rápida en orden inverso
    });
  }
  
  console.log('✅ Sistema completo de animaciones inicializado');
}

// Inicializar cuando el DOM esté listo
function initializeAll() {
  console.log('🚀 Inicializando funcionalidades...');
  
  // Pequeño delay para asegurar que todo esté renderizado
  setTimeout(() => {
    initMobileNavigation();
    initComprehensiveAnimations(); // Nuevo sistema completo de animaciones
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}

console.log('✅ Main.js cargado correctamente');