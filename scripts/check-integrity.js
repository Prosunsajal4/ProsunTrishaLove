// ========================================================
// PROSUN & TRISHA — INTEGRITY & HEALTH CHECK SCRIPT
// Validates all files, links, scripts, and stylesheets
// ========================================================

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
console.log('🔍 Running Prosun & Trisha Love Sanctuary Health Check...\n');

let errors = 0;
let warnings = 0;

// 1. Check critical files existence
const requiredFiles = [
  'index.html',
  'timeline.html',
  'memories.html',
  'quiz.html',
  'letter.html',
  'music.html',
  'style.css',
  'script.js',
  'vercel.json',
  'package.json'
];

requiredFiles.forEach((file) => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ [File Exists] ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`❌ [Missing File] ${file}`);
    errors++;
  }
});

// 2. Validate internal links across HTML files
const htmlFiles = requiredFiles.filter((f) => f.endsWith('.html'));

htmlFiles.forEach((htmlFile) => {
  const content = fs.readFileSync(path.join(rootDir, htmlFile), 'utf8');

  // Check script and css link
  if (!content.includes('style.css')) {
    console.error(`❌ [Missing CSS Link] ${htmlFile} does not link style.css`);
    errors++;
  }
  if (!content.includes('script.js')) {
    console.error(`❌ [Missing Script Link] ${htmlFile} does not link script.js`);
    errors++;
  }

  // Check internal href links
  const hrefMatches = content.matchAll(/href="([^"#:]+\.html)"/g);
  for (const match of hrefMatches) {
    const targetFile = match[1];
    if (!fs.existsSync(path.join(rootDir, targetFile))) {
      console.error(`❌ [Broken Link] In ${htmlFile}: cannot find target "${targetFile}"`);
      errors++;
    }
  }
});

// 3. Syntax check JavaScript file
try {
  const jsContent = fs.readFileSync(path.join(rootDir, 'script.js'), 'utf8');
  new Function(jsContent);
  console.log('✅ [JavaScript Syntax] script.js parsed successfully with zero syntax errors.');
} catch (e) {
  console.error('❌ [JavaScript Error]', e.message);
  errors++;
}

// 4. Check CSS file brackets balance
try {
  const cssContent = fs.readFileSync(path.join(rootDir, 'style.css'), 'utf8');
  const openBraces = (cssContent.match(/\{/g) || []).length;
  const closeBraces = (cssContent.match(/\}/g) || []).length;
  if (openBraces === closeBraces) {
    console.log(`✅ [CSS Structure] style.css has balanced blocks (${openBraces} selectors).`);
  } else {
    console.error(`❌ [CSS Error] style.css has mismatched braces: ${openBraces} open vs ${closeBraces} close.`);
    errors++;
  }
} catch (e) {
  console.error('❌ [CSS Read Error]', e.message);
  errors++;
}

console.log('\n----------------------------------------');
if (errors === 0) {
  console.log('🎉 All checks passed! 100% healthy, valid, and ready for deployment.');
  process.exit(0);
} else {
  console.error(`💥 Found ${errors} error(s). Please review and fix.`);
  process.exit(1);
}
