import {afterAll, afterEach, beforeAll} from 'vitest';
import {VueWrapper, config} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import {setupServer} from 'msw/node';
import i18n from '@/i18n';
import router from '@/router';
import {restHandlers} from '@/components/__tests__/mswHandlers';

config.global.plugins = [createTestingPinia(), i18n, router];

const dataTestIdPlugin = (wrapper: VueWrapper) => ({
  findByTestId: (testId: string) => wrapper.find(`[data-test-id='${testId}']`),
});

config.plugins.VueWrapper.install(dataTestIdPlugin);

const server = setupServer(...restHandlers);

// Start mock server before all tests
beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

// Close mock server after all tests
afterAll(() => server.close());

// Reset handlers after each test
afterEach(() => server.resetHandlers());
