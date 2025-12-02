
/* -----------------------------------------
   34 ALUNOS + 8 DISCIPLINAS (PADRÃO SEDUC)
----------------------------------------- */

let alunos = [];

function gerarAlunos() {
    const nomes = [
        "Ana Beatriz", "Carlos Eduardo", "Mariana Alves", "Pedro Henrique", "Lucas Silva",
        "João Paulo", "Fernanda Costa", "Gustavo Rocha", "Bruna Martins", "Juliana Ramos",
        "Felipe Torres", "Amanda Oliveira", "Rafael Dias", "Larissa Pereira", "Daniel Santos",
        "Camila Moreira", "Tiago Mendes", "Patrícia Souza", "Henrique Lima", "Nathalia Bernardes",
        "Rodrigo Barros", "Marcela Nunes", "Eduardo Araújo", "Bianca Vieira", "Leo Dantas",
        "Gabriel Pires", "Evelyn Monteiro", "Hugo Lopes", "Vitória Sena", "Alessandra Gomes",
        "Cauã Ribeiro", "Samuel Duarte", "Isabela Farias", "André Santana"
    ];

    nomes.forEach(n => {
        alunos.push({
            nome: n,
            notas: {
                portugues: nota(),
                matematica: nota(),
                historia: nota(),
                geografia: nota(),
                ciencias: nota(),
                ingles: nota(),
                artes: nota(),
                edf: nota()
            }
        });
    });
}

function nota() { return Math.floor(Math.random() * 5) + 6; }

gerarAlunos();

let usuarioADM = false;

/* -----------------------------------------
   LOGIN
----------------------------------------- */
function login() {
    const nome = document.getElementById("username").value.trim();

    if (nome === "Pedro") {
        usuarioADM = true;
    }

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("painel").style.display = "block";
    document.getElementById("tableWrapper").style.display = "block";

    document.getElementById("tipoAcesso").innerHTML =
        usuarioADM ?
        "<b>Acesso: Administrador</b> – Edição liberada" :
        "<b>Acesso: Usuário</b> – Visualização apenas";

    carregarTabela();
}

/* -----------------------------------------
   CALCULAR MÉDIA
----------------------------------------- */
function calcularMedia(obj) {
    let soma = 0;
    let qtd = 0;
    for (let d in obj) {
        soma += obj[d];
        qtd++;
    }
    return (soma / qtd).toFixed(1);
}

/* -----------------------------------------
   RENDERIZAR TABELA
----------------------------------------- */
function carregarTabela() {
    const corpo = document.querySelector("#tabelaAlunos tbody");
    corpo.innerHTML = "";

    alunos.forEach((aluno, index) => {
        const m = calcularMedia(aluno.notas);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.notas.portugues}</td>
            <td>${aluno.notas.matematica}</td>
            <td>${aluno.notas.historia}</td>
            <td>${aluno.notas.geografia}</td>
            <td>${aluno.notas.ciencias}</td>
            <td>${aluno.notas.ingles}</td>
            <td>${aluno.notas.artes}</td>
            <td>${aluno.notas.edf}</td>
            <td><b>${m}</b></td>
        `;

        if (usuarioADM) {
            tr.onclick = () => editarAluno(index);
        }

        corpo.appendChild(tr);
    });
}

/* -----------------------------------------
   EDITAR (SÓ ADM)
----------------------------------------- */
function editarAluno(i) {
    const aluno = alunos[i];

    const novoNome = prompt("Editar nome:", aluno.nome);
    if (!novoNome) return;

    const disciplinas = Object.keys(aluno.notas);

    disciplinas.forEach(d => {
        const nova = prompt(`Nota de ${d}:`, aluno.notas[d]);
        if (nova) aluno.notas[d] = Number(nova);
    });

    aluno.nome = novoNome;
    carregarTabela();
}

