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
   VÍDEO HORIZONTAL: toca sozinho (sem som), em loop e sem barra de
   controles. Pausa fora da tela, para não gastar bateria nem dados.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video video');
  if (!video) return;
  video.muted = true;
  video.controls = false;
  video.disablePictureInPicture = true;
  const tocar = () => video.play().catch(() => {});
  tocar();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? tocar() : video.pause()), { threshold: 0.25 }).observe(video);
  }
});
