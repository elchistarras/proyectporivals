/**
 * nav-session.js
 * Incluir en cualquier página con header para que:
 * - Si hay sesión activa → oculta login/rival buttons y muestra la burbuja de perfil
 * - Si no hay sesión    → muestra los botones normales
 */
import { isLoggedIn, getUser } from './auth.js';

const BUBBLE_CSS = `
  .avatar-bubble {
    display: none;
    position: relative;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 2px solid #333;
    background: linear-gradient(135deg, #1a0505, #280808);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    flex-shrink: 0;
    padding: 0;
  }
  .avatar-bubble.visible { display: flex; }
  .avatar-bubble:hover { border-color: #FF2D2D; box-shadow: 0 0 0 3px rgba(255,45,45,0.15); }
  .avatar-bubble-emoji { line-height: 1; pointer-events: none; }
  .avatar-bubble-dot {
    position: absolute;
    bottom: 1px; right: 1px;
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #00E676;
    border: 2px solid #0B0B0B;
    box-shadow: 0 0 6px #00E676;
    animation: ns-blink 2s infinite;
    pointer-events: none;
  }
  @keyframes ns-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;

function injectCSS() {
  if (document.getElementById('nav-session-css')) return;
  const style = document.createElement('style');
  style.id = 'nav-session-css';
  style.textContent = BUBBLE_CSS;
  document.head.appendChild(style);
}

function getBubbleHTML(user) {
  const emoji = user?.avatar
    ? `<img src="${user.avatar}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
    : '🎮';
  return `<span class="avatar-bubble-emoji">${emoji}</span><span class="avatar-bubble-dot"></span>`;
}

export function initNavSession() {
  const loggedIn = isLoggedIn();
  const user     = getUser();

  // ── Botones que deben ocultarse al estar logueado ──
  const loginSelectors = [
    '#btn-login',
    '#btn-rival',
    // Para páginas donde los botones no tienen ID (Base1, etc.)
    '.nav-right .btn-outline',
    '.nav-right .btn-primary',
    '.nav-right .btn-prim',
  ];

  if (loggedIn) {
    loginSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.display = 'none';
      });
    });

    // ── Buscar o crear la burbuja ──
    let bubble = document.getElementById('avatar-bubble');

    if (!bubble) {
      injectCSS();
      bubble = document.createElement('button');
      bubble.id        = 'avatar-bubble';
      bubble.className = 'avatar-bubble';
      bubble.title     = 'Mi Perfil';
      bubble.innerHTML = getBubbleHTML(user);

      // Inyectar en .nav-right si existe
      const navRight = document.querySelector('.nav-right');
      if (navRight) navRight.appendChild(bubble);
    } else {
      // Actualizar avatar si cambió
      bubble.innerHTML = getBubbleHTML(user);
    }

    bubble.classList.add('visible');

    // Click → ir al home post-login con dropdown completo
    bubble.addEventListener('click', () => {
      window.location.href = 'Borbuja que se abre despues de iniciar.html';
    });
  }
}

// Ejecutar automáticamente cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavSession);
} else {
  initNavSession();
}
