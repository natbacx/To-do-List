let tarefas = buscarTarefas();

function adicionarTarefa() {
  const inputTarefa = document.getElementById("inputTarefa"); //Pega o campo de entrada (input)
  let tarefa = inputTarefa.value.trim(); //Pega o valor do que é digitado no input
  const mensagem = document.getElementById("mensagem"); //Pega o elemento onde a mensagem será exibida

  if (tarefa.trim() === "") {
    // Verifica se o campo de entrada está vazio ou contém apenas espaços
    let mensagemErro = "Por favor, digite uma tarefa!";
    mensagem.textContent = mensagemErro; //Exibe mensagem de erro de acordo com as condições
    mensagem.className = "mensagem_erro";
  } else {
    let mensagemSucesso = "Tarefa adicionada com sucesso!";
    mensagem.textContent = mensagemSucesso; // Exibe a mensagem de sucesso
    mensagem.className = "mensagem_sucesso"; // Adiciona a classe de sucesso para estilização

    tarefas.push(tarefa);
    salvarTarefas();
    exibirTarefas();
  }
  inputTarefa.value = ""; // Limpa o campo de entrada
}

function exibirTarefas() {
  const listaTarefas = document.getElementById("listaTarefas"); //Pega a lista de tarefas
  listaTarefas.innerHTML = ""; // Limpa a lista de tarefas antes de exibir as novas tarefas

  for (let i = 0; i < tarefas.length; i++) {
    let novaTarefa = document.createElement("li"); //Cria um novo elemento de lista (li) formato em lista

    let textoTarefa = document.createElement("span");
    textoTarefa.textContent = tarefas[i];
    textoTarefa.classList.add("texto-tarefa");

    // Container para os botões
    let botoesContainer = document.createElement("div");
    botoesContainer.classList.add("botoes-container");
    //Botão remover
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remover"; // Cria um botão para remover a tarefa
    removeButton.classList.add("remover");
    removeButton.onclick = () => removerTarefa(i);

    // Botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("editar");
    botaoEditar.onclick = () => editarTarefa(i);

    botoesContainer.appendChild(botaoEditar);
    botoesContainer.appendChild(removeButton);

    novaTarefa.appendChild(textoTarefa);
    novaTarefa.appendChild(botoesContainer);
    listaTarefas.appendChild(novaTarefa); // Adiciona o novo item de lista à lista de tarefas
  }
}

function removerTarefa(indice) {
  tarefas.splice(indice, 1);
  salvarTarefas();
  exibirTarefas();
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Tarefa removida com sucesso!";
  mensagem.className = "mensagem_sucesso";
}

function editarTarefa(indice) {
  let tarefaEditada = prompt("Edite sua tarefa:");
  if (tarefaEditada.trim() !== "") {
    tarefas[indice] = tarefaEditada;
    salvarTarefas();
    exibirTarefas();
  }
}

function limparLista() {
  const mensagem = document.getElementById("mensagem");
  if (tarefas.length > 0) {
    // Verifica se a lista de tarefas está vazia
    tarefas.length = 0;
    salvarTarefas();
    exibirTarefas();
    mensagem.textContent = "Lista de tarefas limpa com sucesso!";
    mensagem.className = "mensagem_sucesso";
  } else {
    mensagem.textContent = "Nenhuma tarefa para limpar!";
    mensagem.className = "mensagem_erro";
  }
}
function salvarTarefas() {
  const tarefasJSON = JSON.stringify(tarefas); // Converte o array de tarefas para uma string JSON
  localStorage.setItem("tarefas", tarefasJSON); // Salva a string JSON no localStorage
}
function buscarTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}
tarefas = buscarTarefas();
exibirTarefas();
