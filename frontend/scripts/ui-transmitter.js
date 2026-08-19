const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:8081';
const REPORTS_DIR = path.join(__dirname, '../ui-reports');

const VIEWPORTS = [
  { name: 'Mobile', width: 375, height: 812 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 }
];

async function runTransmitter() {
  console.log('🚀 Starting Responsive UI Transmitter...\n');
  
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  let totalIssues = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Checking ${vp.name} Viewport (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    
    try {
      await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait a bit for images and animations to settle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const screenshotPath = path.join(REPORTS_DIR, `screenshot-${vp.name.toLowerCase()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  📸 Screenshot saved: ui-reports/screenshot-${vp.name.toLowerCase()}.png`);

      // Check for Horizontal Overflow
      const overflowIssue = await page.evaluate(() => {
        const docWidth = Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
        const winWidth = window.innerWidth;
        if (docWidth > winWidth) {
          return `Horizontal Overflow Detected! Document is ${docWidth}px wide, but viewport is only ${winWidth}px wide.`;
        }
        return null;
      });

      if (overflowIssue) {
        console.log(`  ❌ Issue Found: ${overflowIssue}`);
        totalIssues++;
      } else {
        console.log(`  ✅ Layout is constrained correctly (No horizontal overflow).`);
      }

    } catch (err) {
      console.log(`  ❌ Failed to load page: ${err.message}`);
      totalIssues++;
    }
  }

  console.log('\n----------------------------------------');
  console.log('📊 TRANSMITTER REPORT');
  console.log('----------------------------------------');
  if (consoleErrors.length > 0) {
    console.log(`❌ Found ${consoleErrors.length} Console Error(s):`);
    consoleErrors.forEach(err => console.log(`  - ${err}`));
    totalIssues += consoleErrors.length;
  } else {
    console.log(`✅ No Console Errors found.`);
  }

  if (totalIssues === 0) {
    console.log(`✅ UI is PERFECT across all tested viewports!`);
  } else {
    console.log(`⚠️ Found ${totalIssues} potential issue(s). Please review the screenshots in frontend/ui-reports/`);
  }

  await browser.close();
  console.log('\nTransmitter finished.');
}

runTransmitter();
