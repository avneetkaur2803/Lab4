// Reference to header and section elements
const header = document.querySelector('header');
const section = document.querySelector('#flavors');
const calorieFilterInput = document.getElementById('calorieFilter');
const applyFilterButton = document.getElementById('applyFilter');

async function populate() {
    const url = './js/i-scream.json'; // Local JSON file path
    const response = await fetch(url);
    const jsonObj = await response.json();

    populateHeader(jsonObj);
    showFlavors(jsonObj.topFlavors);

    // Add event listener for filtering
    applyFilterButton.addEventListener('click', () => {
        const maxCalories = Number(calorieFilterInput.value);
        const filteredFlavors = jsonObj.topFlavors.filter(flavor => flavor.calories <= maxCalories);
        section.innerHTML = ''; // Clear the section
        showFlavors(filteredFlavors);
    });
}

function populateHeader(jsonObj) {
    const h1 = document.createElement('h1');
    h1.textContent = `${jsonObj.companyName} - Top Ice Cream Picks!`;

    const p = document.createElement('p');
    p.textContent = `Founded in ${jsonObj.established}, headquartered in ${jsonObj.headOffice}.`;

    header.appendChild(h1);
    header.appendChild(p);
}

function showFlavors(flavors) {
    flavors.forEach(flavor => {
        const article = document.createElement('article');

        const h2 = document.createElement('h2');
        h2.textContent = flavor.name;

        const img = document.createElement('img');
        img.src = `./images/${flavor.image}`;
        img.alt = flavor.name;

        const type = document.createElement('p');
        type.textContent = `Type: ${flavor.type}`;

        const calories = document.createElement('p');
        calories.textContent = `Calories: ${flavor.calories}`;

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.textContent = 'Ingredients:';

        const ul = document.createElement('ul');
        flavor.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ul.appendChild(li);
        });

        article.appendChild(h2);
        article.appendChild(img);
        article.appendChild(type);
        article.appendChild(calories);
        article.appendChild(ingredientsTitle);
        article.appendChild(ul);
        section.appendChild(article);
    });
}

populate();

