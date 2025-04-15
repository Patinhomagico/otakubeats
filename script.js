
let editingCardIndex = null;

// Função de login com usuário e senha
function login() {
  const user = prompt("Digite o usuário:");
  const pass = prompt("Digite a senha:");
  
  if (user === 'admin' && pass === 'admin') {
    alert("Login bem-sucedido!");
    document.getElementById('editor-panel').style.display = 'block'; // Exibe o painel de edição
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

// Exibe o painel com os campos preenchidos para o card clicado
function openEditor(cardIndex) {
  editingCardIndex = cardIndex;
  const card = document.querySelectorAll('.card')[cardIndex];
  document.getElementById('edit-title').value = card.querySelector('h3').innerText;
  document.getElementById('edit-text').value = card.querySelector('p').innerText;
  document.getElementById('edit-img').value = card.querySelector('img').src;
  document.getElementById('editor-form').style.display = 'block';
}

// Salva os dados do editor no card e atualiza localStorage
function saveCardEdits() {
  const cards = document.querySelectorAll('.card');
  const card = cards[editingCardIndex];
  card.querySelector('h3').innerText = document.getElementById('edit-title').value;
  card.querySelector('p').innerText = document.getElementById('edit-text').value;
  card.querySelector('img').src = document.getElementById('edit-img').value;

  // Atualiza localStorage
  const data = Array.from(cards).map(card => ({
    title: card.querySelector('h3').innerText,
    text: card.querySelector('p').innerText,
    img: card.querySelector('img').src
  }));
  localStorage.setItem('customCards', JSON.stringify(data));

  alert('Card atualizado!');
  document.getElementById('editor-form').style.display = 'none';
}

// Cancela a edição
function cancelEdit() {
  document.getElementById('editor-form').style.display = 'none';
}

// Carrega as edições salvas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('customCards'));
  if (data) {
    const cards = document.querySelectorAll('.card');
    data.forEach((entry, i) => {
      if (cards[i]) {
        cards[i].querySelector('h3').innerText = entry.title;
        cards[i].querySelector('p').innerText = entry.text;
        cards[i].querySelector('img').src = entry.img;
      }
    });
  }

  // Adiciona botão "Editar" em cada card (escondido inicialmente)
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    const editBtn = document.createElement('button');
    editBtn.innerText = '✏️ Editar Card';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => openEditor(i);
    editBtn.style.display = 'none'; // Esconde até o login ser realizado
    card.appendChild(editBtn);
  });
});

// Exibir o botão de login ao carregar
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-btn').style.display = 'block';
});

// Resetar edições
function resetEdits() {
  localStorage.removeItem('customCards');
  location.reload();
}
