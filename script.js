//-------------------------------------
// Veritabanları
//-------------------------------------

const carbs = [
  { name: "Garlic quinoa", image: "./images/carb_quinoa.avif", glutenfree: true, keto: false },
  { name: "Buttered pasta", image: "./images/carb_pasta.avif", glutenfree: false, keto: false },
  { name: "Roasted potatoes", image: "./images/carb_roasted_potatoes.avif", glutenfree: true, keto: false },
  { name: "Keto cauliflower mash", image: "./images/carb_roasted_potatoes.avif", glutenfree: true, keto: true },
  { name: "Zucchini noodles", image: "./images/carb_pasta.avif", glutenfree: true, keto: true }
];

const proteins = [
  { name: "Oven baked salmon", image: "./images/protein_salmon.avif", vegan: false, vegetarian: false, pescetarian: true },
  { name: "Grilled chicken", image: "./images/protein_chicken.avif", vegan: false, vegetarian: false, pescetarian: false },
  { name: "Crispy tofu", image: "./images/protein_tofu.avif", vegan: true, vegetarian: true, pescetarian: true },
  { name: "Pan seared salmon", image: "./images/protein_salmon.avif", vegan: false, vegetarian: false, pescetarian: true }
];

const salads = [
  { name: "Greek salad", image: "./images/salad_greek.avif", vegan: false },
  { name: "Kale salad", image: "./images/salad_kale.avif", vegan: true },
  { name: "Mixed greens", image: "./images/salad_mixed.avif", vegan: true }
];

const styles = [
  "Mediterranean style",
  "comfort food twist",
  "quick weeknight version",
  "fresh and vibrant approach",
  "one‑pan simplified version",
  "15‑minute express dinner"
];

const sauces = [
  "garlic yogurt",
  "tahini lemon",
  "soy ginger glaze",
  "herb butter",
  "basil pesto",
  "olive oil and lemon"
];

// Yardımcı fonksiyonlar
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let selectedFilter = "none";

function setupUi() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedFilter = btn.dataset.filter;
    });
  });

  document.getElementById("generateBtn").addEventListener("click", generateDinner);
}

// Tarif üretimi
function generateDinner() {
  let filteredProteins = proteins;
  let filteredCarbs = carbs;

  if (selectedFilter === "vegan") {
    filteredProteins = proteins.filter(p => p.vegan);
    filteredCarbs = carbs.filter(c => c.keto || c.glutenfree);
  } else if (selectedFilter === "vegetarian") {
    filteredProteins = proteins.filter(p => p.vegan || p.vegetarian);
  } else if (selectedFilter === "pescetarian") {
    filteredProteins = proteins.filter(p => p.pescetarian);
  } else if (selectedFilter === "glutenfree") {
    filteredCarbs = carbs.filter(c => c.glutenfree);
  } else if (selectedFilter === "keto") {
    filteredCarbs = carbs.filter(c => c.keto);
  }

  const carb = pick(filteredCarbs);
  const protein = pick(filteredProteins);
  const salad = pick(salads);
  const style = pick(styles);
  const sauce = pick(sauces);

  document.getElementById("carbImg").src = carb.image;
  document.getElementById("proteinImg").src = protein.image;
  document.getElementById("saladImg").src = salad.image;

  document.getElementById("carbText").textContent = carb.name;
  document.getElementById("proteinText").textContent = protein.name;
  document.getElementById("saladText").textContent = salad.name;

  document.getElementById("recipeDescription").textContent =
    `${style}. Served with ${sauce}.`;

  document.getElementById("result").classList.remove("hidden");
}

// Başlatma
document.addEventListener("DOMContentLoaded", setupUi);

// Service worker kaydı
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
