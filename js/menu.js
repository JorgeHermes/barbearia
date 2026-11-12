/* =====================================================================
   MENU MOBILE (hambúrguer) — abre e fecha o menu no celular.
   Os itens vêm de js/config.js (menu.itens). O botão AGENDAR é um link
   comum (empresa.agendamento em js/config.js) e fica fora do menu.
   ===================================================================== */
const hamburgerBtn = document.getElementById('btn-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  if (!hamburgerBtn || !mobileMenu) return;
  hamburgerBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
}

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    // mede o conteúdo (com o menu ainda fechado) para ele abrir na altura
    // certa com qualquer quantidade de itens (menu.itens em js/config.js)
    mobileMenu.style.setProperty('--menu-altura', `${mobileMenu.scrollHeight}px`);
    const aberto = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', aberto);
    hamburgerBtn.setAttribute('aria-expanded', String(aberto));
    hamburgerBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });
}
