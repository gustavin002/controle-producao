let ordens = [
    { numero: 101, produto: "Eixo de transmissão", quantidade: 200, maquina: "Torno CNC", status: "aguardando" },
    { numero: 102, produto: "Suporte de motor", quantidade: 500, maquina: "Prensa", status: "producao" },
    { numero: 103, produto: "Tampa plástica", quantidade: 1200, maquina: "Injetora", status: "concluida" },
    { numero: 104, produto: "Flange de aço", quantidade: 80, maquina: "Torno CNC", status: "aguardando" }
  ]
  
  const NOMES = { aguardando: "Aguardando", producao: "Em produção", concluida: "Concluída" }
  
  const lista = document.querySelector("#lista")
  const resumo = document.querySelector("#resumo")
  const botaoTv = document.querySelector("#modo-tv")
  
  const criarOP = (op) => {
    const item = document.createElement("li")
    item.classList.add("op", "status-" + op.status)
  
    const titulo = document.createElement("h3")
    titulo.textContent = "OP-" + op.numero + " · " + op.produto
  
    const detalhes = document.createElement("p")
    detalhes.textContent = op.quantidade + " peças · " + op.maquina + " · " + NOMES[op.status]
  
    item.append(titulo, detalhes)
    return item
  }
  
  const desenhar = () => {
    lista.textContent = ""
  
    let aguardando = 0
    let producao = 0
    let concluidas = 0
  
    ordens.forEach((op) => {
      lista.append(criarOP(op))
  
      if (op.status === "aguardando") aguardando++
      else if (op.status === "producao") producao++
      else if (op.status === "concluida") concluidas++
    })
  
    resumo.textContent =
      ordens.length + " ordens no painel\n" +
      "Aguardando: " + aguardando + " · Em produção: " + producao + " · Concluídas: " + concluidas
  }
  
  botaoTv.addEventListener("click", () => {
    const body = document.querySelector("body")
    body.classList.toggle("modo-tv")
    botaoTv.textContent = body.classList.contains("modo-tv") ? "Sair do modo TV" : "Modo TV"
  })
  
  desenhar()