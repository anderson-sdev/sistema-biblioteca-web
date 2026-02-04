const form = document.getElementById("formLivro");
const lista = document.getElementById("listaLivros");

let livros = JSON.parse(localStorage.getItem("livros")) || [];

/* ---------- Utilitários ---------- */

function salvarLocalStorage() {
  localStorage.setItem("livros", JSON.stringify(livros));
}

function limparFormulario() {
  form.reset();
}

/* ---------- Renderização ---------- */

function renderizarLivros(listaRender = livros) {
  lista.innerHTML = "";

  if (listaRender.length === 0) {
    lista.innerHTML = "<li>Nenhum livro cadastrado.</li>";
    return;
  }

  listaRender.forEach(livro => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${livro.titulo}</strong><br>
      Código: ${livro.codigo}<br>
      Autor: ${livro.autor}<br>
      Área: ${livro.area}<br>
      Ano: ${livro.ano}<br>
      Editora: ${livro.editora}
    `;

    lista.appendChild(li);
  });
}

/* ---------- Cadastro ---------- */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const livro = {
    codigo: Number(document.getElementById("codigo").value),
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    area: document.getElementById("area").value,
    ano: Number(document.getElementById("ano").value),
    editora: document.getElementById("editora").value
  };

  const codigoExiste = livros.some(l => l.codigo === livro.codigo);
  if (codigoExiste) {
    alert("Código já cadastrado!");
    return;
  }

  livros.push(livro);
  salvarLocalStorage();
  renderizarLivros();
  limparFormulario();
});

/* ---------- Busca ---------- */

function buscarLivro() {
  const codigo = Number(document.getElementById("buscaCodigo").value);

  if (!codigo) {
    renderizarLivros();
    return;
  }

  const resultado = livros.filter(l => l.codigo === codigo);
  renderizarLivros(resultado);
}

/* ---------- Ordenação ---------- */

function ordenarPorAno() {
  livros.sort((a, b) => a.ano - b.ano);
  salvarLocalStorage();
  renderizarLivros();
}

/* ---------- Inicialização ---------- */

renderizarLivros();


function excluirLivro(codigo) {
  const confirmacao = confirm("Tem certeza que deseja excluir este livro?");

  if (!confirmacao) {
    return;
  }

  livros = livros.filter(livro => livro.codigo !== codigo);

  salvarLocalStorage();
  renderizarLivros();
}

