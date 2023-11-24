import {mount} from '@vue/test-utils';
import {describe, it, expect, vi} from 'vitest';
import router from '@/router';
import SearchField from '@/components/SearchField.vue';

describe('SearchField.vue', () => {
  it('mounts', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('triggers search when enter key is pressed', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(SearchField);

    const input = wrapper.find('input');
    await input.setValue('test search');
    await input.trigger('keyup.enter');

    expect(pushSpy).toHaveBeenCalledWith({name: 'search', query: {searchString: 'test search'}});
  });

  it('triggers search when search button is clicked', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(SearchField);

    const input = wrapper.find('input');
    await input.setValue('test search');
    await wrapper.find('button').trigger('click');

    expect(pushSpy).toHaveBeenCalledWith({name: 'search', query: {searchString: 'test search'}});
  });

  it('navigates to the correct route when a link button is clicked', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(SearchField);
    const linkButtons = wrapper.findAllComponents({ name: 'LinkButton' });

    for (let i = 0; i < linkButtons.length; i++) {
      const linkButton = linkButtons[i];
      const tag = linkButton.props('to').split('=')[1];
      await linkButton.trigger('click');
      expect(pushSpy).toHaveBeenCalledWith(`/search?tag=${tag}`);
    }
  });
});
