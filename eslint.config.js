import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginOxlint from 'eslint-plugin-oxlint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.serviceworker
			}
		},
		plugins: {
			unicorn: eslintPluginUnicorn
		},
		rules: {
			'no-console': ['warn'],
			'@typescript-eslint/no-explicit-any': 'warn',
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: ['README.md', 'Welcome.astro', 'Layout.astro']
				}
			],
			'no-undef': 'off'
		}
	},
	...eslintPluginOxlint.configs['flat/all']
);
