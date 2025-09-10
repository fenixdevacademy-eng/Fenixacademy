const fs = require('fs');
const path = require('path');

const apiFiles = [
  'frontend/app/api/certificates/route.ts',
  'frontend/app/api/courses/route.ts',
  'frontend/app/api/certificates/verify/route.ts',
  'frontend/app/api/progress/route.ts',
  'frontend/app/api/user/subscription/route.ts',
  'frontend/app/api/courses/content/route.ts',
  'frontend/app/api/payments/status/route.ts',
  'frontend/app/api/payments/process/route.ts',
  'frontend/app/api/ide/save/route.ts',
  'frontend/app/api/ide/execute/route.ts',
  'frontend/app/api/ide/status/route.ts',
  'frontend/app/api/status/route.ts',
  'frontend/app/api/test-errors/route.ts',
  'frontend/app/api/monitoring/route.ts',
  'frontend/app/api/payments/route.ts',
  'frontend/app/api/test/route.ts'
];

apiFiles.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Substituir createApiHandler por createNextApiHandler
      content = content.replace(/createApiHandler/g, 'createNextApiHandler');
      
      // Corrigir parâmetros das funções
      content = content.replace(/async \(\) => \{/g, 'async (req: NextRequest) => {');
      content = content.replace(/request\.url/g, 'req.url');
      content = content.replace(/request\.json\(\)/g, 'req.json()');
      content = content.replace(/request\.headers/g, 'req.headers');
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎉 All API handlers fixed!');
