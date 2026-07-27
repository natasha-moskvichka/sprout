const searchInput = document.querySelector('.search__input');
const btnSearch = document.querySelector('.btn__search');
const resultContainer = document.querySelector('.search__results');
const btnQuiz = document.querySelector('.btn__quiz');
const btnCancel = document.querySelector('.modal__btn-cancel');
const btnSave = document.querySelector('.modal__btn-save');
const modal = document.querySelector('.modal');
const btnToggleTheme = document.querySelector('.btn__toggle-theme');
const savedTheme = localStorage.getItem('sproutTheme');

let allPlants = [];

if (savedTheme !== null && savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    btnToggleTheme.style.backgroundImage = 'url("images/sun.png")';
}

const renderPlants = (plantsArray) => {
    resultContainer.innerHTML = '';

    if (plantsArray.length === 0) {
        resultContainer.innerHTML = '<p class="search__empty">Под такие условия растений не найдено 🌿</p>'
        return;
    }

    plantsArray.forEach(plant => {
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

const loadPlants = async () => {
    try {
        const response = await fetch('plants.json');

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        allPlants = data;

        renderPlants(data);
    } catch (err) {
        console.log(err);
    }
}

btnSearch.addEventListener('click', () => {
    const searchTerm = searchInput.value;

    const filtered = allPlants.filter(plant =>
        plant.name && plant.name.toUpperCase().includes(searchTerm.toUpperCase())
    );

    renderPlants(filtered);

});

btnQuiz.addEventListener('click', () => {
    modal.classList.remove('hidden');
})

btnCancel.addEventListener('click', () => {
    modal.classList.add('hidden');
})

btnSave.addEventListener('click', () => {
    const checkedEnvironment = document.querySelector('input[name="environment"]:checked');
    const checkedPets = document.querySelector('input[name="pets"]:checked');

    const filtered = allPlants.filter(plant => plant.light === checkedEnvironment.value && plant.pets === checkedPets.value)

    renderPlants(filtered);
    modal.classList.add('hidden');
})

btnToggleTheme.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';

    if (currentTheme === 'light') {
       newTheme = 'dark';
       btnToggleTheme.style.backgroundImage = 'url("images/moon.png")'
    } else  {
        newTheme = 'light';
        btnToggleTheme.style.backgroundImage = 'url("images/sun.png")'
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sproutTheme', newTheme);
})

loadPlants();
