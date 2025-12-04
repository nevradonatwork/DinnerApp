// Temel listeler. bunları büyüterek kombinasyon sayısını artırabilirsin
const carbs = [
  { name: "Buttered pasta", image: "./images/carb_pasta.avif" },
  { name: "Garlic quinoa", image: "./images/carb_quinoa.avif" },
  { name: "Roasted potatoes", image: "./images/carb_roasted_patatoes.avif" },
  { name: "Brown rice", image: "./images/carb_quinoa.avif" },
  { name: "Herby couscous", image: "./images/carb_pasta.avif" }
];

const proteins = [
  { name: "Grilled chicken breast", image: "./images/protein_chicken.avif" },
  { name: "Oven baked salmon", image: "./images/protein_salmon.avif" },
  { name: "Crispy tofu cubes", image: "./images/protein_tofu.avif" },
  { name: "Chicken thighs", image: "./images/protein_chicken.avif" },
  { name: "Pan seared salmon", image: "./images/protein_salmon.avif" }
];

const salads = [
  { name: "Greek salad", image: "./images/salad_greek.avif" },
  { name: "Kale salad", image: "./images/salad_kale.avif" },
  { name: "Mixed green salad", image: "./images/salad_mixed.avif" },
  { name: "Tomato and cucumber salad", image: "./images/salad_mixed.avif" },
  { name: "Lemon dressed kale", image: "./images/salad_kale.avif" }
];

// Ek kombinasyon katmanları
const cookingStyles = [
  "simple weeknight style",
  "Mediterranean style",
  "high protein style",
  "low effort lazy style",
  "Sunday family dinner style",
  "light and fresh style",
  "comfort food style",
  "quick 15 minute style",
  "oven only. no frying",
  "one pan style"
];

const sauces = [
  "garlic yogurt sauce",
  "tahini lemon dressing",
  "creamy mushroom sauce",
  "tomato basil sauce",
  "soy ginger glaze",
  "honey mustard dressing",
  "olive oil and lemon",
  "pesto sauce",
  "chili and lime drizzle",
  "herb butter"
];

// Basit helper
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Ana fonksiyon. her çağrıda yeni bir kombinasyon üretir
function generateDinner() {
  const carb = pickRandom(carbs);
  const protein = pickRandom(proteins);
  const salad = pickRandom(salads);
  const style = pickRandom(cookingStyles);
  const sauce = pickRandom(sauces);

  // Görseller
  document.getElementById("carbImg").src = carb.image;
  document.getElementById("carbText").textContent = carb.name;

  document.getElementById("proteinImg").src = protein.image;
  document.getElementById("proteinText").textContent = protein.name;

  document.getElementById("saladImg").src = salad.image;
  document.getElementById("saladText").textContent = salad.name;

  // Üstte “tarif ismi” gibi görünen cümle
  const recipeNameDiv = document.getElementById("recipeName");
  recipeNameDiv.textContent =
    `${style} . ${protein.name} with ${carb.name} . served with ${salad.name} and ${sauce}.`;
}

// Buton eventi
document
  .getElementById("generateBtn")
  .addEventListener("click", generateDinner);

// Sayfa açıldığında otomatik ilk yemek
generateDinner();

// Service worker kaydı. PWA için
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => console.log("Service worker registered", reg.scope))
      .catch(err => console.error("Service worker registration failed", err));
  });
}
