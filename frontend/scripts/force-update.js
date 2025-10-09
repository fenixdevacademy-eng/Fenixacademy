// Script para forçar atualização do cache
const fs = require('fs');
const path = require('path');

// Gera um timestamp único
const timestamp = Date.now();

// Atualiza o package.json com nova versão
const packagePath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Incrementa a versão patch
const version = packageJson.version.split('.');
version[2] = parseInt(version[2]) + 1;
packageJson.version = version.join('.');

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

// Cria um arquivo de build info
const buildInfo = {
  timestamp,
  version: packageJson.version,
  buildDate: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || 'local',
};

fs.writeFileSync(
  path.join(__dirname, '../public/build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log(`Build info atualizado: ${packageJson.version} - ${timestamp}`);


