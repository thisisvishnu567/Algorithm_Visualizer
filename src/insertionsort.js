async function insertionSort(delay) {
  let blocks = document.querySelectorAll(".block");

  if (blocks.length > 250) {
    delay = delay / 8;
  }

  // disable menu
  disableMenu();

  // reset results section
  const result = document.getElementById("result");
  result.innerHTML = '';

  // check if the array is sorted
  const arr = Array.from(blocks, block => getValue(block));

  if (isSorted(arr)) {
    const res = document.createElement('h3');
    res.innerHTML = 'Array is already Sorted!!!';
    result.appendChild(res);

    // enable menu
    enableMenu();
  } else {
    const res = document.createElement('h3');
    res.innerHTML = 'Insertion Sorting Started...';
    result.appendChild(res);

    const start = performance.now();

    for (let i = 1; i < blocks.length; i++) {
      for (let j = i; j > 0 && getValue(blocks[j]) < getValue(blocks[j - 1]); j--) {
        highlightBlocks(blocks[j], blocks[j - 1], "#FF4949");

        await delayAnimation(2 * delay);

        await swap(blocks[j], blocks[j - 1]);
        blocks = document.querySelectorAll(".block");

        highlightBlocks(blocks[j], blocks[j - 1], "#58B7FF");
      }
    }

    highlightSortedBlocks(blocks);

    res.innerHTML += ' Sorting Complete!!';
    const end = performance.now();
    const time = document.createElement('p');
    time.innerHTML = `Time taken: ${((end - start) / 1000).toFixed(4)} Sec `;
    res.appendChild(time);

    // enable menu and remove highlight
    enableMenu();
  }
}
