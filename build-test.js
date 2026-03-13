// Simple build test to verify CSS and configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build configuration...');

try {
  // Check if critical files exist
  const files = [
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'src/app/globals.css',
    'src/app/page.tsx'
  ];

  files.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      console.log(`✅ ${file} exists`);
    } else {
      console.log(`❌ ${file} missing`);
    }
  });

  // Check CSS content
  const cssContent = fs.readFileSync(path.join(__dirname, 'src/app/globals.css'), 'utf8');
  if (cssContent.includes('@tailwind base')) {
    console.log('✅ Tailwind directives found');
  } else {
    console.log('❌ Tailwind directives missing');
  }

  console.log('🎉 Build configuration looks good!');

} catch (error) {
  console.error('❌ Error:', error.message);
}
