const tarefas = [];

const form = document.querySelector("#formTarefa");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const mensagemErro = document.querySelector("#mensagemErro");

// Defensive: ensure required DOM elements exist before attaching handlers
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
    lista.textContent = "";

    for (let i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li");
        li.textContent = tarefas[i];
        lista.appendChild(li);
    }
}

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // normalize input
        const texto = input.value.trim();

        if (!validarTarefa(texto)) {
            return;
        }

        tarefas.push(texto);

        renderTarefas();

        input.value = "";
    });
}