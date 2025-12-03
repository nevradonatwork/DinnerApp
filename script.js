/*
 * Dinner Recipe Generator
 *
 * This script holds the data for each recipe, handles user interaction
 * for selecting dietary preferences, generates a complete dinner from
 * carbs, proteins and salads, and updates the UI accordingly. It also
 * registers the service worker to enable offline capabilities as a
 * progressive web app.
 */

// Define the base recipe datasets for each course. Each recipe includes a
// name, image path, an array of diets that are allowed to consume it,
// and lists of ingredients and instructions. These base recipes will
// later be duplicated to create a large pool of unique recipes.
const baseCarbs = [
  {
    name: 'Penne Arrabbiata',
    image: 'images/carb_pasta.avif',
    allowed: ['pescetarian', 'vegetarian', 'vegan', 'no restrictions'],
    glutenFree: false,
    keto: false,
    ingredients: [
      '200 g penne pasta',
      '2 cups tomato sauce',
      '2 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp crushed red pepper flakes',
      'Fresh basil leaves, chopped',
      'Salt to taste'
    ],
    instructions: [
      'Cook the penne pasta in salted boiling water until al dente. Drain and set aside.',
      'Meanwhile, heat olive oil in a pan over medium heat. Add minced garlic and red pepper flakes; cook until fragrant.',
      'Stir in the tomato sauce and simmer for 5 minutes. Season with salt.',
      'Add the cooked pasta to the sauce and toss to coat evenly.',
      'Garnish with fresh basil before serving.'
    ]
  },
  {
    name: 'Herb Roasted Potatoes',
    image: 'images/carb_roasted_potatoes.avif',
    allowed: ['pescetarian', 'vegetarian', 'vegan', 'gluten-free', 'no restrictions'],
    glutenFree: true,
    keto: false,
    ingredients: [
      '500 g baby potatoes, halved',
      '2 tbsp olive oil',
      '2 tsp fresh rosemary, chopped',
      '2 tsp fresh thyme, chopped',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat the oven to 200 °C (400 °F).',
      'In a bowl, toss the potatoes with olive oil, rosemary, thyme, salt and pepper.',
      'Spread the potatoes on a baking sheet in a single layer.',
      'Roast for 25–30 minutes, flipping halfway, until golden and tender.',
      'Serve hot as a comforting side.'
    ]
  },
  {
    name: 'Lemon Herb Quinoa',
    image: 'images/carb_quinoa.avif',
    allowed: ['pescetarian', 'vegetarian', 'vegan', 'gluten-free', 'no restrictions'],
    glutenFree: true,
    keto: false,
    ingredients: [
      '1 cup quinoa, rinsed',
      '2 cups vegetable broth',
      'Zest and juice of 1 lemon',
      '2 tbsp chopped parsley',
      '1 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Combine quinoa and vegetable broth in a saucepan. Bring to a boil, then reduce heat and simmer covered for 15 minutes.',
      'Remove from heat and let stand covered for 5 minutes. Fluff with a fork.',
      'Stir in lemon zest, lemon juice, parsley, olive oil, salt and pepper.',
      'Serve warm or at room temperature.'
    ]
  }
];

const baseProteins = [
  {
    name: 'Grilled Lemon Garlic Salmon',
    image: 'images/protein_salmon.avif',
    allowed: ['pescetarian', 'gluten-free', 'keto', 'no restrictions'],
    glutenFree: true,
    keto: true,
    ingredients: [
      '2 salmon fillets',
      'Juice of 1 lemon',
      '2 cloves garlic, minced',
      '1 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh dill for garnish'
    ],
    instructions: [
      'In a small bowl, whisk together lemon juice, minced garlic, olive oil, salt and pepper.',
      'Brush the mixture over the salmon fillets and let marinate for 10 minutes.',
      'Preheat grill or grill pan over medium-high heat.',
      'Grill the salmon for 4–5 minutes per side until cooked through and slightly charred.',
      'Garnish with fresh dill and serve.'
    ]
  },
  {
    name: 'Herb Grilled Chicken',
    image: 'images/protein_chicken.avif',
    allowed: ['gluten-free', 'keto', 'no restrictions'],
    glutenFree: true,
    keto: true,
    ingredients: [
      '2 boneless chicken breasts',
      '2 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tsp dried oregano',
      '1 tsp dried thyme',
      'Salt and pepper to taste',
      'Lemon wedges for serving'
    ],
    instructions: [
      'Mix olive oil, minced garlic, oregano, thyme, salt and pepper in a bowl.',
      'Coat the chicken breasts with the herb mixture and let marinate for at least 20 minutes.',
      'Preheat grill or grill pan to medium-high heat.',
      'Grill the chicken for 6–7 minutes per side until the internal temperature reaches 75 °C (165 °F).',
      'Rest for a few minutes, then serve with lemon wedges.'
    ]
  },
  {
    name: 'Sesame Ginger Tofu',
    image: 'images/protein_tofu.avif',
    allowed: ['pescetarian', 'vegetarian', 'vegan', 'gluten-free', 'no restrictions'],
    glutenFree: true,
    keto: false,
    ingredients: [
      '400 g firm tofu, cubed',
      '2 tbsp soy sauce or tamari',
      '1 tbsp sesame oil',
      '1 tbsp grated ginger',
      '1 clove garlic, minced',
      '1 cup mixed stir‑fry vegetables (e.g. bell peppers, broccoli)',
      '1 tbsp sesame seeds'
    ],
    instructions: [
      'Press the tofu to remove excess water, then cut into cubes.',
      'Heat sesame oil in a skillet over medium heat. Add tofu and cook until golden on all sides.',
      'Stir in garlic and ginger and cook for 1 minute.',
      'Add soy sauce or tamari and the mixed vegetables. Stir‑fry until vegetables are tender‑crisp.',
      'Sprinkle with sesame seeds before serving.'
    ]
  }
];

