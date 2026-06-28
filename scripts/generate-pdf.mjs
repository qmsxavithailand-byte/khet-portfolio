import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempPath = path.join(process.env.TEMP, 'Resume_Phatcharaphon.pdf');
const outputPath = path.join(__dirname, '..', 'public', 'Resume_Phatcharaphon.pdf');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1200, height: 1600 });

// emulate screen so CSS renders (not print-stripped)
await page.emulateMediaType('screen');

await page.goto('http://localhost:3000/Phatcharaphon_Resume.html', {
  waitUntil: ['networkidle0', 'domcontentloaded'],
  timeout: 30000,
});

// wait for fonts + images
await new Promise(r => setTimeout(r, 2000));

const pdfBuffer = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();

// write to temp first (avoid OneDrive lock on destination)
writeFileSync(tempPath, pdfBuffer);

// force copy over locked file via PowerShell
execSync(`powershell -Command "Copy-Item -Path '${tempPath}' -Destination '${outputPath}' -Force"`);

console.log('PDF generated:', outputPath);
