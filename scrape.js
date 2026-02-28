const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  // Seeds 9 to 18
  for (let seed = 9; seed <= 18; seed++) {

    // 👉 Replace with the real URL pattern
    const url = "https://sanand0.github.io/tdsdata/js_table/?seed=${seed}";

    console.log("Visiting:", url);

    await page.goto(url);

    // Wait for table to load (important)
    await page.waitForSelector("table");

    // Extract numbers from all tables
    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} sum:`, pageSum);

    totalSum += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", totalSum);
  console.log("=================================");

  await browser.close();
}

run();
