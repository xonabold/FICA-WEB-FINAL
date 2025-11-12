// =======================================================
// MAIN.JS - FICA LANDING (VERSIÓN FUNCIONAL)
// =======================================================

console.log('🚀 Cargando main.js...');

// Eliminar clase no-js
document.body.classList.remove("no-js");

// =======================================================
// 🍔 MENÚ HAMBURGUESA - SIMPLE Y FUNCIONAL
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM Cargado - Iniciando configuración');
  
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  console.log('🔍 Elementos encontrados:');
  console.log('- navToggle:', navToggle);
  console.log('- navMenu:', navMenu);
  
  if (!navToggle) {
    console.error('❌ No se encontró #navToggle');
    return;
  }
  
  if (!navMenu) {
    console.error('❌ No se encontró #navMenu');
    return;
  }
  
  // Configurar evento click
  navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('🖱️ CLICK EN HAMBURGUESA!');
    
    // Toggle del menú
    const isOpen = navMenu.classList.contains('is-open');
    
    if (isOpen) {
      // Cerrar
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      console.log('🔴 MENÚ CERRADO');
    } else {
      // Abrir
      navMenu.classList.add('is-open');
      navToggle.classList.add('is-active');
      console.log('🟢 MENÚ ABIERTO');
    }
    
    console.log('📋 Estado final:');
    console.log('- Menú clases:', navMenu.className);
    console.log('- Botón clases:', navToggle.className);
  });
  
  console.log('✅ Menú hamburguesa configurado correctamente');
});

// =======================================================
// 📜 SCROLL Y NAVEGACIÓN
// =======================================================
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// =======================================================
// 🎠 CAROUSEL (si existe)
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('#testimoniosCarousel');
  if (carousel && window.bootstrap) {
    new bootstrap.Carousel(carousel, {
      interval: 6000,
      wrap: true
    });
  }
});

console.log('✅ main.js cargado completamente');