<script setup lang="ts">
import {ref} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {useI18n} from 'vue-i18n';

defineProps<{
  title?: string;
  show: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const {t} = useI18n();

const modal = ref(null);

onClickOutside(modal, () => {
  emit('close');
});
</script>
<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed z-20 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div class="flex items-start py-4 md:pt-20 justify-center min-h-screen text-center">
          <div
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-4 w-4/5 sm:w-3/5 lg:w-1/2"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h2 id="modal-title">{{ title }}</h2>
            <slot />
            <div class="flex flex-row justify-end">
              <button @click="$emit('close')">{{ t('modal.close') }}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<style lang="scss" scoped></style>
