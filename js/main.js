/* =====================================================================
   "LER MAIS" DA HISTÓRIA (celular)
   No celular o texto de "Nossa história" aparece resumido (css/style-home.css).
   Este script mostra o botão "Ler mais" só quando o texto foi cortado.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const bloco = document.getElementById('historia');
  const texto = bloco?.querySelector('.hero-historia__texto');
  const botao = bloco?.querySelector('.hero-historia__mais');
  if (!bloco || !texto || !botao) return;

  function conferir() {
    if (bloco.classList.contains('is-aberto')) return;
    botao.hidden = texto.scrollHeight <= texto.clientHeight + 1;
  }

  botao.addEventListener('click', () => {
    const aberto = bloco.classList.toggle('is-aberto');
    botao.textContent = aberto ? 'Ler menos' : 'Ler mais';
    botao.setAttribute('aria-expanded', String(aberto));
    if (!aberto) bloco.scrollIntoView({ block: 'start' });
  });

  conferir();
  window.addEventListener('resize', conferir);
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
