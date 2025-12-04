//-----------------------------------------
// YEMEK KATEGORİLERİ
//-----------------------------------------

// Carb seçenekleri
const carbs = [
  { name: "Garlic quinoa", image: "./images/carb_quinoa.avif" },
  { name: "Buttered pasta", image: "./images/carb_pasta.avif" },
  { name: "Roasted potatoes", image: "./images/carb_roasted_potatoes.avif" },
  { name: "Brown rice", image: "./images/carb_quinoa.avif" },
  { name: "Herb couscous", image: "./images/carb_pasta.avif" }
];

// Protein seçenekleri
const proteins = [
  { name: "Oven baked salmon", image: "./images/protein_salmon.avif" },
  { name: "Grilled chicken breast", image: "./images/protein_chicken.avif" },
  { name: "Crispy tofu cubes", image: "./images/protein_tofu.avif" },
  { name: "Pan seared salmon", image: "./images/protein_salmon.avif" },
  { name: "Chicken thighs", image: "./images/protein_chicken.avif" }
];

// Salad seçenekleri
const salads = [
  { name: "Greek salad", image: "./images/salad_greek.avif" },
  { name: "Kale salad", image: "./images/salad_kale.avif" },
  { name: "Mixed greens", image: "./images/salad_mixed.avif" },
  { name: "Cucumber tomato salad", image: "./images/salad_mixed.avif" },
  { name: "Lemon dressed kale", image: "./images/salad_kale.avif" }
];

// Ek varyasyon katmanları - bunlar görünümü bozmaz. sadece isim üretimini zenginleştirir.
const cookingStyles = [
  "Mediterranean style",
  "light and fresh style",
  "comfort food style",
  "quick weeknight style",
  "15 minute style",
  "simple clean eating style",
  "one-pan dinner style",
  "oven only style"
];

const sauces = [
  "garlic yogurt",
  "tahini lemon",
  "soy ginger glaze",
  "pesto drizzle",
  "herb butter",
  "tomato basil sauce"
];

//-----------------------------------------
// RANDOM SEÇİM
//-----------------------------------------

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//-----------------------------------------
// ANA FONKSİYON
//-----------------------------------------

function generateDinner() {
  const carb = pickRandom(carbs);
  const protein = pickRandom(proteins);
  const salad = pickRandom(salads);

  const style = pickRandom(cookingStyles);
  const sauce = pickRandom(sauces);

  // Görseller
  document.getElementById("carbImg").src = carb.image;
  document.getElementById("proteinImg").src = protein.image;
  document.getElementById("saladImg").src = salad.image;

  // Yazılar
  document.getElementById("carbText").textContent = carb.name;
  document.getElementById("proteinText").textContent = protein.name;
  document.getElementById("saladText").textContent = salad.name;

  // Eğer tarif açıklaması göstermek istersen HTML'ye küçük bir alan ekleriz
  // Şimdilik görünümü bozmamak için eklemiyorum
}

//-----------------------------------------
// EVENT
//-----------------------------------------

document
  .getElementById("generateBtn")
  .addEventListener("click", generateDinner);

// Sayfa açıldığında bir kez çalıştır
generateDinner();

//-----------------------------------------
// SERVICE WORKER
//-----------------------------------------

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
