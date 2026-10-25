// Busca na página o elemento que exibirá o resumo das ordens.
const resumo = document.querySelector("#resumo");
// Busca o botão que alterna o modo de visualização para TV.
const botaoTv = document.querySelector("#modo-tv");
// Esta linha está desativada; ela ilustra a busca da lista no HTML, mas a variável lista não é criada aqui.
//const lista = document.querySelector("#lista");
// Busca todos os botões usados para filtrar as ordens.
const botoes = document.querySelectorAll(".filtro");
// Busca o formulário de abertura de uma nova ordem de produção.
const formOp = document.querySelector("#form-op");
const busca = document.querySelector("#busca");
const vazia = document.querySelector("#vazia");
// Define que, ao iniciar, o painel deve exibir ordens de todos os status.
let filtros = "todas";
let proximoNumero = 105;
// Inicializa a contagem de ordens que estão aguardando.
let aguardando = 0,
  // Inicializa a contagem de ordens concluídas.
  concluido = 0,
  // Inicializa a contagem de ordens em produção.
  producao = 0;
// Cria a coleção inicial de ordens que será exibida no painel.
let ordens = [
  // Inicia o objeto que representa a primeira ordem de produção.
  {
    // Define o número identificador da primeira ordem.
    numero: 101,
    // Informa o produto fabricado nessa ordem.
    produto: "Eixo de transmissão",
    // Informa a quantidade solicitada nessa ordem.
    quantidade: 200,
    // Informa a máquina associada a essa ordem.
    maquina: "Torno CNC",
    // Define que a ordem ainda aguarda o início da produção.
    status: "aguardando",
    urgente: false,
  // Encerra o objeto da primeira ordem.
  },
  // Inicia o objeto que representa a segunda ordem de produção.
  {
    // Define o número identificador da segunda ordem.
    numero: 102,
    // Informa o produto fabricado nessa ordem.
    produto: "Suporte de motor",
    // Informa a quantidade solicitada nessa ordem.
    quantidade: 500,
    // Informa a máquina associada a essa ordem.
    maquina: "Prensa",
    // Define que a ordem está sendo produzida.
    status: "producao",
    urgente: false,
  // Encerra o objeto da segunda ordem.
  },
  // Inicia o objeto que representa a terceira ordem de produção.
  {
    // Define o número identificador da terceira ordem.
    numero: 103,
    // Informa o produto fabricado nessa ordem.
    produto: "Tampa plástica",
    // Informa a quantidade solicitada nessa ordem.
    quantidade: 1200,
    // Informa a máquina associada a essa ordem.
    maquina: "Injetora",
    // Define que a ordem foi concluída.
    status: "concluida",
    urgente: false,
  // Encerra o objeto da terceira ordem.
  },
  // Inicia o objeto que representa a quarta ordem de produção.
  {
    // Define o número identificador da quarta ordem.
    numero: 104,
    // Informa o produto fabricado nessa ordem.
    produto: "Flange de aço",
    // Informa a quantidade solicitada nessa ordem.
    quantidade: 80,
    // Informa a máquina associada a essa ordem.
    maquina: "Torno CNC",
    // Define que a ordem ainda aguarda o início da produção.
    status: "aguardando",
    urgente: false,
  // Encerra o objeto da quarta ordem.
  },
// Encerra a lista de ordens iniciais.
];

// Cria um mapa de rótulos legíveis para os códigos de status das ordens.
const NOMES = {
  // Associa o status aguardando ao texto que deve ser mostrado às pessoas.
  aguardando: "Aguardando",
  // Associa o status producao ao texto que deve ser mostrado às pessoas.
  producao: "Em produção",
  // Associa o status concluida ao texto que deve ser mostrado às pessoas.
  concluida: "Concluída",
// Encerra o mapa de nomes dos status.
};

// Define um evento de clique para alternar entre o modo normal e o modo TV.
botaoTv.addEventListener("click", () => {
  // Busca o elemento body, que receberá a classe visual do modo TV.
  const body = document.querySelector("body");
  // Adiciona a classe modo-tv se estiver ausente ou a remove se já estiver aplicada.
  body.classList.toggle("modo-tv");
  // Atualiza o texto do botão conforme o modo que ficou ativo.
  botaoTv.textContent = body.classList.contains("modo-tv")
    // Mostra uma opção para sair quando o modo TV estiver ativado.
    ? "Sair do Modo TV"
    // Mantém a opção de ativar o modo quando ele estiver desativado.
    : "Modo TV";
// Encerra o evento de clique do botão de modo TV.
});

