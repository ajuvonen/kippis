import {describe, it, expect, beforeAll} from 'vitest';
import {mount} from '@vue/test-utils';
import router from '@/router';
import App from '@/App.vue';

describe('LocaleChanger', () => {
  beforeAll(async () => {
    await router.push('/');
  });

  it('Changes locale', async () => {
    const wrapper = mount(App);

    const localeButton = wrapper.find('.locale-changer');

    expect(wrapper.find('h1').text()).toBe('Enter the World of Delicious Cocktails!');
    expect(localeButton.text()).toBe('en');
    await localeButton.trigger('click');
    expect(wrapper.find('h1').text()).toBe('Astu maistuvien cocktailien maailmaan!');
    expect(localeButton.text()).toBe('fi');
    await localeButton.trigger('click');
    expect(wrapper.find('h1').text()).toBe('Enter the World of Delicious Cocktails!');
    expect(localeButton.text()).toBe('en');
  });
});
