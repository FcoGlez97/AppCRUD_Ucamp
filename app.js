//DOM
const form = document.getElementById('article-form');
const articleList = document.getElementById('article-list');
const articleNameInput = document.getElementById('article-name');
const articlePriceInput = document.getElementById('article-price');

// Carga Inicial
document.addEventListener('DOMContentLoaded', loadArticles);

// Obtener artículos
function getArticles() {
    const articles = localStorage.getItem('articles');
    return articles ? JSON.parse(articles) : [];
}

// Guardar artículos
function saveArticles(articles) {
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Cargar los artículos al iniciar
function loadArticles() {
    const articles = getArticles();
    articleList.innerHTML = '';  // Limpiar el listado
    articles.forEach(article => addArticleToList(article));
}

// Agregar artículo
function addArticleToList(article) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${article.name} - $${article.price}</span>
        <div>
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
        </div>
    `;

    // Botones editar y eliminar
    li.querySelector('.edit').addEventListener('click', () => editArticle(article, li));
    li.querySelector('.delete').addEventListener('click', () => deleteArticle(article, li));
    
    articleList.appendChild(li);
}

// Crear artículos
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = articleNameInput.value.trim();
    const price = parseFloat(articlePriceInput.value.trim());

    if (!name || isNaN(price)) {
        alert('Por favor ingresa un nombre y un precio válidos.');
        return;
    }

    const articles = getArticles();
    const newArticle = { name, price };
    
    articles.push(newArticle);
    saveArticles(articles);

    addArticleToList(newArticle);

    // Limpia formulario
    articleNameInput.value = '';
    articlePriceInput.value = '';
});

// Editar artículo
function editArticle(article, li) {
    const confirmation = confirm('¿Deseas editar este artículo?');
    if (confirmation) {
        const newName = prompt('Nuevo nombre:', article.name);
        const newPrice = prompt('Nuevo precio:', article.price);

        if (newName && !isNaN(parseFloat(newPrice))) {
            article.name = newName;
            article.price = parseFloat(newPrice);

            const articles = getArticles();
            const index = articles.findIndex(a => a.name === article.name && a.price === article.price);
            articles[index] = article;
            saveArticles(articles);

            li.querySelector('span').textContent = `${article.name} - $${article.price}`;
        } else {
            alert('Entrada inválida');
        }
    }
}

// Eliminar artículo
function deleteArticle(article, li) {
    const confirmation = confirm('¿Deseas eliminar este artículo?');
    if (confirmation) {
        let articles = getArticles();
        articles = articles.filter(a => a.name !== article.name || a.price !== article.price);
        saveArticles(articles);
        li.remove();
    }
}