// Percorre cada botão de filtro para configurar seu comportamento de clique.
botoes.forEach((btn) => {
  // Registra uma função para executar quando o botão atual for clicado.
  btn.addEventListener("click", (event) => {
    // Guarda o status indicado no atributo data-filtro do botão clicado.
    filtros = event.target.dataset.filtro;
    // Percorre os botões para remover o destaque selecionado de todos eles.
    botoes.forEach((b) => b.classList.remove("selecionado"));
    // Destaca visualmente o botão de filtro que recebeu o clique.
    btn.classList.add("selecionado");
    // Registra uma mensagem de depuração no console do navegador.
    console.log("aqui");
    // Atualiza a lista e o resumo aplicando o filtro escolhido.
    desenhar();
  // Encerra o evento de clique do botão de filtro.
  });
// Encerra a configuração dos eventos dos botões.
});

busca.addEventListener("input", desenhar);

// Define a função que cria e adiciona à página um cartão para uma ordem.
function criarOP(op) {
  // Cria um elemento de lista que representará o cartão da ordem.
  const item = document.createElement("li"); // Cria o elemento ainda fora da página.
  // Adiciona a classe base e uma classe específica para o status da ordem.
  item.classList.add("op", "status-" + op.status);
  // Cria um título HTML para identificar a ordem dentro do cartão.
  const titulo = document.createElement("h3");
  // Monta o texto do título usando o número e o nome do produto.
  titulo.textContent = "OP-" + op.numero + " · " + op.produto; // Preenche o título.
  // Teste do innerHTML (exercício 3.1): troquei textContent por innerHTML neste h3 e cadastrei <img src="x" onerror="alert('invadido')">. O navegador interpretou o texto como HTML, a imagem "x" falhou ao carregar e o onerror executou o alert('invadido'). Voltei para textContent, que mostra o texto exatamente como foi digitado.
  if (op.urgente) {
    const selo = document.createElement("span");
    selo.classList.add("selo-urgente");
    selo.textContent = "URGENTE";
    titulo.append(" ", selo);
  }
  // Insere o título dentro do elemento de lista do cartão.
  item.append(titulo); // Monta o cartão com seu título.
  if (op.status !== "concluida") {
    const avancar = document.createElement("button");
    avancar.textContent =
      op.status === "aguardando" ? "Iniciar produção" : "Concluir";
    avancar.addEventListener("click", () => {
      op.status = op.status === "aguardando" ? "producao" : "concluida";
      desenhar();
    });
    item.append(avancar);
  }
  if (op.status === "aguardando") {
    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";
    cancelar.addEventListener("click", () => {
      if (confirm("Cancelar a OP-" + op.numero + "?")) {
        ordens = ordens.filter((o) => o !== op);
        desenhar();
      }
    });
    item.append(cancelar);
  }
  // Insere o cartão na lista da página.
  lista.append(item); // Coloca o cartão no documento.
  // Devolve o elemento criado para permitir seu uso pelo código chamador.
  return item;
// Encerra a função de criação do cartão.
}

