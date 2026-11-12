/* =====================================================================
   SEÇÃO DE CONFIANÇA ("Por que escolher a gente")
   Monta os blocos da seção #sobre a partir de SITE_CONFIG.confianca
   (js/config.js). Não é preciso editar este arquivo.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('sobre');
  const container = document.getElementById('trust-blocks');
  const cfg = window.SITE_CONFIG?.confianca;
  if (!section || !container || !cfg) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ícones de linha (24x24, cor via currentColor → --cor-icone)
  const ICONS = {
    raio: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    suporte: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    codigo: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    celular: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    pincel: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    estrela: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    crescimento: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    atualizacao: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Ícone decorativo: SVG embutido (nome da lista) ou <img alt=""> (caminho de arquivo)
  function icon(name, className) {
    const wrap = el('span', className);
    wrap.setAttribute('aria-hidden', 'true');
    if (ICONS[name]) {
      wrap.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
    } else if (name) {
      const img = el('img');
      img.src = name;
      img.alt = '';
      wrap.appendChild(img);
    }
    return wrap;
  }

  function list(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

  // Bloco padrão: <div class="trust-block"> + <h3> (+ aviso de exemplo)
  function block(name, data) {
    const wrap = el('div', `trust-block trust-block--${name} trust-reveal`);
    const head = el('div', 'trust-block__head');
    head.appendChild(el('h3', 'trust-block__title', data.titulo || ''));
    if (data.exemplo) {
      head.appendChild(el('span', 'trust-block__example', 'Conteúdo de exemplo'));
    }
    wrap.appendChild(head);
    return wrap;
  }

  /* ---------- Quem somos ---------- */
  function renderAbout(data) {
    const items = list(data.diferenciais);
    if (!data.texto && !data.foto && items.length === 0) return null;

    const wrap = el('div', 'trust-block trust-block--about trust-reveal');
    const media = el('div', 'trust-about__media');
    if (data.foto) {
      const img = el('img');
      img.src = data.foto;
      img.alt = data.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      media.appendChild(img);
    } else {
      // Sem foto: bloco cinza reservando o espaço até a foto real chegar
      media.classList.add('trust-about__media--placeholder');
      media.setAttribute('aria-hidden', 'true');
    }
    wrap.appendChild(media);

    const content = el('div', 'trust-about__content');
    content.appendChild(el('h3', 'trust-block__title', data.titulo || ''));
    if (data.texto) content.appendChild(el('p', 'trust-about__text', data.texto));
    if (items.length) {
      const ul = el('ul', 'trust-about__list');
      items.forEach((item) => {
        const li = el('li', 'trust-about__item');
        li.appendChild(icon(item.icone, 'trust-icon'));
        li.appendChild(el('span', null, item.texto || ''));
        ul.appendChild(li);
      });
      content.appendChild(ul);
    }
    wrap.appendChild(content);
    return wrap;
  }

  /* ---------- Como funciona ---------- */
  function renderSteps(data) {
    const steps = list(data.passos);
    if (steps.length === 0) return null;

    const wrap = block('steps', data);
    const ol = el('ol', 'trust-steps');
    ol.style.setProperty('--steps', steps.length);
    steps.forEach((step, i) => {
      const li = el('li', 'trust-step');
      li.appendChild(el('span', 'trust-step__number', String(i + 1)));
      li.querySelector('.trust-step__number').setAttribute('aria-hidden', 'true');
      li.appendChild(el('h4', 'trust-step__title', step.titulo || ''));
      if (step.descricao) li.appendChild(el('p', 'trust-step__text', step.descricao));
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    return wrap;
  }

  /* ---------- Compromissos ---------- */
  function renderCommitments(data) {
    const items = list(data.itens);
    if (items.length === 0) return null;

    const wrap = block('commitments', data);
    const grid = el('ul', 'trust-commitments');
    items.forEach((item) => {
      const li = el('li', 'trust-commitment');
      li.appendChild(icon(item.icone, 'trust-icon trust-icon--large'));
      li.appendChild(el('h4', 'trust-commitment__title', item.titulo || ''));
      if (item.texto) li.appendChild(el('p', 'trust-commitment__text', item.texto));
      grid.appendChild(li);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  /* ---------- Números (opcional) ---------- */
  const counters = [];

  function renderNumbers(data) {
    const items = list(data.itens);
    if (items.length === 0) return null;

    const wrap = block('numbers', data);
    const grid = el('ul', 'trust-numbers');
    items.forEach((item) => {
      const li = el('li', 'trust-number');
      const value = el('span', 'trust-number__value');
      const target = Number(item.valor) || 0;
      const format = n => `${item.prefixo || ''}${n.toLocaleString('pt-BR')}${item.sufixo || ''}`;
      value.textContent = format(target);
      counters.push({ node: value, target, format });
      li.appendChild(value);
      li.appendChild(el('span', 'trust-number__label', item.rotulo || ''));
      grid.appendChild(li);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // Conta de 0 até o valor final quando a faixa entra na tela
  function countUp(counter) {
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      counter.node.textContent = counter.format(Math.round(counter.target * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Depoimentos (opcional) ---------- */
  function initials(name) {
    return String(name || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('');
  }

  function renderTestimonials(data) {
    const items = list(data.itens);
    if (items.length === 0) return null;

    const wrap = block('testimonials', data);
    const grid = el('ul', 'trust-testimonials');
    items.forEach((item) => {
      const li = el('li', 'trust-testimonial glass');

      const rating = Math.max(0, Math.min(5, Math.round(Number(item.nota) || 5)));
      const stars = el('div', 'trust-stars');
      stars.setAttribute('role', 'img');
      stars.setAttribute('aria-label', `${rating} de 5 estrelas`);
      for (let i = 1; i <= 5; i++) {
        const star = icon('estrela', `trust-star${i <= rating ? ' is-filled' : ''}`);
        stars.appendChild(star);
      }
      li.appendChild(stars);

      li.appendChild(el('p', 'trust-testimonial__text', item.texto || ''));

      const author = el('div', 'trust-testimonial__author');
      if (item.foto) {
        const img = el('img', 'trust-testimonial__avatar');
        img.src = item.foto;
        img.alt = '';
        img.loading = 'lazy';
        author.appendChild(img);
      } else {
        const avatar = el('span', 'trust-testimonial__avatar trust-testimonial__avatar--initials', initials(item.nome));
        avatar.setAttribute('aria-hidden', 'true');
        author.appendChild(avatar);
      }
      const who = el('div', 'trust-testimonial__who');
      who.appendChild(el('strong', 'trust-testimonial__name', item.nome || ''));
      if (item.empresa) who.appendChild(el('span', 'trust-testimonial__company', item.empresa));
      author.appendChild(who);
      li.appendChild(author);

      grid.appendChild(li);
    });
    wrap.appendChild(grid);

    if (data.linkGoogle) {
      const link = el('a', 'trust-testimonials__link', data.textoLinkGoogle || 'Ver avaliações no Google');
      link.href = data.linkGoogle;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      wrap.appendChild(link);
    }
    return wrap;
  }

  /* ---------- Montagem: só blocos ligados e com conteúdo ---------- */
  const renderers = [
    ['quemSomos', renderAbout],
    ['comoFunciona', renderSteps],
    ['compromissos', renderCommitments],
    ['numeros', renderNumbers],
    ['depoimentos', renderTestimonials],
  ];

  renderers.forEach(([key, render]) => {
    const data = cfg[key];
    if (!data || data.ativo === false) return;
    const node = render(data);
    if (node) container.appendChild(node);
  });

  if (container.children.length === 0) {
    container.hidden = true;
  }

  /* ---------- Entrada suave ao rolar (desligada com movimento reduzido) ---------- */
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  section.classList.add('trust--animate');
  counters.forEach(c => { c.node.textContent = c.format(0); });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entry.target.querySelectorAll('.trust-number__value').forEach((node) => {
        const counter = counters.find(c => c.node === node);
        if (counter) countUp(counter);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  container.querySelectorAll('.trust-reveal').forEach(node => observer.observe(node));
});
