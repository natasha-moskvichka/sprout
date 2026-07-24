const searchInput = document.querySelector('.search__input');
const btnSearch = document.querySelector('.btn__search');
const resultContainer = document.querySelector('.search__results');

const loadPlants = async () => {
    try {
        const response = await fetch('plants.json');

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        renderPlants(data);
    } catch (err) {
        console.log(err);
    }
}

const renderPlants = (plantsArray) => {
    resultContainer.innerHTML = '';
    plantsArray.forEach(plant => {
        console.log(plant)
        const cardHTML = `
            <article class="plant__card">
                <img src="${plant.img}" alt="${plant.name}" class="plant__img">
                <div class="plant__info">
                <h3 class="plant__title">${plant.name}</h3>
                <p class="plant__desc">${plant.desc}</p>
</div>
            </article>
        `;
        resultContainer.insertAdjacentHTML('beforeend', cardHTML);
    })
};

btnSearch.addEventListener('click', () => {
    loadPlants();
})