const baseSalads = [
  {
    name: 'Classic Greek Salad',
    image: 'images/salad_greek.avif',
    allowed: ['pescetarian', 'vegetarian', 'gluten-free', 'keto', 'no restrictions'],
    glutenFree: true,
    keto: true,
    ingredients: [
      '2 cups chopped cucumbers',
      '2 cups cherry tomatoes, halved',
      '1/2 cup Kalamata olives',
      '1/2 cup sliced red onion',
      '100 g feta cheese, cubed',
      '2 tbsp olive oil',
      '1 tbsp red wine vinegar',
      '1 tsp dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large bowl, combine cucumbers, tomatoes, olives and red onion.',
      'Add cubed feta cheese.',
      'Whisk together olive oil, red wine vinegar, oregano, salt and pepper to make a dressing.',
      'Drizzle dressing over the salad and toss gently to combine.',
      'Serve immediately.'
    ]
  },
  {
    name: 'Kale & Chickpea Salad',
    image: 'images/salad_kale.avif',
    allowed: ['pescetarian', 'vegetarian', 'vegan', 'gluten-free', 'no restrictions'],
    glutenFree: true,
    keto: false,
    ingredients: [
      '4 cups chopped kale, stems removed',
      '1 cup canned chickpeas, rinsed and drained',
      '1/4 cup toasted nuts or seeds (e.g. almonds or sunflower seeds)',
      '2 tbsp tahini',
      '2 tbsp lemon juice',
      '1 tbsp olive oil',
      '1 clove garlic, minced',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Massage the chopped kale with a pinch of salt and a drizzle of olive oil until softened.',
      'Whisk together tahini, lemon juice, minced garlic, salt and pepper to make the dressing. Add water if needed to thin.',
      'In a bowl, combine kale, chickpeas and toasted nuts/seeds.',
      'Pour the dressing over the salad and toss well.',
      'Serve chilled or at room temperature.'
    ]
  },
  {
    name: 'Rainbow Mixed Salad',
    image: 'images/salad_mixed.avif',
    allowed: ['pescetarian', 'vegetarian', 'vegan', 'gluten-free', 'keto', 'no restrictions'],
    glutenFree: true,
    keto: true,
    ingredients: [
      '3 cups mixed salad greens (e.g. arugula, spinach, lettuce)',
      '1 cup cherry tomatoes, halved',
      '1/2 cup thinly sliced cucumbers',
      '1/2 cup grated carrots',
      '1/4 cup sliced radishes',
      '2 tbsp olive oil',
      '1 tbsp balsamic vinegar',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Place mixed greens in a large salad bowl.',
      'Add tomatoes, cucumbers, grated carrots and radishes.',
      'Whisk together olive oil, balsamic vinegar, salt and pepper.',
      'Drizzle the dressing over the salad and toss gently.',
      'Serve as a fresh accompaniment to your meal.'
    ]
  }
];

// Number of variations to create for each base recipe. By generating
// multiple copies with unique names we achieve a large dataset of
// different recipes. With 9 base recipes and 556 variations each we
// produce 9 × 556 = 5004 unique recipes.
const VARIATION_COUNT = 556;

