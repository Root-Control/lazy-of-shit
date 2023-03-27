'use strict';

const { readFile, writeFile } = require("fs");
const filePath = './src/app.module.ts';

function bindNestJsModules(pascalModuleName, rawPluralModuleName) {
  return new Promise(async (resolve) => {
    await readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // Agregamos la nueva línea de importación justo después de la primera línea de importación existente
      const newImport = `import { ${pascalModuleName} } from \'./modules/${rawPluralModuleName}/${rawPluralModuleName}.module\';\n`;
      const newData = data.replace(/^import\s/m, newImport + '$&');

      // Buscamos la sección imports en el código TypeScript
      const importsRegex = /imports:\s*\[([\s\S]*?)\]/;
      const importsMatch = newData.match(importsRegex);

      if (importsMatch) {
        // Obtenemos el contenido de la sección imports y lo dividimos en un array
        const importsContent = importsMatch[1];
        const importsArray = importsContent.split(',');

        // Limpiamos los elementos del array eliminando los espacios en blanco y los saltos de línea
        const imports = importsArray.map((item) => item.trim().replace(/\n/g, '')).filter(item => item !== '');

        // Agregamos GodModule al array de imports si no está presente
        if (!imports.includes(pascalModuleName)) {
          imports.push(pascalModuleName);
        }

        // Construimos el nuevo contenido del archivo
        const newImportsContent = imports.map((item) => `  ${item}`).join(',\n');
        const newImports = `imports: [\n${newImportsContent}\n]`;

        const newContent = newData.replace(importsRegex, newImports);

        // Actualizamos el archivo
        writeFile(filePath, newContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          resolve();
        });
      } else {
        console.log('No se encontró la sección imports en el código TypeScript.');
      }

    });
  })
}

module.exports = {
  bindNestJsModules
}