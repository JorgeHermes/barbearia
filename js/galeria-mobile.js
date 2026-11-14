/* =====================================================================
   GALERIA DO CELULAR (até 900px)
   No computador as fotos e vídeos ficam nos dois carrosséis verticais.
   No celular eles viram um carrossel em leque (mesmo estilo do site da
   DEVall): o cartão do centro na frente, os vizinhos atrás dos dois
   lados. Troca arrastando o dedo, tocando num vizinho ou nos pontinhos,
   gira sozinho e não tem fim. O vídeo só toca quando está no centro.

   Não precisa editar este arquivo: os cartões vêm dos carrosséis
   verticais do index.html (esquerdo primeiro, depois o direito).
   Tempo de cada foto: js/config.js (carrosseis.vertical.intervalo).
   Um vídeo fica no centro até terminar.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const vitrine = document.querySelector('.main-showcase');
  const origem = [...document.querySelectorAll('.side-column .carousel-item')];
  if (!vitrine || !origem.length) return;

  const celular = window.matchMedia('(max-width: 900px)');
  const INTERVALO = window.SITE_CONFIG?.carrosseis?.vertical?.intervalo ?? 5000;
  const total = origem.length;
  const mod = (a, m) => ((a % m) + m) % m;

  // ---- monta o carrossel ----
  const galeria = document.createElement('div');
  galeria.className = 'galeria-mobile';

  const palco = document.createElement('div');
  palco.className = 'galeria-mobile__palco';
  palco.setAttribute('role', 'region');
  palco.setAttribute('aria-roledescription', 'carrossel');
  palco.setAttribute('aria-label', 'Fotos e vídeos da barbearia. Deslize para o lado para ver mais.');
  palco.tabIndex = 0;

  const pontos = document.createElement('div');
  pontos.className = 'galeria-mobile__pontos';

  const cartoes = origem.map((item, i) => {
    const copia = item.querySelector('img, video').cloneNode(true);
    const cartao = document.createElement('figure');
    cartao.className = 'galeria-mobile__cartao';
    cartao.setAttribute('role', 'group');
    cartao.setAttribute('aria-roledescription', 'slide');
    cartao.setAttribute('aria-label', `${i + 1} de ${total}`);

    if (copia.tagName === 'VIDEO') {
      copia.preload = 'none';
      copia.muted = true;
      copia.loop = true;
      copia.playsInline = true;
      copia.controls = false;
      copia.disablePictureInPicture = true;
      // a duração só é conhecida depois que o vídeo começa a baixar
      copia.addEventListener('loadedmetadata', () => { if (i === atual) agendar(); });
      cartao.classList.add('galeria-mobile__cartao--video');
    } else {
      copia.loading = 'lazy';
      copia.draggable = false;
    }
    cartao.appendChild(copia);
    palco.appendChild(cartao);

    // tocar num vizinho traz ele para o centro
    cartao.addEventListener('click', () => {
      if (acabouDeArrastar || i === atual) return;
      irPara(i);
    });

    const ponto = document.createElement('button');
    ponto.type = 'button';
    ponto.className = 'galeria-mobile__ponto';
    ponto.setAttribute('aria-label', `Ver item ${i + 1}`);
    ponto.addEventListener('click', () => irPara(i));
    pontos.appendChild(ponto);
    return cartao;
  });

  galeria.append(palco, pontos);
  vitrine.appendChild(galeria);

  // ---- posições ----
  let atual = 0;
  let naTela = false;

  function posicao(diff) {
    if (diff === 0) return 'centro';
    if (diff === 1) return 'dir1';
    if (diff === total - 1) return 'esq1';
    if (diff === 2 && total > 4) return 'dir2';
    if (diff === total - 2 && total > 4) return 'esq2';
    return 'oculto';
  }

  function atualizar() {
    cartoes.forEach((c, i) => {
      const diff = mod(i - atual, total);
      const pos = posicao(diff);
      c.dataset.pos = pos;
      c.setAttribute('aria-hidden', pos === 'centro' ? 'false' : 'true');
      const v = c.querySelector('video');
      if (!v) return;
      // vizinhos já começam a baixar, para não travar quando chegarem ao centro
      if ((diff === 1 || diff === total - 1) && v.preload === 'none') v.preload = 'auto';
      if (pos === 'centro' && naTela && celular.matches) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    [...pontos.children].forEach((p, i) => p.classList.toggle('is-ativo', i === atual));
    agendar();
  }

  function irPara(i) {
    atual = mod(i, total);
    atualizar();
  }

  // ---- gira sozinho: foto fica INTERVALO; vídeo fica até terminar ----
  let timer;
  function agendar() {
    clearTimeout(timer);
    if (!naTela || !celular.matches || document.hidden) return;
    const v = cartoes[atual].querySelector('video');
    let espera = INTERVALO;
    if (v) espera = Math.max(INTERVALO, (v.duration || 7) * 1000);
    timer = setTimeout(() => irPara(atual + 1), espera);
  }

  // ---- arrastar com o dedo ----
  // Arraste para o lado troca o cartão; o vertical continua rolando a
  // página (touch-action: pan-y no CSS).
  const MINIMO = 40;            // px na horizontal para contar como arraste
  let inicioX = null, inicioY = 0;
  let acabouDeArrastar = false;

  palco.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    inicioX = e.clientX;
    inicioY = e.clientY;
    clearTimeout(timer);
  });

  palco.addEventListener('pointerup', (e) => {
    if (inicioX === null) return;
    const dx = e.clientX - inicioX;
    const dy = e.clientY - inicioY;
    inicioX = null;
    if (Math.abs(dx) >= MINIMO && Math.abs(dx) > Math.abs(dy)) {
      // o "click" que vem logo depois do toque não deve pular de cartão
      acabouDeArrastar = true;
      setTimeout(() => { acabouDeArrastar = false; }, 350);
      irPara(atual + (dx < 0 ? 1 : -1));
    } else {
      agendar();
    }
  });

  palco.addEventListener('pointercancel', () => {
    if (inicioX === null) return;
    inicioX = null;
    agendar();
  });

  // teclado: setas para o lado quando o carrossel está em foco
  palco.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    irPara(atual + (e.key === 'ArrowRight' ? 1 : -1));
  });

  // ---- só anda e toca quando está na tela ----
  function mudouVisibilidade(visivel) {
    naTela = visivel;
    const v = cartoes[atual].querySelector('video');
    if (v) {
      if (naTela && celular.matches && !document.hidden) v.play().catch(() => {});
      else v.pause();
    }
    agendar();
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => mudouVisibilidade(e.isIntersecting), { threshold: 0.3 }).observe(galeria);
  } else {
    naTela = true;
  }
  document.addEventListener('visibilitychange', () => mudouVisibilidade(naTela));
  celular.addEventListener('change', () => mudouVisibilidade(naTela));

  atualizar();
});
