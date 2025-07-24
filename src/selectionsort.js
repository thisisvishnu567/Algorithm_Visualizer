async function selectionSort(delay) {
  let blocks = document.querySelectorAll(".block");

  // disable menu
  disableMenu();

  // reset results section
  document.getElementById("result").innerHTML = '';
  const result = document.getElementById("result");
  const res = document.createElement('h3');

  // check if the array is sorted
  const arr = Array.from(blocks, block => Number(block.getAttribute('block-value')));
  const isSorted = arr.slice(1).every((item, i) => arr[i] <= item);

  if (isSorted) {
    res.innerHTML = 'Array is already Sorted!!!';
    result.appendChild(res);

    // enable menu
    enableMenu();
  } else {
    res.innerHTML = 'Selection Sorting Started...';
    result.appendChild(res);

    const start = performance.now();
    for (let i = 0; i < blocks.length - 1; i += 1) {
      let min_idx = i;
      for (let j = i + 1; j < blocks.length; j += 1) {
        blocks[j].style.backgroundColor = "#FF4949";
        blocks[min_idx].style.backgroundColor = "#FF4949";

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay / 2)
        );

        const value1 = getValue(blocks[j]);
        const value2 = getValue(blocks[min_idx]);

        if (value1 < value2) {
          min_idx = j;
        }

        blocks[j].style.backgroundColor = "#58B7FF";
        blocks[min_idx].style.backgroundColor = "#58B7FF";
      }

      await swap(blocks[i], blocks[min_idx]);
      blocks = document.querySelectorAll(".block");
      blocks[i].style.backgroundColor = "#13CE66";
    }

    blocks[blocks.length - 1].style.backgroundColor = "#13CE66";
    res.innerHTML = res.innerHTML + ` Sorting Complete!!`;
    const end = performance.now();
    const time = document.createElement('p');
    time.innerHTML = `Time taken: ${((end - start) / 1000).toFixed(4)} Sec `;
    res.appendChild(time);

    // enable menu and remove highlight
    enableMenu();
  }
}
