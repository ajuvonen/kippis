import {afterAll, afterEach, beforeAll} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import i18n from './src/i18n';
import router from './src/router';
import {server} from './src/components/__tests__/mswHandlers';

config.global.plugins = [createTestingPinia(), i18n, router];

const dataTestIdPlugin = (wrapper: ReturnType<typeof mount>) => ({
  findByTestId: (testId: string) => wrapper.find(`[data-test-id='${testId}']`),
});

config.plugins.VueWrapper.install(dataTestIdPlugin);

// Start mock server before all tests
beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

// Reset handlers after each test
afterEach(() => {
  config.global.plugins[0] = createTestingPinia();
  server.resetHandlers();
});

// Close mock server after all tests
afterAll(() => server.close());
