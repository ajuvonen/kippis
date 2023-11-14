import {DOMWrapper, VueWrapper, config} from '@vue/test-utils';
import i18n from '@/i18n';
import router from '@/router';
import {createTestingPinia} from '@pinia/testing';

config.global.plugins = [createTestingPinia(), i18n, router];

const dataTestIdPlugin = (wrapper: VueWrapper) => ({
  findByTestId: (testId: string) => wrapper.find(`[data-test-id='${testId}']`),
});

config.plugins.VueWrapper.install(dataTestIdPlugin);
