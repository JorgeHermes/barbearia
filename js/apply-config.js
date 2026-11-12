/* =====================================================================
   Aplica js/config.js (window.SITE_CONFIG) ao HTML.
   Não é preciso editar este arquivo.

   Marcações aceitas no HTML:
   - data-config="caminho.no.objeto"        troca o texto do elemento
   - data-config-<atributo>="caminho"       troca o atributo (ex.: data-config-href,
                                            data-config-aria-label)
   - data-config-menu                       recria os links do menu a partir de menu.itens
   Se o caminho não existir na config, o conteúdo original do HTML é mantido.
   ===================================================================== */
(() => {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // Lê "a.b.0.c" dentro da config; retorna undefined se não existir.
  function get(path) {
    return path.split('.').reduce((obj, key) => (obj == null ? undefined : obj[key]), cfg);
  }

  // Troca apenas o texto visível, preservando elementos filhos (ícones, <span> etc.)
  // e os espaços/quebras de linha ao redor do texto original.
  function setText(el, value) {
    const nodes = [...el.childNodes].filter(n => n.nodeType === 3 && n.data.trim() !== '');
    if (nodes.length === 1) {
      const node = nodes[0];
      const match = node.data.match(/^(\s*)[\s\S]*?(\s*)$/);
      const novo = match[1] + value + match[2];
      if (node.data !== novo) node.data = novo;
    } else if (nodes.length === 0 && el.children.length === 0) {
      el.textContent = value;
    }
  }

  // Título da aba
  const titulo = get('empresa.tituloAba');
  if (titulo != null && document.title !== titulo) document.title = titulo;

  // Textos e atributos marcados com data-config*
  document.querySelectorAll('*').forEach((el) => {
    for (const attr of [...el.attributes]) {
      if (attr.name === 'data-config') {
        const value = get(attr.value);
        if (value != null) setText(el, String(value));
      } else if (attr.name.startsWith('data-config-') && attr.name !== 'data-config-menu') {
        const value = get(attr.value);
        const alvo = attr.name.slice('data-config-'.length);
        if (value != null && el.getAttribute(alvo) !== String(value)) el.setAttribute(alvo, String(value));
      }
    }
  });

  // Menus (topo e mobile): mesmos itens nos dois
  const itens = get('menu.itens');
  if (Array.isArray(itens)) {
    document.querySelectorAll('[data-config-menu]').forEach((container) => {
      const links = [...container.querySelectorAll(':scope > a')];
      if (links.length === 0) return;
      const ref = links[links.length - 1].nextSibling;
      itens.forEach((item, i) => {
        let a = links[i];
        if (!a) {
          a = links[0].cloneNode(false);
          container.insertBefore(a, ref);
        }
        if (item.rotulo != null) setText(a, String(item.rotulo));
        if (item.link != null && a.getAttribute('href') !== item.link) a.setAttribute('href', item.link);
      });
      links.slice(itens.length).forEach(a => a.remove());
    });
  }

  // Links montados a partir da config: data-link-whatsapp (wa.me/numero)
  // e data-link-email (mailto:emailSuporte)
  const numero = String(get('empresa.whatsapp.numero') || '').replace(/\D/g, '');
  if (numero) {
    document.querySelectorAll('[data-link-whatsapp]').forEach(a => a.setAttribute('href', `https://wa.me/${numero}`));
  }
  const email = get('empresa.emailSuporte');
  if (email) {
    document.querySelectorAll('[data-link-email]').forEach(a => a.setAttribute('href', `mailto:${email}`));
  }
})();
