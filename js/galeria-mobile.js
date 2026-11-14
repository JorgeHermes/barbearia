/* =====================================================================
   GALERIA DO CELULAR (até 900px)
   No computador as fotos e vídeos ficam nos dois carrosséis verticais.
   No celular eles viram uma faixa só, deslizada com o dedo: o cartão do
   meio fica em destaque, o próximo aparece pela borda e o vídeo só toca
   quando o cartão dele está no centro.

   Não precisa editar este arquivo: os cartões vêm dos carrosséis
   verticais do index.html (esquerdo primeiro, depois o direito).
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const vitrine = document.querySelector('.main-showcase');
  const origem = document.querySelectorAll('.side-column .carousel-item');
  if (!vitrine || !origem.length) return;

  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const celular = window.matchMedia('(max-width: 900px)');

  // ---- monta a faixa ----
  const galeria = document.createElement('div');
  galeria.className = 'galeria-mobile';

  const trilho = document.createElement('div');
  trilho.className = 'galeria-mobile__trilho';
  trilho.setAttribute('role', 'region');
  trilho.setAttribute('aria-roledescription', 'carrossel');
  trilho.setAttribute('aria-label', 'Fotos e vídeos da barbearia. Deslize para o lado para ver mais.');
  trilho.tabIndex = 0;

  const pontos = document.createElement('div');
  pontos.className = 'galeria-mobile__pontos';

  const cartoes = [...origem].map((item, i) => {
    const midia = item.querySelector('img, video');
    const copia = midia.cloneNode(true);
    const cartao = document.createElement('figure');
    cartao.className = 'galeria-mobile__cartao';
    cartao.setAttribute('aria-label', `${i + 1} de ${origem.length}`);

    if (copia.tagName === 'VIDEO') {
      copia.preload = 'none';
      copia.muted = true;
      copia.loop = true;
      copia.playsInline = true;
      copia.controls = false;
      copia.disablePictureInPicture = true;
      cartao.classList.add('galeria-mobile__cartao--video');
    } else {
      copia.loading = 'lazy';
    }
    cartao.appendChild(copia);
    trilho.appendChild(cartao);

    const ponto = document.createElement('button');
    ponto.type = 'button';
    ponto.className = 'galeria-mobile__ponto';
    ponto.setAttribute('aria-label', `Ver item ${i + 1}`);
    ponto.addEventListener('click', () => irPara(i));
    pontos.appendChild(ponto);
    return cartao;
  });

  galeria.append(trilho, pontos);
  vitrine.appendChild(galeria);

  // ---- navegação ----
  function irPara(i) {
    const c = cartoes[i];
    trilho.scrollTo({
      left: c.offsetLeft - (trilho.clientWidth - c.clientWidth) / 2,
      behavior: reduzir ? 'auto' : 'smooth',
    });
  }

  // ---- cartão ativo: o que está no centro ----
  let ativo = -1;
  function ativar(i) {
    if (i === ativo) return;
    ativo = i;
    cartoes.forEach((c, j) => {
      c.classList.toggle('is-ativo', j === i);
      const v = c.querySelector('video');
      if (!v) return;
      // vizinhos já começam a baixar, para não travar quando chegarem ao centro
      if (Math.abs(j - i) === 1 && v.preload === 'none') v.preload = 'auto';
      if (j === i && celular.matches) v.play().catch(() => {});
      else v.pause();
    });
    [...pontos.children].forEach((p, j) => p.classList.toggle('is-ativo', j === i));
  }

  // o mais visível (pelo menos 60% dentro da faixa) vira o ativo
  if ('IntersectionObserver' in window) {
    const visiveis = new Map();
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach(e => visiveis.set(e.target, e.intersectionRatio));
      let melhor = -1, maior = 0.6;
      cartoes.forEach((c, j) => {
        const r = visiveis.get(c) || 0;
        if (r >= maior) { maior = r; melhor = j; }
      });
      if (melhor >= 0) ativar(melhor);
    }, { root: trilho, threshold: [0.25, 0.6, 0.9, 1] });
    cartoes.forEach(c => obs.observe(c));

    // fora da tela (rolou a página), o vídeo para
    new IntersectionObserver(([e]) => {
      const v = cartoes[ativo] && cartoes[ativo].querySelector('video');
      if (!v) return;
      if (e.isIntersecting && celular.matches) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.3 }).observe(galeria);
  } else {
    ativar(0);
  }

  // teclado: setas para o lado quando a faixa está em foco
  trilho.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const alvo = Math.max(0, Math.min(cartoes.length - 1, ativo + (e.key === 'ArrowRight' ? 1 : -1)));
    irPara(alvo);
  });

  // girou a tela ou passou para o computador: pausa o que não está na tela
  celular.addEventListener('change', () => {
    const v = cartoes[ativo] && cartoes[ativo].querySelector('video');
    if (v && !celular.matches) v.pause();
  });
});
