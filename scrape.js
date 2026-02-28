const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=9",
    "https://sanand0.github.io/tdsdata/js_table/?seed=10",
    "https://sanand0.github.io/tdsdata/js_table/?seed=11",
    "https://sanand0.github.io/tdsdata/js_table/?seed=12",
    "https://sanand0.github.io/tdsdata/js_table/?seed=13",
    "https://sanand0.github.io/tdsdata/js_table/?seed=14",
    "https://sanand0.github.io/tdsdata/js_table/?seed=15",
    "https://sanand0.github.io/tdsdata/js_table/?seed=16",
    "https://sanand0.github.io/tdsdata/js_table/?seed=17",
    "https://sanand0.github.io/tdsdata/js_table/?seed=18"
  ];

  for (const url of urls) {
    console.log("Visiting:", url);

    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log("Page sum:", pageSum);
    totalSum += pageSum;
  }

  console.log("FINAL TOTAL:", totalSum);

  await browser.close();
}

run();
