// Simple syntax check for page.tsx
const fs = require('fs');
const path = require('path');

try {
  const pageContent = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
  console.log('✅ page.tsx file read successfully');
  console.log('📄 File length:', pageContent.length, 'characters');
  
  // Check for basic JSX structure
  const openDivs = (pageContent.match(/<div/g) || []).length;
  const closeDivs = (pageContent.match(/<\/div>/g) || []).length;
  const openSections = (pageContent.match(/<section/g) || []).length;
  const closeSections = (pageContent.match(/<\/section>/g) || []).length;
  
  console.log('📊 JSX Structure Analysis:');
  console.log(`  - Open divs: ${openDivs}, Close divs: ${closeDivs}`);
  console.log(`  - Open sections: ${openSections}, Close sections: ${closeSections}`);
  
  if (openDivs === closeDivs && openSections === closeSections) {
    console.log('✅ JSX structure appears balanced');
  } else {
    console.log('❌ JSX structure may have unbalanced tags');
  }
  
} catch (error) {
  console.error('❌ Error reading file:', error.message);
}
