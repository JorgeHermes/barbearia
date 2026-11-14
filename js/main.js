/* =====================================================================
   FOTO DA "NOSSA HISTÓRIA"
   Usa a foto de js/config.js (historia.foto). Sem foto, fica o bloco que
   reserva o lugar (já está no index.html).
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const figura = document.getElementById('historia-foto');
  const cfg = window.SITE_CONFIG?.historia || {};
  if (!figura || !cfg.foto) return;

  const img = document.createElement('img');
  img.src = cfg.foto;
  img.alt = cfg.fotoAlt || '';
  img.loading = 'lazy';
  img.decoding = 'async';
  figura.replaceChildren(img);
  figura.classList.add('hero-historia__foto--com-imagem');
});

/* =====================================================================
   ENTRADA SUAVE DA FAIXA DE AGENDAMENTO (mesmo padrão da seção de confiança)
   Desligada para quem prefere menos movimento.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const agenda = document.getElementById('agendamento');
  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!agenda || reduzir || !('IntersectionObserver' in window)) return;

  agenda.classList.add('agenda--animate');
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    agenda.classList.add('is-visible');
    observer.disconnect();
  }, { threshold: 0.3 });
  observer.observe(agenda);
});

/* =====================================================================
   VÍDEO HORIZONTAL: toca sozinho (sem som) e em loop. Para quem prefere
   menos movimento ele não começa sozinho: fica a capa e os controles.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video video');
  if (!video || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  video.removeAttribute('autoplay');
  video.pause();
  video.controls = true;
});