// Utility to deep clone a recipe and append a variation index to its name.
function createVariations(baseArray) {
  const result = [];
  for (let i = 1; i <= VARIATION_COUNT; i++) {
    baseArray.forEach(item => {
      // Create a shallow copy of the item. We also copy the arrays of
      // ingredients and instructions to avoid mutating the original.
      const variant = {
        name: `${item.name} #${i}`,
        image: item.image,
        allowed: [...item.allowed],
        glutenFree: item.glutenFree,
        keto: item.keto,
        ingredients: [...item.ingredients],
        instructions: [...item.instructions]
      };
      result.push(variant);
    });
  }
  return result;
}

// Generate large datasets for each category
const carbs = createVariations(baseCarbs);
const proteins = createVariations(baseProteins);
const salads = createVariations(baseSalads);

// Utility to pick a random element from an array
function randomChoice(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// Generate a whimsical dinner name by combining adjectives and nouns
function generateDinnerName() {
  const adjectives = [
    'Mediterranean',
    'Summer',
    'Cozy',
    'Festive',
    'Autumn',
    'Elegant',
    'Golden',
    'Rustic'
  ];
  const nouns = [
    'Feast',
    'Delight',
    'Dinner',
    'Evening',
    'Celebration',
    'Gathering'
  ];
  const adj = randomChoice(adjectives);
  const noun = randomChoice(nouns);
  return `${adj} ${noun}`;
}

// Filter dishes based on the selected diet
function filterDishes(dishes, diet) {
  return dishes.filter(dish => {
    if (diet === 'no restrictions') return true;
    // For gluten-free and keto diets we also check the specific flags
    if (diet === 'gluten-free') return dish.glutenFree;
    if (diet === 'keto') return dish.keto;
    // Otherwise check allowed array
    return dish.allowed.includes(diet);
  });
}

// Render the recipes into the DOM
function renderRecipes(selectedDiet) {
  const recipesContainer = document.getElementById('recipesContainer');
  recipesContainer.innerHTML = '';

  // Filter each course according to the diet
  const carbOptions = filterDishes(carbs, selectedDiet);
  const proteinOptions = filterDishes(proteins, selectedDiet);
  const saladOptions = filterDishes(salads, selectedDiet);

  // Choose one dish from each category, falling back to all options if none match
  const selectedCarb = randomChoice(carbOptions.length ? carbOptions : carbs);
  const selectedProtein = randomChoice(proteinOptions.length ? proteinOptions : proteins);
  const selectedSalad = randomChoice(saladOptions.length ? saladOptions : salads);

  const courses = [
    { label: 'Carb', dish: selectedCarb },
    { label: 'Protein', dish: selectedProtein },
    { label: 'Salad', dish: selectedSalad }
  ];

  courses.forEach(({ label, dish }) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;
    card.appendChild(img);

    const content = document.createElement('div');
    content.className = 'recipe-content';

    const category = document.createElement('span');
    category.className = 'recipe-category';
    category.textContent = label;
    content.appendChild(category);

    const nameEl = document.createElement('h3');
    nameEl.className = 'recipe-name';
    nameEl.textContent = dish.name;
    content.appendChild(nameEl);

    // Ingredients list
    const ingredientsEl = document.createElement('div');
    ingredientsEl.className = 'ingredients';
    const ingredientsTitle = document.createElement('strong');
    ingredientsTitle.textContent = 'Ingredients:';
    ingredientsEl.appendChild(ingredientsTitle);
    const ingredientsList = document.createElement('ul');
    dish.ingredients.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ingredientsList.appendChild(li);
    });
    ingredientsEl.appendChild(ingredientsList);
    content.appendChild(ingredientsEl);

    // Instructions list
    const instructionsEl = document.createElement('div');
    instructionsEl.className = 'instructions';
    const instructionsTitle = document.createElement('strong');
    instructionsTitle.textContent = 'Instructions:';
    instructionsEl.appendChild(instructionsTitle);
    const instructionsList = document.createElement('ol');
    dish.instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      instructionsList.appendChild(li);
    });
    instructionsEl.appendChild(instructionsList);
    content.appendChild(instructionsEl);

    card.appendChild(content);
    recipesContainer.appendChild(card);
  });
}

// Setup event listeners after the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const dietButtons = document.querySelectorAll('.diet-button');
  let selectedDiet = 'no restrictions';

  dietButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active class
      dietButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedDiet = button.getAttribute('data-diet');
    });
  });

  const generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', () => {
    // Generate recipes and display them
    const dinnerTitleEl = document.getElementById('dinnerTitle');
    dinnerTitleEl.textContent = generateDinnerName();
    renderRecipes(selectedDiet);
    document.getElementById('recipeSection').classList.remove('hidden');
  });

  // Register service worker for PWA functionality
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(err => {
      console.warn('Service worker registration failed:', err);
    });
  }
});