const tarefas = [];
let tarefaEditando = null;

const form = document.querySelector("#formTarefa");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const mensagemErro = document.querySelector("#mensagemErro");

if (!form || !input || !lista || !mensagemErro) {
    console.error('Elementos necessários não encontrados no DOM. Verifique os IDs em index.html');
}

function validarTarefa(texto) {
    if (texto === "") {
        mensagemErro.textContent = "Digite uma tarefa válida.";
        return false;
    }

    mensagemErro.textContent = "";
    return true;
}

function renderTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.className = "tarefa-item";

        const span = document.createElement("span");
        span.textContent = tarefa;
        span.className = "tarefa-texto";
        li.appendChild(span);

        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";

        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.className = "btn btn-editar";
        editarBtn.type = "button";
        editarBtn.addEventListener("click", () => iniciarEdicao(index));

        const excluirBtn = document.createElement("button");
        excluirBtn.textContent = "Excluir";
        excluirBtn.className = "btn btn-excluir";
        excluirBtn.type = "button";
        excluirBtn.addEventListener("click", () => excluirTarefa(index));

        botoes.appendChild(editarBtn);
        botoes.appendChild(excluirBtn);
        li.appendChild(botoes);

        lista.appendChild(li);
    });
}

function adicionarTarefa(texto) {
    tarefas.push(texto);
    renderTarefas();
}

function editarTarefa(index, novoTexto) {
    tarefas[index] = novoTexto;
    tarefaEditando = null;
    form.querySelector("button").textContent = "Adicionar";
    renderTarefas();
}

function iniciarEdicao(index) {
    tarefaEditando = index;
    input.value = tarefas[index];
    input.focus();
    form.querySelector("button").textContent = "Salvar";
}

function excluirTarefa(index) {
    tarefas.splice(index, 1);
    if (tarefaEditando !== null && tarefaEditando === index) {
        tarefaEditando = null;
        form.querySelector("button").textContent = "Adicionar";
        input.value = "";
    }
    renderTarefas();
}

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const texto = input.value.trim();
        if (!validarTarefa(texto)) {
            return;
        }

        if (tarefaEditando !== null) {
            editarTarefa(tarefaEditando, texto);
        } else {
            adicionarTarefa(texto);
        }

        input.value = "";
    });
}
