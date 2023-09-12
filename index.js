
const resultsContainer = document.getElementById('results-container');
const loadingMessage = document.getElementById('loading-message');
let loading = false;
let page = 1;

async function fetchCards() {
    if (loading) return;
    loading = true;
    loadingMessage.style.display = 'block'; 

    const response = await fetch(`https://fakestoreapi.com/products?page=${page}`);
    const cardsData = await response.json();

    if (cardsData.length > 0) {
        cardsData.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card p-3 mb-3 bg-light  shimmer';
            cardElement.classList.add('loaded');
            cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.title}" class="img-fluid">
                <h4>${card.title.length > 20 ? card.title.slice(0, 20) + '...' : card.title}</h4>
                <p class="desc">${card.description.length > 100 ? card.description.slice(0, 100) + '...' : card.description}</p>
               <div style="display:flex ;justify-content:space-between;">
                <p><b>$${card.price.toFixed(2)}</b></p>
                <p>
                    <span  style="color: green; font-weight:bold">&#9733;</span>
                     ${card.rating.rate}
                </p>
               </div>
            `;
            cardElement.style.opacity = '0';
            resultsContainer.appendChild(cardElement);

            setTimeout(() => {
                cardElement.style.opacity = '1';
            }, 100);
        });
        page++;
        loading = false;
        loadingMessage.style.display = 'none'; 
    }
}

fetchCards();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchCards();
    }
});