#!/usr/bin/env node

'use strict';
const { exec } = require('child_process');
const { readFile } = require('fs');
const pluralize = require('pluralize');
const { bindNestJsModules } = require('./utils');

const commands = [
	'cp -r src/modules/articles src/modules/{{pluralRawModuleName}} && find src/modules/{{pluralRawModuleName}} -depth -name ',
	"'*articles*'",
	' -exec sh -c '
	, "'",
	'mv "$1" "${1//articles/{{pluralRawModuleName}}}"',
	"'",
	' _ {}  ; && ',
	'find src/modules/{{pluralRawModuleName}} -depth -name ',
	"'*article*'",
	' -exec sh -c ',
	"'",
	'mv "$1" "${1//article/{{singularRawModuleName}}}"',
	"'",
	' _ {}  ; && find src/modules/{{pluralRawModuleName}} -type f -exec sed -i ',
	"'",
	's/Articles/{{capitalizedPluralModuleName}}/g;s/articles/{{lowerCasedPluralModuleName}}/g;s/Article/{{capitalizedSingularModuleName}}/g;s/article/{{lowerCasedSingularModuleName}}/g',
	"'",
	' {}  ; && find src/modules/{{pluralRawModuleName}} -type f -exec sed -i ',
	"'",
	's/{{lowerCasedPluralModuleName}}\./{{pluralRawModuleName}}\\./g;s/{{lowerCasedSingularModuleName}}\\./{{singularRawModuleName}}./g;',
	"'",
	' {}  ;',
	` &&  find src/modules/{{pluralRawModuleName}} -type f -exec sed -i "s/{{pluralRawModuleName}}\.)/{{pluralRawModuleName}}')/g" {} \;`
];

function pluralizeVariable(variable) {
	if (!pluralize.isPlural(variable)) {
		return pluralize(variable);
	}
	return variable;
}

function toPascalCase(text) {
	return text.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

function toCamelCase(text) {
	return text.split('-')
		.map((word, index) => {
			if (index === 0) {
				return word;
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join('');
}

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.question('Ingresa nombre de modulo, para multiples modulos, ponlos separados por coma: ', async (modulo) => {
	if (pluralize.isPlural(modulo)) {
		console.log('Error, no soportado para plural');
		return false;
	}

	if (modulo.includes(',')) {
		const modulos = modulo.split(',').map((item) => item.trim());
		for (let i = 0; i < modulos.length; i++) {
			await moduleExecution(modulos[i]);
		}
	
	} else {
		moduleExecution(modulo);
	}

	readline.close();
});

function moduleExecution(moduleName) {
	const pluralizedModule = pluralizeVariable(moduleName);
	return new Promise(async resolve => {
		const fullCommand = commands.join('')
		.replace(/{{pluralRawModuleName}}/g, pluralizedModule)
		.replace(/{{singularRawModuleName}}/g, moduleName)
		.replace(/{{capitalizedPluralModuleName}}/g, pluralizeVariable(toPascalCase(moduleName)))
		.replace(/{{lowerCasedPluralModuleName}}/g, pluralizeVariable(toCamelCase(moduleName)))
		.replace(/{{capitalizedSingularModuleName}}/g, toPascalCase(moduleName))
		.replace(/{{lowerCasedSingularModuleName}}/g, toCamelCase(moduleName))

	exec(fullCommand, async (error, stdout, stderr) => {
		if (error) {
			console.error(`Error al ejecutar el comando: ${error}`);
			return;
		} else {
			await bindNestJsModules(`${pluralizeVariable(toPascalCase(moduleName))}Module`,
				pluralizedModule);
			resolve();
		}
	});
	})
}

