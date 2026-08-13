/* ============================================================
   ANA LUIZA FAVATO: HUB ESTRATEGICO
   Conteudo compartilhado por todas as paginas.
   Edite os textos aqui, as paginas HTML so desenham isso.
   ============================================================ */

const DATA = {

  // Identidade de marca, extraida do Manual de Identidade Visual (MIV) da Agencia Traço.
  marca: {
    slogan: "Relacionamentos que fortalecem marcas, pessoas e experiências.",
    posicionamento: "Ana Luiza Favato atua na interseção entre relações públicas, estratégia de relacionamento e curadoria de experiências para marcas de alto padrão. Seu diferencial está na construção de conexões relevantes, aproximando empresas de públicos selecionados com cuidado, por meio de experiências que geram reconhecimento, credibilidade e posicionamento.",
    missao: "Criar conexões estratégicas que impulsionam marcas, pessoas e negócios por meio de experiências bem planejadas, relações genuínas e uma curadoria criteriosa, transformando networking em valor de mercado.",
    visao: "Ser reconhecida como a principal referência em relações públicas, curadoria de experiências e posicionamento de marcas de alto padrão em Brasília, expandindo a atuação nacionalmente sem abrir mão da exclusividade, da excelência e da autenticidade que definem o trabalho.",
    valores: ["Discrição", "Confiança", "Curadoria", "Exclusividade"],
    paleta: [
      {nome:"Cream Cashmere", hex:"#DAC7B5"},
      {nome:"Vintage Greige", hex:"#A08F88"},
      {nome:"Grafite", hex:"#201F1F"},
      {nome:"Midnight Bordeaux", hex:"#2A070D"},
    ],
    tipografia: [
      {t:"Poppins", d:"Bold, usada nos títulos."},
      {t:"Montserrat", d:"Regular, usada em subtítulos, textos e legendas."},
      {t:"The Seasons", d:"Fonte da logomarca. É paga (entre R$ 100 e R$ 200 para uso comercial) e a compra fica a critério de Ana."},
    ],
    desenvolvidoPor: "Identidade visual desenvolvida pela Agência Traço.",
  },

  pilares: [
    {num:1, id:"p1", titulo:"Bastidores qualificados", sub:"O que acontece por dentro", desc:"O que acontece antes, durante e depois de um evento bem executado. Não é cobertura, é narrativa estratégica.", formatos:["Reels de bastidores","Stories em sequência","Carrossel de entrega"],
     exemplos:[
       {t:"Cobertura do evento com a MLK", d:"Chegada dos convidados, montagem do espaço, atendimento durante o evento e fechamento, registrados em tempo real no estilo documental que já é padrão do trabalho de Ana."},
       {t:"Bastidores das próximas gravações", d:"Preparo, roteiro e making of dos vídeos de case que ainda serão gravados com o PKS e a MLK, mostrando o processo antes da entrega final. É um conteúdo diferente da cobertura do evento: aqui o assunto é a produção em si."},
     ]},
    {num:2, id:"p2", titulo:"Posicionamento e referência", sub:"Raciocínio sobre o mercado", desc:"Conteúdo que demonstra como Ana pensa sobre o mercado onde atua e o que diferencia um evento memorável.", formatos:["Posts de opinião","Carrossel de ponto de vista","Reflexões de mercado"]},
    {num:3, id:"p3", titulo:"Portfólio em movimento", sub:"Entregas que viram conteúdo", desc:"Eventos realizados, marcas conectadas e ambientes acessados, com curadoria estética que transmite nível.", formatos:["Antes e depois","Linha do tempo de projetos","Reels de registro"]},
    {num:4, id:"p4", titulo:"Conexão e bastidores pessoais", sub:"A profissional por trás do trabalho", desc:"Quem é a Ana além do evento: trajetória e visão de mercado, humanizando o posicionamento.", formatos:["Stories do dia a dia","História pessoal","Ponto de vista"]},
  ],

  fases: [
    {n:1, titulo:"Aquecimento", resumo:"Curiosidade, não anúncio", pontos:[
      {t:"Fragmentos da identidade visual", d:"Aplicações, logotipo e monogramas aparecem nos stories sem legenda explicativa."},
      {t:"A pergunta é o objetivo", d:"Quem perguntar recebe resposta pessoal no direct sobre o novo posicionamento."},
      {t:"Não é lançamento, é o próximo passo", d:"Sem alarde forçado, é a Ana seguindo o caminho que já vinha construindo."},
    ]},
    {n:2, titulo:"Consolidando no feed", resumo:"Terça, quinta e sábado", pontos:[
      {t:"Terça: reveal da identidade", d:"Logo, paleta e monograma entram em cena. O visual carrega o peso."},
      {t:"Quinta: vídeo manifesto", d:"O contexto profissional contado como história, resolvendo o \"quem sou eu\" de quem chega sem indicação."},
      {t:"Sábado: depoimento em collab", d:"Prova social real, servindo como evidência para quem está decidindo contratar."},
    ]},
    {n:3, titulo:"Portfólio que não se perde na conversa", resumo:"Site clicável na bio", pontos:[
      {t:"O que mostra", d:"Quem é Ana Luiza, como ela conduz o trabalho e os eventos e marcas com quem já trabalhou."},
      {t:"O que não mostra", d:"Valores. Cada orçamento é enviado por demanda, o que reforça exclusividade sem limitar."},
    ]},
    {n:4, titulo:"Cobertura de eventos padrão", resumo:"Estilo documental, tipo reality", pontos:[
      {t:"Chegada dos convidados, evento enchendo, escopo, fechamento", d:"Câmera acompanha de longe, sem cortar para comentário nem pedir pose, só registra o que já acontece."},
      {t:"Sem \"fim de evento\" institucional", d:"Fecha com o melhor momento escolhido a dedo, garantindo que a última impressão seja a mais forte."},
    ]},
  ],

  // Cronograma de lançamento. Já estamos no terceiro mês do plano, e o ritmo real ficou um
  // pouco atrás do previsto, o que é normal: os itens concluídos ficam marcados conforme avançam.
  meses: [
    {id:"m1", titulo:"Mês 1", sub:"Alinhamento e fundação", statusLabel:"Concluído", itens:[
      "Diagnóstico completo do perfil atual, análise técnica e editorial",
      "Definição do posicionamento e reescrita da bio",
      "Levantamento de todo material visual disponível de eventos passados",
      "Início do processo de identidade visual com a Agência Traço",
      "Definição da linha editorial e primeiros temas de conteúdo",
      "Estruturação da proposta comercial com a identidade visual",
    ]},
    {id:"m2", titulo:"Mês 2", sub:"Ativação e primeiros conteúdos", statusLabel:"Concluído", itens:[
      "Primeiras publicações com a nova linha editorial",
      "Reestruturação do perfil com bio atualizada",
      "Série de posts de portfólio transformando entregas passadas em conteúdo",
      "Cobertura estratégica de eventos com briefing de como documentar",
      "Definição de frequência de publicação sustentável",
    ]},
    {id:"m3", titulo:"Mês 3", sub:"Lançamento e ajuste", statusLabel:"Mês atual", itens:[
      "Publicar a sequência de lançamento da identidade visual",
      "Avaliação dos conteúdos que mais ressoaram com o público",
      "Ajuste de linha editorial com base em dados reais",
      "Planejamento do próximo trimestre com maior intenção estratégica",
      "Alinhamento de próximos eventos com oportunidades de conteúdo",
    ]},
  ],

  escopoGeral: [
    {t:"01 · Diagnóstico de marca pessoal", d:"Análise completa de onde a Ana se faz presente: redes, posicionamento, materiais, eventos, clientes."},
    {t:"02 · Planejamento de conteúdos", d:"Ideias, pilares temáticos e plano de execução adaptado à rotina e aos eventos."},
    {t:"03 · Ponte com designer de marca", d:"Coordenação da criação de logo, identidade visual, apresentações e materiais."},
    {t:"04 · Ponte com videomaker e storymaker", d:"Indicação e acompanhamento para gravações, roteiros e cobertura de eventos."},
    {t:"05 · Estrutura de proposta comercial", d:"Escopo pré-montado com a identidade visual, pronto para só alterar pontos-chave."},
    {t:"06 · Otimização de eventos", d:"Antes de cada evento, planejamento de como documentar e transformar em portfólio."},
  ],

  metodo: [
    {n:"01", t:"Diagnóstico e direcionamento", d:"Reunião inicial, levantamento das redes e entrega de um documento diagnóstico com pontos fortes e oportunidades."},
    {n:"02", t:"Estratégia e plano de ação", d:"Linha editorial, pilares de conteúdo, cronograma estruturado e conexão com quem executa."},
    {n:"03", t:"Execução e análise", d:"Acompanhamento contínuo, alinhamentos quinzenais e relatório com resultados e próximos passos."},
  ],

  // O que já saiu do papel até agora. Fica visível na página inicial para o hub não passar a
  // impressão de que nada foi feito ainda, quando na real boa parte da fundação já está pronta.
  conquistas: [
    {t:"Documento de estratégia", d:"Diagnóstico, os quatro pilares de conteúdo e as quatro fases do reposicionamento já estão definidos e documentados."},
    {t:"Identidade visual finalizada", d:"Logo, monograma, paleta de cores, tipografia e aplicações prontos, desenvolvidos pela Agência Traço."},
    {t:"Cronograma de lançamento da identidade visual", d:"A sequência de stories, feed e vídeo manifesto para apresentar a nova marca já está definida."},
    {t:"Vídeo Manifesto gravado e editado", d:"Pronto para entrar na sequência de lançamento no Instagram."},
    {t:"Prévia do portfólio", d:"A primeira versão do documento de portfólio já existe e está em atualização com Ana e a Traço."},
  ],

  // Para onde olhar agora. Lista curta de propósito, não é para virar outro backlog.
  proximosPassos: [
    {t:"Validar a nova proposta com a Agência Traço", d:"Fechar o escopo de gestão do Instagram e produção de conteúdo antes de apresentar para Ana."},
    {t:"Publicar a sequência de lançamento da IDV", d:"Stories com a nova identidade visual, seguidos do Vídeo Manifesto no feed."},
    {t:"Gravar os vídeos de case do PKS e da MLK", d:"O roteiro já está pronto, falta agendar a gravação com Ana."},
    {t:"Cobrir o evento da MLK com o novo método", d:"Primeiro teste real do formato de cobertura documental, no dia 19 de agosto."},
    {t:"Organizar os insumos das pastas compartilhadas", d:"Revisar o material bruto do Drive antes da próxima leva de produção e roteiro."},
  ],

  // Processo recorrente documentado, para não reinventar a roda a cada evento novo.
  processo: {
    nome: "Cobertura de evento",
    objetivo: "Registrar um evento da Ana de um jeito que já nasce pronto para virar conteúdo, sem precisar reorganizar tudo depois.",
    frequencia: "A cada evento relevante que a Ana atende",
    responsavel: "Luiza cuida do roteiro e do briefing. A Agência Traço cuida da captação e da edição.",
    passos: [
      {n:1, t:"Briefing antes do evento", d:"Luiza define o que precisa ser registrado: chegada dos convidados, montagem, momentos-chave e fechamento."},
      {n:2, t:"Captação no estilo documental", d:"A câmera acompanha de longe, sem cortar para comentário nem pedir pose, só registra o que já está acontecendo."},
      {n:3, t:"Seleção do melhor momento de fechamento", d:"Em vez de um encerramento institucional, escolhe a dedo a cena mais forte para fechar o vídeo."},
      {n:4, t:"Edição e entrega pela Traço", d:"Material editado entregue para aprovação antes de qualquer publicação."},
      {n:5, t:"Publicação e atualização do quadro", d:"Conteúdo publicado e o card correspondente movido para Concluído."},
    ],
    criterioPronto: [
      "O vídeo mostra o processo real do evento, não só os melhores ângulos.",
      "Ana aprovou o material antes da publicação.",
      "O conteúdo final está registrado na pauta de conteúdo com o status atualizado.",
    ],
  },

  equipe: [
    {
      key:"ana", nome:"Ana Luiza Favato", papel:"Cliente", iniciais:"AF",
      resumo:"Relações Públicas e Curadoria de Eventos.",
      funcoes:[
        "Fornecer os insumos necessários para os profissionais envolvidos (materiais, informações, fotos, histórico de eventos)",
        "Aprovar entregas antes de qualquer publicação ou execução",
      ],
      ownerMatch:["ana"],
    },
    {
      key:"luiza", nome:"Luiza Cascaes", papel:"Estrategista Digital", iniciais:"LC",
      resumo:"Gestão e estratégia digital.",
      funcoes:[
        "Criar a estratégia de posicionamento digital",
        "Fazer a ponte entre a cliente e os profissionais de outras áreas envolvidos no projeto",
        "Direcionar a cliente nas ações práticas do dia a dia",
        "Criar roteiros e briefings de conteúdo, de cobertura de eventos e de propostas comerciais",
      ],
      ownerMatch:["luiza"],
    },
    {
      key:"traco", nome:"Agência Traço", papel:"Design gráfico e produção audiovisual", iniciais:"AT",
      resumo:"Identidade visual, portfólio e produção de conteúdo audiovisual.",
      funcoes:[
        "Criar a identidade visual da marca pessoal",
        "Criar a proposta comercial de Ana em peça visual (portfólio)",
        "Gravar os conteúdos audiovisuais",
        "Editar e entregar os conteúdos produzidos",
        "Cobertura de eventos pontuais, contratados à parte do escopo fixo",
      ],
      ownerMatch:["traço","traco"],
    },
  ],

  // Áreas usadas como tag no quadro de entregas (aba "Controle" da planilha).
  areas: {
    "Estratégia":{color:"var(--bordo)", bg:"var(--bordo-soft)"},
    "Comercial":{color:"var(--gold)", bg:"var(--gold-soft)"},
    "Conteúdo":{color:"var(--areia)", bg:"var(--areia-soft)"},
    "Design":{color:"var(--green)", bg:"var(--green-soft)"},
    "Produção":{color:"var(--grafite)", bg:"var(--line-soft)"},
  },

  // Quadro de entregas, seed real da aba "Controle" da planilha de controle, com os itens já
  // concluídos que a Luiza confirmou (documento de estratégia, cronograma de lançamento da IDV
  // e vídeo manifesto) refletidos como "done".
  kanbanSeed: [
    {id:"c1", col:"done", titulo:"Documento de estratégia (autoridade, cases, novos pilares)", area:"Estratégia", owner:"Luiza", prazo:"", obs:"Base para a nova proposta com a agência"},
    {id:"c2", col:"todo", titulo:"Proposta para gestão do Instagram de Ana Luiza + produção de conteúdo", area:"Comercial", owner:"Luiza + Traço", prazo:"", obs:"Entender o escopo e a necessidade para um bom posicionamento digital"},
    {id:"c3", col:"todo", titulo:"Apresentação da nova proposta", area:"Comercial", owner:"Luiza + Traço", prazo:"", obs:"Depois da validação do escopo com a agência"},
    {id:"c4", col:"todo", titulo:"Sequência de lançamento no Instagram", area:"Conteúdo", owner:"Luiza", prazo:"2026-08-17", obs:"Teaser via Stories, depois lançamento do Manifesto no feed"},
    {id:"c5", col:"doing", titulo:"Atualização do documento de portfólio", area:"Conteúdo", owner:"Ana Luiza + Traço", prazo:"2026-08-11", obs:"Ana aponta os ajustes e a ordem cronológica, a Traço edita o documento"},
    {id:"c6", col:"todo", titulo:"Site de portfólio em HTML", area:"Design", owner:"Luiza", prazo:"", obs:"Depende da versão final do portfólio"},
    {id:"c7", col:"todo", titulo:"Roteiros para novos vídeos de case (PKS + MLK)", area:"Conteúdo", owner:"Luiza + Ana", prazo:"2026-08-16", obs:""},
    {id:"c8", col:"todo", titulo:"Plano de cobertura do evento da MLK", area:"Conteúdo", owner:"Luiza", prazo:"2026-08-18", obs:"Primeiro uso do método de cobertura e dos materiais físicos"},
    {id:"c9", col:"todo", titulo:"Gravação dos novos vídeos de case", area:"Produção", owner:"Todos", prazo:"2026-08-18", obs:""},
    {id:"c10", col:"todo", titulo:"Rotina mensal de gravação de vídeo com Ana", area:"Conteúdo", owner:"Ana", prazo:"", obs:"Ana está disposta a gravar, o que habilita o novo escopo mensal"},
    {id:"c11", col:"done", titulo:"Identidade visual finalizada (logo, monograma, apresentações)", area:"Design", owner:"Traço", prazo:"", obs:""},
    {id:"c12", col:"todo", titulo:"Definir cronograma de conteúdo e estratégia com base no que for fechado na proposta", area:"Estratégia", owner:"Luiza", prazo:"2026-08-19", obs:""},
    {id:"c13", col:"done", titulo:"Cronograma de lançamento da identidade visual", area:"Estratégia", owner:"Luiza", prazo:"", obs:"Define a sequência de stories, feed e vídeo manifesto para apresentar a nova marca"},
    {id:"c14", col:"done", titulo:"Vídeo Manifesto gravado e editado", area:"Produção", owner:"Traço", prazo:"", obs:"Pronto para entrar na sequência de lançamento no Instagram"},
  ],

  // Pauta de conteúdo, seed real da aba "Planilha de criação". Cada item tem um campo de link
  // (para insumos e roteiros) que fica em branco até alguém preencher, e um objetivo dentro da
  // jornada do seguidor: atrair, nutrir ou converter.
  contentSeed: [
    {id:"n1", material:"Vídeo com dermatologista", tema:"Falar sobre a história de Ana com o profissional e sobre os procedimentos que ela faz, sempre prezando naturalidade e ressaltando sua beleza, sem criar algo muito artificial.", pilar:"p2", tipo:"Reels", desdobramento:"", clienteEvento:"Thiago Perfeito", insumo:"", roteiro:"", status:"Ideia", objetivo:"Nutrir", link:""},
    {id:"n2", material:"Vídeo test drive carro híbrido", tema:"Falar sobre o trabalho com a marca enquanto faz um test drive no carro. Traz posicionamento de um jeito diferente, mostrando o \"produto\" que gera interesse enquanto se posiciona sobre o trabalho.", pilar:"p3", tipo:"Reels + Collab", desdobramento:"", clienteEvento:"Omoda Jaecco", insumo:"", roteiro:"", status:"Ideia", objetivo:"Atrair", link:""},
    {id:"n3", material:"Narração vídeo evento PKS", tema:"Aproveitar o vídeo produzido pela equipe do PKS no dia 04/08 para gerar conteúdo sobre o trabalho de Ana, criando uma narração em voice over dela contando sobre o processo e sua participação.", pilar:"p3", tipo:"Reels (dependendo da qualidade do vídeo)", desdobramento:"", clienteEvento:"PKS", insumo:"", roteiro:"", status:"Ideia", objetivo:"Nutrir", link:""},
    {id:"n4", material:"Narração vídeo evento Macallan", tema:"Aproveitar o vídeo produzido pela equipe do evento no dia 05/08 para gerar conteúdo sobre o trabalho de Ana, criando uma narração em voice over dela contando sobre o processo e sua participação.", pilar:"p3", tipo:"Reels (dependendo da qualidade do vídeo)", desdobramento:"", clienteEvento:"", insumo:"", roteiro:"", status:"Ideia", objetivo:"Nutrir", link:""},
    {id:"n5", material:"Videocase história com a MLK", tema:"Contar sua história com a marca: como aconteceu, como foi o escopo de trabalho, os detalhes e todo o processo de maneira resumida, destacando as partes mais interessantes (desdobra também no dia da cobertura).", pilar:"p3", tipo:"Reels", desdobramento:"Backstage nos stories", clienteEvento:"MLK", insumo:"", roteiro:"", status:"Ideia", objetivo:"Converter", link:""},
    {id:"n6", material:"Videocase história com o PKS", tema:"Contar sua história com a marca: como aconteceu, como foi o escopo de trabalho, os detalhes e todo o processo de maneira resumida, destacando as partes mais interessantes.", pilar:"p3", tipo:"Reels", desdobramento:"Backstage nos stories", clienteEvento:"PKS", insumo:"", roteiro:"", status:"Ideia", objetivo:"Converter", link:""},
    {id:"n7", material:"Videocase + cobertura do evento com a MLK", tema:"Cobertura do evento com a marca, com narração de Ana falando não só do evento (posicionando seu trabalho), mas também contando mais sobre a história com a MLK.", pilar:"p3", tipo:"Reels + stories", desdobramento:"Backstage nos stories", clienteEvento:"MLK", insumo:"", roteiro:"", status:"Ideia", objetivo:"Converter", link:""},
    {id:"n8", material:"Vídeo com indicações em Brasília", tema:"Ana falando sobre o que perguntam a ela e indicando lugares e profissionais, de forma direta, sem enrolação, se colocando como referência acessível e trazendo dicas fáceis de compartilhar.", pilar:"p2", tipo:"Reels", desdobramento:"", clienteEvento:"Marca pessoal", insumo:"", roteiro:"", status:"Ideia", objetivo:"Atrair", link:""},
    {id:"n9", material:"Portfólio de Ana", tema:"Documento explicando seu trabalho.", pilar:"p3", tipo:"PDF", desdobramento:"Documento, HTML (site), materiais impressos, postagem de stories", clienteEvento:"Marca pessoal", insumo:"", roteiro:"", status:"Ideia", objetivo:"Converter", link:""},
    {id:"n10", material:"Cartão de visita físico com monograma e QR code para o portfólio", tema:"", pilar:"p4", tipo:"Material impresso", desdobramento:"Stories", clienteEvento:"Marca pessoal", insumo:"Foto do cartão em mãos", roteiro:"Bastidor simples: cartão sendo entregue ou sobre a mesa de trabalho", status:"Ideia", objetivo:"Nutrir", link:""},
    {id:"n11", material:"Papel timbrado para propostas impressas", tema:"É interessante, quando tiver reunião presencial com o cliente, entregar uma proposta impressa. Ele pode levar, repassar, e isso agrega a sensação de cuidado e atenção.", pilar:"p2", tipo:"Post estático", desdobramento:"", clienteEvento:"Marca pessoal", insumo:"Foto da proposta impressa", roteiro:"Mostrar a proposta como material físico, reforçando a profissionalização do processo comercial", status:"Ideia", objetivo:"Nutrir", link:""},
    {id:"n12", material:"Etiqueta", tema:"Criar uma etiqueta com a logomarca de Ana que possa ir em presentes dados em eventos e ser usada na collab com a MLK.", pilar:"p4", tipo:"Material impresso", desdobramento:"Collab com a MLK", clienteEvento:"Marca pessoal", insumo:"", roteiro:"", status:"Ideia", objetivo:"Nutrir", link:""},
  ],

  statusOptions:["Ideia","Roteirizado","Gravado / Produzido","Editado","Publicado"],
  objetivoOptions:["Atrair","Nutrir","Converter"],

  // Calendário, seed real de agosto de 2026 (aba "Cronograma Redes Sociais"). Os meses seguintes
  // ficam com a grade pronta para preencher direto na tela.
  calendarMonths:[
    {year:2026, month:8, label:"Agosto 2026"},
    {year:2026, month:9, label:"Setembro 2026"},
    {year:2026, month:10, label:"Outubro 2026"},
    {year:2026, month:11, label:"Novembro 2026"},
    {year:2026, month:12, label:"Dezembro 2026"},
  ],
  calendarSeed:{
    "2026-08":{
      "13":"Decidir sobre conteúdos impressos no evento, criação e envio para a gráfica se for o caso",
      "14":"Entrega da proposta para dia de produção, bullet points de roteiro e checklist de conteúdos",
      "17":"Postar stories com a IDV",
      "18":"Postar vídeo Manifesto e gravação dos vídeo cases: PKS e MLK, mais reunião presencial de alinhamento",
      "19":"Evento MLK e cobertura em tempo real, estilo reality",
      "20":"Subir fotos do evento MLK",
      "21":"Verificar possibilidade de publicar videocase MLK ou vídeo orgânico gravado no dia do evento",
      "26":"Verificar possibilidade de publicar videocase",
    },
    "2026-09":{
      "2":"Verificar possibilidade de publicar videocase",
    },
    "2026-10":{},
    "2026-11":{},
    "2026-12":{},
  },

  // Insumos: pastas compartilhadas com o material bruto usado nos conteúdos,
  // propostas e produções (substituiu a antiga aba de perguntas em aberto).
  insumos: [
    {
      titulo:"Pasta de insumos 1",
      desc:"Materiais de apoio compartilhados para os conteúdos e propostas em andamento.",
      url:"https://drive.google.com/drive/folders/1ebau-dxSQCR3-grkk5UoqfRJBy7V1Epf?usp=drive_link",
    },
    {
      titulo:"Pasta de insumos 2",
      desc:"Materiais de apoio compartilhados para os conteúdos e propostas em andamento.",
      url:"https://drive.google.com/drive/folders/1nMXxjnJFs5Y-iiYhgz16lg12BHmylpJV",
    },
  ],

  // Documento "Escopo de proposta Ana Luiza Favato": o roteiro e a copy que a Ana usa
  // para propor os próprios serviços de RP para os clientes dela.
  documentoProposta: {
    titulo:"Proposta comercial de Ana: estrutura, copy e roteiro",
    intro:"Documento de trabalho da Luiza: o direcionamento da proposta, o roteiro que serve para qualquer evento, e a copy já pronta para a primeira proposta real. Os campos em [colchetes] são para preencher com os dados do cliente específico.",
    parte1:{
      titulo:"Parte 1 · O que mudou e por quê",
      paragrafos:[
        "A proposta atual funciona: a Ana fecha eventos, cobra valores relevantes e entrega bem. O problema não é operacional, é de percepção. A proposta descreve o que é relações públicas antes de mostrar quem ela é, e o resultado é uma proposta que qualquer RP poderia assinar.",
        "A nova proposta inverte essa lógica: ela aparece primeiro. O modo de trabalhar é o argumento principal, e o escopo vem depois, como consequência de quem ela é e do que entrega de diferente.",
      ],
      blocos:[
        {t:"O que fica", d:"A estrutura de serviços que já pratica funciona: mailing curado, RSVP, presença no evento e análise pós-evento. Isso fica, mas ganha nome e valor dentro da narrativa."},
        {t:"O que muda: a abertura", d:"Em vez de começar explicando RP, começa com o problema do cliente ou uma frase que já posiciona o que ela resolve. A copy deixa de ser genérica e passa a ser dela."},
        {t:"O que muda: a credencial", d:"Em vez de currículo, ela aparece como acesso: quem conhece, onde circula, o que isso gera para quem contrata. Esse é o diferencial real e precisa aparecer cedo."},
        {t:"O add-on de cobertura", d:"Eventos maiores passam a ter uma recomendação de cobertura fotográfica estratégica, não como extra genérico, mas como extensão do trabalho: o que entrega vira portfólio, vira conteúdo, vira prova."},
      ],
    },
    parte2:{
      titulo:"Parte 2 · O roteiro (estrutura fixa, para qualquer evento)",
      blocos:[
        {t:"01 · Abertura contextualizada", d:"Uma ou duas frases sobre o evento ou cliente específico, mostrando que leu o contexto. Não é proposta de template."},
        {t:"02 · O que está em jogo", d:"Por que esse evento importa e qual resultado precisa gerar. Ancora o valor do trabalho antes de qualquer número aparecer."},
        {t:"03 · Por que você", d:"A credencial em linguagem de acesso: quem conhece, onde circula, o que isso gera para o cliente. Não é currículo, é o argumento de por que contratar ela é diferente."},
        {t:"04 · O que você entrega", d:"O escopo em três blocos: mailing estratégico (lista com critério e justificativa), RSVP e gestão de confirmações (acompanhamento ativo dos prioritários), presença no evento (conduzindo conexões, não só presente)."},
        {t:"05 · Recomendação de cobertura", d:"Para eventos acima de 30 convidados: briefing feito por ela, profissional indicado por ela, material entregue editado. É recomendação, não venda."},
        {t:"06 · Investimento", d:"Valor fechado para aquele escopo, sem surpresas. Se tiver add-on, apresenta os dois valores (base e com cobertura) e deixa a escolha com o cliente."},
        {t:"07 · Próximo passo", d:"Uma ação clara: reunião de alinhamento, confirmação por mensagem, data de início. A proposta não termina sem dizer o que acontece depois."},
      ],
    },
    parte3:{
      titulo:"Parte 3 · A copy pronta (adaptar para cada evento)",
      blocos:[
        {t:"Bloco 01 · Abertura contextualizada", d:"\"[Nome do evento] é uma iniciativa que merece o público certo na sala. Esta proposta foi construída para isso.\" Se for jantar: \"Um jantar com 30 convidados selecionados vale pelo que gera depois, não apenas pelo que acontece no dia.\""},
        {t:"Bloco 02 · O que está em jogo", d:"\"Eventos de alto padrão falham quando o público errado ocupa as cadeiras. O que você contrata, quando contrata curadoria de mailing, não é uma lista, é a garantia de que cada pessoa presente tem uma razão estratégica de estar ali.\""},
        {t:"Bloco 03 · Por que eu", d:"\"Trabalho com relações públicas em Brasília há anos, não a partir de um banco de dados, a partir de relações construídas. Formadores de opinião, anfitriões de alto valor e empresários fazem parte da minha rede ativa.\" O que acessa: formadores de opinião, anfitriões de jantares privados, empresários e figuras com capacidade de movimentar o público A de Brasília. O que gera: presença qualificada, mídia espontânea, indicações futuras."},
        {t:"Bloco 04 · O que você entrega", d:"Mailing estratégico (lista com justificativa de cada inclusão), RSVP e gestão de confirmações (follow-up ativo nos prioritários), presença no evento (conduzindo conexões, gerenciando imprevistos com discrição) e relatório pós-evento (o que funcionou, feedback, mapeamento de oportunidades)."},
        {t:"Bloco 05 · Recomendação de cobertura estratégica", d:"\"Para este evento, recomendo incluir cobertura fotográfica estratégica, não para álbum, para transformar o que você entrega em portfólio, em conteúdo e em prova do trabalho realizado.\" Inclui briefing, indicação e coordenação do profissional, e entrega do material editado."},
        {t:"Bloco 06 · Investimento", d:"Escopo base (mailing, RSVP, presença e relatório) e escopo com cobertura estratégica: dois valores lado a lado, o cliente escolhe."},
        {t:"Bloco 07 · Próximo passo", d:"\"Para avançar, basta confirmar interesse e agendarmos uma conversa rápida para alinhar os detalhes do escopo. A proposta final é apresentada depois dessa conversa.\""},
      ],
      nota:"Nota sobre tom de voz: a copy foi escrita para soar confiante, direta e elegante, sem explicar demais e sem vender demais. Antes de usar, ler em voz alta. Se alguma frase não soar como a Ana, reescrever.",
    },
  },

  // Outros documentos de referência da página Documentos.
  documentosExtras: {
    videoManifesto: {
      titulo:"Vídeo Manifesto",
      desc:"Já gravado e editado pela Agência Traço. Entra na sequência de lançamento da identidade visual, previsto para o dia 18 de agosto.",
      arquivo:"assets/video-manifesto.mp4",
    },
    portfolio: {
      titulo:"Portfólio",
      status:"Em atualização",
      desc:"A primeira versão do documento já existe. Ana está apontando os ajustes e a ordem cronológica das entregas, e a Agência Traço está editando o documento com a nova identidade visual. A versão em HTML do portfólio entra depois que essa atualização fechar.",
    },
  },
};

const TAGS = {
  m1:{label:"Mês 1", color:"var(--bordo)", bg:"var(--bordo-soft)"},
  m2:{label:"Mês 2", color:"var(--gold)", bg:"var(--gold-soft)"},
  m3:{label:"Mês 3", color:"var(--green)", bg:"var(--green-soft)"},
};

const PILAR_LABELS = {
  p1:"01 · Bastidores qualificados",
  p2:"02 · Posicionamento e referência",
  p3:"03 · Portfólio em movimento",
  p4:"04 · Conexão e bastidores pessoais",
};
