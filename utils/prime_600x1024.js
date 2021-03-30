const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 600,
    height: 1024,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.primetaphouse.com/on-tap');
  await page.screenshot({path: 'c:/users/kruff/Desktop/prime_1024x600.png'});

  await browser.close();
})();