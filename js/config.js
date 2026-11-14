/* =====================================================================
   CONFIGURAÇÃO DO SITE — Barbearia Conexões de Máfia
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para trocar os dados
   da barbearia e o comportamento do site (textos, contatos, menu,
   agendamento, seção de confiança e carrosséis).

   - Cores e fontes ficam em css/variables.css.
   - Imagens ficam na pasta imagens/. O vídeo e as fotos/GIFs/vídeos dos
     carrosséis são trocados direto no index.html (há instruções lá).
   - O index.html já traz estes mesmos textos como reserva: se algum
     campo for apagado daqui, o texto original do HTML continua aparecendo.
   - Este arquivo é público: nunca coloque senhas ou dados internos aqui.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- Dados da barbearia ---------- */
  empresa: {
    nome: 'Barbearia Conexões de Máfia',
    tituloAba: 'Barbearia Conexões de Máfia',   // texto da aba do navegador
    tagline: 'Visagismo',                       // palavra ao lado do logo no topo
    slogan: 'Conexões de Máfia',                // rodapé (título)
    subSlogan: 'Agende seu horário online, a qualquer hora.',   // rodapé (abaixo do slogan)
    agendamento: {
      texto: 'Agendar',                         // botão dourado do topo
      url: 'https://sites.appbarber.com.br/barbeariaconexa-fv4w',
    },
    instagram: {
      usuario: '@barbearia_conexoes_de_mafia',  // texto exibido
      url: 'https://www.instagram.com/barbearia_conexoes_de_mafia/',
    },
    whatsapp: {
      texto: '47 9 9600-8213',                  // número exibido no rodapé
      numero: '5547996008213',                  // usado nos links: só dígitos, com 55 + DDD
    },
    emailSuporte: 'devall.suporte@outlook.com', // suporte do site (rodapé, só no computador)
    copyright: '© 2026 Barbearia Conexões de Máfia. Todos os direitos reservados.',
  },

  /* ---------- Menu ----------
     Os mesmos itens aparecem no menu do topo (computador) e no menu
     hambúrguer (celular e tablet).
     Use "#id-da-secao" para rolar até uma parte da página. */
  menu: {
    itens: [
      { rotulo: 'Início',   link: '#' },
      { rotulo: 'História', link: '#historia' },
      { rotulo: 'Agendamento', link: '#agendamento' },
      { rotulo: 'Sobre',    link: '#sobre' },
      { rotulo: 'Contato',  link: '#contact-column' },
    ],
  },

  /* ---------- Nossa história ----------
     Duas ou três frases reais sobre o começo da barbearia, com uma foto do
     dono ou do espaço ao lado (no celular, a foto fica em cima do texto).
     - foto:    caminho da imagem, ex.: 'imagens/dono.jpg' (em pé, 4:5, mínimo 800x1000).
                Enquanto estiver '', um bloco escuro reserva o lugar.
     - fotoAlt: descreva a foto, ex.: 'Fulano, dono da barbearia, na cadeira de corte' */
  historia: {
    titulo: 'Nossa história',
    texto: 'Texto de exemplo. Conte aqui, em duas ou três frases, como a barbearia começou: quem abriu, quando e o que faz o atendimento de vocês ser diferente.',
    foto: 'imagens/instagram/equipe-historia.jpg',
    fotoAlt: 'Equipe da Barbearia Conexões De Máfia em frente à barbearia, com o punho erguido',
  },

  /* ---------- Agendamento ----------
     Faixa logo depois do vídeo. Os cortes, preços e horários ficam no site
     de agendamento (empresa.agendamento.url); aqui só a chamada para ele.
     O segundo botão abre o WhatsApp (empresa.whatsapp.numero). */
  agendamento: {
    titulo: 'Seu horário, do seu jeito',
    texto: 'Os cortes, os profissionais e os horários livres estão no nosso site de agendamento. Escolha, marque e pronto.',
    textoBotao: 'Abrir agendamento',
    textoWhatsapp: 'Falar no WhatsApp',
  },

  /* ---------- Seção de confiança ("Por que escolher a gente") ----------
     Formada por blocos; cada um tem "ativo" para ligar/desligar. Bloco
     desligado ou sem itens não ocupa espaço; com todos desligados a seção some.
     "exemplo: true" mostra o aviso "Conteúdo de exemplo" no bloco: apague a
     linha quando o texto for o definitivo.

     Ícones disponíveis (campo "icone"): 'raio', 'escudo', 'relogio',
     'suporte', 'codigo', 'celular', 'check', 'chat', 'pincel', 'estrela',
     'crescimento', 'atualizacao'. Também aceita o caminho de uma imagem. */
  confianca: {
    titulo: 'Por que escolher a gente',
    subtitulo: 'Do agendamento ao acabamento, sem complicação.',   // não aparece no celular

    /* Foto de um lado, texto do outro. Desligado: o texto do início já conta a história. */
    quemSomos: {
      ativo: false,
      titulo: 'Quem somos',
      foto: '',
      alt: '',
      texto: '',
      diferenciais: [],
    },

    /* Passos numerados, na ordem em que acontecem (3 a 4) */
    comoFunciona: {
      ativo: true,
      exemplo: true,
      titulo: 'Como funciona',
      passos: [
        { titulo: 'Agende', descricao: 'Escolha o dia e o horário pelo botão Agendar.' },
        { titulo: 'Chegue', descricao: 'Seu horário fica reservado para você.' },
        { titulo: 'Aprove', descricao: 'Só terminamos quando você gostar do resultado.' },
      ],
    },

    /* Cards com ícone, título e uma linha de texto (2 a 3) */
    compromissos: {
      ativo: true,
      exemplo: true,
      titulo: 'Nossos compromissos',
      itens: [
        { icone: 'relogio', titulo: 'Pontualidade', texto: 'Atendimento no horário marcado.' },
        { icone: 'escudo',  titulo: 'Higiene',      texto: 'Material limpo e esterilizado a cada cliente.' },
        { icone: 'estrela', titulo: 'Acabamento',   texto: 'Atenção aos detalhes do começo ao fim.' },
      ],
    },

    /* Faixa de números que contam até o valor final. Ligue só com números reais. */
    numeros: {
      ativo: false,
      titulo: 'Em números',
      itens: [
        // { valor: 5, prefixo: '', sufixo: '+', rotulo: 'anos de barbearia' },
      ],
    },

    /* Depoimentos (3 a 6) com efeito liquid glass. Ligue só com depoimentos reais.
       foto é opcional (sem foto aparecem as iniciais); nota de 1 a 5. */
    depoimentos: {
      ativo: false,
      titulo: 'O que dizem os clientes',
      linkGoogle: '',
      textoLinkGoogle: 'Ver todas as avaliações no Google',
      itens: [
        // { nome: 'Nome do cliente', empresa: '', nota: 5, foto: '', texto: 'Depoimento.' },
      ],
    },
  },

  /* ---------- Carrosséis verticais (ao lado do vídeo no computador; embaixo dele no celular) ---------- */
  carrosseis: {
    vertical: { intervalo: 5000 },   // ms entre slides (1000 = 1 s)
  },
};