// Define a função que redesenha as ordens visíveis e atualiza as contagens.
function desenhar() {
  // Apaga o conteúdo atual da lista antes de montar a visualização atualizada.
  lista.textContent = "";
  // Zera a contagem de ordens aguardando para recalculá-la.
  aguardando = 0;
  // Zera a contagem de ordens concluídas para recalculá-la.
  concluido = 0;
  // Zera a contagem de ordens em produção para recalculá-la.
  producao = 0;
  // Escolhe todas as ordens ou somente as que correspondem ao filtro selecionado.
  ordensSelecionadas =
    // Quando o filtro for todas, usa a coleção completa de ordens.
    filtros === "todas"
      // Retorna a coleção original sem filtrar quando todas foi escolhido.
      ? ordens
      // Caso contrário, mantém somente ordens cujo status seja igual ao filtro.
      : ordens.filter((ordem) => ordem.status === filtros);
  const textoBusca = busca.value.toLowerCase();
  const visiveis = ordensSelecionadas.filter((op) =>
    op.produto.toLowerCase().includes(textoBusca)
  );
  // Exibe no console a coleção que será renderizada, para fins de depuração.
  console.log(ordensSelecionadas);
  // Percorre cada ordem para atualizar os contadores.
  ordens.forEach((op) => {
    // Verifica se a ordem atual está aguardando para incrementar sua contagem.
    if (op.status === "aguardando") {
      // Soma um à quantidade de ordens aguardando.
      aguardando++;
    // Encerra a condição que verifica ordens aguardando.
    }
    // Verifica se a ordem atual foi concluída.
    if (op.status === "concluida") {
      // Soma um à quantidade de ordens concluídas.
      concluido++;
    // Encerra a condição que verifica ordens concluídas.
    }
    // Verifica se a ordem atual está em produção.
    if (op.status === "producao") {
      // Soma um à quantidade de ordens em produção.
      producao++;
    // Encerra a condição que verifica ordens em produção.
    }
  // Encerra a repetição das ordens.
  });
  visiveis.forEach((op) => {
    if (op.urgente) {
      criarOP(op);
    }
  });
  visiveis.forEach((op) => {
    if (!op.urgente) {
      criarOP(op);
    }
  });
  vazia.hidden = visiveis.length > 0;
  // Inicia a montagem do texto apresentado no resumo do painel.
  const texto =
    // Informa quantas ordens estão sendo mostradas no filtro atual.
    "Mostrando "+visiveis.length+
    // Informa o total geral de ordens e inicia a quebra de linha do resumo.
    " de "+ordens.length+ " ordens no painel\n" +
    // Acrescenta o rótulo de aguardando e sua contagem.
    "Aguardando: " +
    // Acrescenta a quantidade de ordens aguardando.
    aguardando +
    // Separa a contagem seguinte e apresenta seu rótulo.
    " · Em produção: " +
    // Acrescenta a quantidade de ordens em produção.
    producao +
    // Separa a contagem final e apresenta seu rótulo.
    " · Concluídas: " +
    // Acrescenta a quantidade de ordens concluídas.
    concluido;

  // Exibe no parágrafo de resumo o texto montado acima.
  resumo.textContent = texto;
// Encerra a função que desenha a lista e o resumo.
}

// Registra o tratamento do envio do formulário de nova ordem.
formOp.addEventListener("submit", (event) => {
    // Impede que o navegador recarregue a página ao enviar o formulário.
    event.preventDefault();
    // Lê o produto digitado e remove espaços excedentes no início e no fim.
    const produto = document.querySelector("#produto").value.trim();
    // Lê a quantidade informada e converte o texto para número.
    const qtd = Number(document.querySelector("#quantidade").value);
    // Busca a lista suspensa que contém a máquina escolhida.
    const maquina = document.querySelector("#maquina");
    const urgente = document.querySelector("#urgente");
    // Busca o parágrafo reservado para mensagens de validação.
    const mensagem = document.querySelector("#mensagem");
    // Verifica se o produto está vazio ou se a quantidade não é positiva.
    if( produto === "" || qtd <= 0) {
        // Define o texto de orientação para corrigir os dados do formulário.
        const texto = "Informe o produto e uma quantidade maior que zero."
        // Torna visível a mensagem de validação.
        mensagem.hidden = false;
        // Escreve a orientação no elemento de mensagem.
        mensagem.textContent = texto;
    // Executa este ramo quando os dados passaram pela validação.
    } else {
        // Oculta a mensagem de validação, pois os dados estão válidos.
        mensagem.hidden = true;
        // Limpa qualquer texto de erro anterior.
        mensagem.textContent = "";
        // Adiciona um novo objeto de ordem ao final da coleção.
        ordens.push({
            // Gera o próximo número somando um ao número da última ordem.
            numero: proximoNumero,
            // Guarda no objeto o nome do produto informado.
            produto,
            // Guarda no objeto a quantidade convertida para número.
            quantidade: qtd,
            // Inicia toda ordem nova com status aguardando.
            status: "aguardando",
            // Guarda o valor selecionado no campo de máquina.
            maquina: maquina.value,
            urgente: urgente.checked
        // Encerra o objeto e a chamada que adiciona a ordem.
        });
        proximoNumero++;
        formOp.reset();
        document.querySelector("#produto").focus();
        // Atualiza os cartões e as contagens para incluir a nova ordem.
        desenhar();
    // Encerra a validação condicional dos dados.
    }

// Encerra o evento de envio do formulário.
});

// Faz a primeira renderização assim que este arquivo JavaScript é executado.
desenhar();