import pluginVue from 'eslint-plugin-vue';
import {defineConfigWithVueTs, vueTsConfigs} from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import {includeIgnoreFile} from '@eslint/compat';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import {fileURLToPath} from 'node:url';

export default defineConfigWithVueTs(
  includeIgnoreFile(fileURLToPath(new URL('./.gitignore', import.meta.url))),
  {name: 'app/files-to-lint', files: ['**/*.{ts,mts,tsx,vue}']},
  pluginVueA11y.configs['flat/recommended'],
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {...pluginVitest.configs.recommended, files: ['src/**/__tests__/*']},
  skipFormatting,
  {rules: {'vuejs-accessibility/label-has-for': ['error', {required: {some: ['nesting', 'id']}}]}},
);
