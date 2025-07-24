  const algos = document.querySelectorAll(".algorithmButton");
  const sortSpeed = document.getElementById("changeSpeed");
  let sortSpeedValue = 10;

  sortSpeed.addEventListener("input", function () {
    sortSpeedValue = this.value;
  });

  algos.forEach(function (algo) {
    algo.addEventListener("click", function () {
      const current = document.querySelector(".highlight");
      if (current) {
        current.classList.remove("highlight");
      }
      this.classList.add("highlight");
    });
  });

  async function bubbleSort(delay) {
    let blocks = document.querySelectorAll(".block");

    if (blocks.length > 250) {
      delay /= 8;
    }

    disableMenu();

    const result = document.getElementById("result");
    result.innerHTML = "";

    const res = document.createElement("h3");
    const arr = Array.from(blocks, (block) => Number(block.getAttribute("block-value")));

    if (isSorted(arr)) {
      res.innerHTML = "Array is already Sorted!!";
      result.appendChild(res);
      enableMenu();
    } else {
      res.innerHTML = "Bubble Sorting Started...";
      result.appendChild(res);

      const start = performance.now();

      for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
          blocks[j].style.backgroundColor = "#FF4949";
          blocks[j + 1].style.backgroundColor = "#FF4949";

          await new Promise((resolve) => setTimeout(resolve, 0.1 * delay));

          const value1 = getValue(blocks[j]);
          const value2 = getValue(blocks[j + 1]);

          if (value1 > value2) {
            await swap(blocks[j], blocks[j + 1]);
            blocks = document.querySelectorAll(".block");
          }

          blocks[j].style.backgroundColor = "#58B7FF";
          blocks[j + 1].style.backgroundColor = "#58B7FF";
        }

        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
      }

      blocks[0].style.backgroundColor = "#13CE66";
      res.innerHTML += " Sorting Complete!!";

      const end = performance.now();
      const time = document.createElement("p");
      time.innerHTML = `Time taken: ${((end - start) / 1000).toFixed(4)} Sec`;
      res.appendChild(time);

      enableMenu();
    }
  }
