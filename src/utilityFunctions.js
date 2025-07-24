async function swap(el1, el2) {
  return new Promise((resolve) => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    const clonedElement1 = el1.cloneNode(true);
    const clonedElement2 = el2.cloneNode(true);

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        el1.replaceWith(clonedElement2);
        el2.replaceWith(clonedElement1);
        resolve();
      }, 1000 / (3 * sortSpeedValue * sortSpeedValue));
    });
  });
}

function disableMenu() {
  document.getElementById("changeSize").disabled = true;
  algos.forEach(function (algo) {
    algo.classList.add("disableClick");
  });
  document.getElementById("genBlocks").disabled = true;
}

function enableMenu() {
  algos.forEach(function (algo) {
    algo.classList.remove("disableClick");
  });
  const current = document.querySelector(".highlight");
  if (current) {
    current.classList.remove("highlight");
  }
  document.getElementById("changeSize").disabled = false;
  document.getElementById("genBlocks").disabled = false;
}

function isSorted(arr) {
  return arr.slice(1).every((item, i) => arr[i] <= item);
}

function getValue(block) {
  return Number(block.getAttribute('block-value'));
}

function highlightBlocks(block1, block2, color) {
  block1.style.backgroundColor = color;
  block2.style.backgroundColor = color;
}

async function delayAnimation(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

function highlightSortedBlocks(blocks) {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundColor = "#13CE66";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
