import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import LinkButton from '@/components/LinkButton.vue';

describe('LinkButton', () => {
  it('mounts', () => {
    const wrapper = mount(LinkButton, {props: {to: '/'}, slots: {default: 'My Link'}});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('points to search', () => {
    const wrapper = mount(LinkButton, {props: {to: '/search'}});
    expect(wrapper.find('a[href="/search"]').exists()).toBe(true);
  });
});
