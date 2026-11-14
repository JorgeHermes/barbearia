document.addEventListener('DOMContentLoaded', () => {

  // Inicializa cada carrossel da página de forma independente,
  // procurando por todo bloco ".carousel-wrapper" que contenha um carrossel.
  // Intervalo do autoplay: edite em js/config.js (carrosseis.vertical.intervalo)
  const INTERVALO = window.SITE_CONFIG?.carrosseis?.vertical?.intervalo ?? 2800;

  const instances = document.querySelectorAll('.carousel-wrapper');

  instances.forEach((root) => {
    const items = Array.from(root.querySelectorAll('.carousel-item'));
    const dotsWrap = root.querySelector('.dots');
    const total = items.length;

    if (total === 0) return; // esse bloco não tem carrossel, pula

    let current = 0;
    let autoplayTimer;

    if (dotsWrap) {
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.addEventListener('click', () => { current = i; update(); resetAutoplay(); });
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.dot')) : [];

    function mod(n, m){ return ((n % m) + m) % m; }

    function update(){
      items.forEach((item, i) => {
        const diff = mod(i - current, total);
        let pos;
        if (diff === 0) pos = 'center';
        else if (diff === total - 1) pos = 'left1';
        else if (diff === 1) pos = 'right1';
        else if (diff === total - 2) pos = 'left2';
        else if (diff === 2) pos = 'right2';
        else pos = 'hidden';
        item.setAttribute('data-pos', pos);
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      tocarVideos();
    }

    // Vídeos nos cartões: só o da frente toca, e só com o carrossel na tela.
    // Enquanto não chega à frente o vídeo nem é baixado,
    // porque o HTML usa preload="none".
    let naTela = true;
    function tocarVideos() {
      const visivel = naTela && root.offsetParent !== null;
      items.forEach((item, i) => {
        const video = item.querySelector('video');
        if (!video) return;
        // O próximo cartão já começa a baixar, para não travar quando chegar à frente.
        if (visivel && i === mod(current + 1, total) && video.preload === 'none') video.preload = 'auto';
        if (i === current && visivel) video.play().catch(() => {});
        else video.pause();
      });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        naTela = entry.isIntersecting;
        tocarVideos();
      }).observe(root);
    }

    function next(){ current = mod(current + 1, total); update(); }

    items.forEach((item, i) => {
      item.addEventListener('click', () => { current = i; update(); resetAutoplay(); });
    });

    function startAutoplay(){
      autoplayTimer = setInterval(next, INTERVALO);
    }
    function resetAutoplay(){
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    update();
    startAutoplay();
  });

});