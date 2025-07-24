const slider = document.getElementById("changeSize");
const container = document.getElementById("data-container");
const warningContainer = document.getElementById("warning");
const resultContainer = document.querySelector("#result");

let dataset = [];

init();

function init() {
  generateBlocks(Number(slider.value));

  slider.addEventListener("input", generateBlockUtil);
}

function generateBlockUtil() {
  container.innerHTML = '';
  resultContainer.innerHTML = '';
  warningContainer.innerHTML = '';

  if (slider.value > 150) {
    showWarning("Dataset size is very high. Quick sort recommended!");
  }

  generateBlocks(Number(slider.value));
}

function generateBlocks(num = 45) {
  dataset = Array.from({ length: num - 1 }, (_, i) => i + 1);
  shuffleArray(dataset);

  const fragment = document.createDocumentFragment();

  dataset.forEach((value, i) => {
    const block = document.createElement("div");
    block.classList.add("block");
    block.setAttribute('block-value', value);

    const heightMultiplier = calculateHeightMultiplier(num);
    setBlockStyles(block, value, num, i, heightMultiplier);

    fragment.append(block);
  });

  container.append(fragment);
}

function calculateHeightMultiplier(num) {
  if (num < 40) return 7;
  else if (num < 100) return 3;
  else if (num < 200) return 1.35;
  else if (num < 300) return 0.9;
  else if (num < 400) return 0.6;
  else return 0.5;
}

function setBlockStyles(block, value, num, index, heightMultiplier) {
  block.style.height = `${value * heightMultiplier}px`;
  block.style.width = `${900 / num}px`;
  block.style.left = `${index * (900 / num)}px`;
  block.style.marginLeft = '0.5px';
  block.style.marginRight = '0.5px';
}

function showWarning(message) {
  const res = document.createElement('h3');
  res.innerHTML = `Warning: ${message}`;
  warningContainer.appendChild(res);
}
