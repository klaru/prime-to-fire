const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

const PORT = process.env.PORT || 3011;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async (req, res) => {
    const browser = await puppeteer.launch({ 
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 2400, deviceScaleFactor: 0.7 });
    await page.goto(process.env.SCREENSHOT_URL || 'https://primetaphouse.com/on-tap');
    await page.screenshot({
      path: '/tmp/screenshot.png',
      clip: {'x': 50, 'y': 640, 'width': 1000, 'height': 2400}
    });

    await browser.close();

    screenshot = fs.readFileSync('/tmp/screenshot.png');

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': screenshot.length,
    });
    return res.end(screenshot);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
