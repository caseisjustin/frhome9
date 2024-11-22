
const categories = document.querySelectorAll('.catgr_nav_item');
const cardContainer = document.querySelector('.cards');
const showMoreButton = document.querySelector('.ten_more_btn');
let currentCategory = '';
let products = [];
let displayedCount = 0;

async function fetchData(category = '') {
    try {
        const url = category
            ? `https://dummyjson.com/products/category/${category}`
            : 'https://dummyjson.com/products';
        const response = await fetch(url);
        const data = await response.json();
        products = data.products;
        displayedCount = 0;
        console.log(products)
        renderCards();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderCards() {
    cardContainer.innerHTML = '';
    const toDisplay = products.slice(displayedCount, displayedCount + 10);
    toDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
                <img src="${product.images[0] || ''}" alt="PHOTO">
                <h4>${product.name || 'Name'}</h4>
                <p>${product.description || 'Lorem ipsum dolor sit amet consectetur adipisicing.'}</p>
                <b>${product.price || 'Price'}</b>
                <button>Buy Now</button>
            `;
        cardContainer.appendChild(card);
    });
    displayedCount += toDisplay.length;
    showMoreButton.style.display = displayedCount >= products.length ? 'none' : 'block';
}

categories.forEach(category => {
    category.addEventListener('click', (e) => {
        currentCategory = e.target.textContent.trim();
        fetchData(currentCategory);
    });
});

showMoreButton.addEventListener('click', () => {
    renderCards();
});

fetchData();
