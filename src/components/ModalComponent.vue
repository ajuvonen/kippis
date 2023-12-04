<script setup lang="ts">
import {ref} from 'vue';
import {onClickOutside, onKeyStroke} from '@vueuse/core';
import {UseFocusTrap} from '@vueuse/integrations/useFocusTrap/component';
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

onClickOutside(modal, () => emit('close'));
onKeyStroke('Escape', () => emit('close'));
</script>
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <UseFocusTrap v-if="show">
        <div class="modal-component__backdrop">
          <div
            class="modal-component__modal"
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
      </UseFocusTrap>
    </Transition>
  </Teleport>
</template>
<style lang="scss" scoped>
.modal-component__backdrop {
  @apply fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50;
}

.modal-component__modal {
  @apply bg-white rounded-lg text-left overflow-hidden shadow-xl print:shadow-none p-4 w-4/5 sm:w-3/5 lg:w-1/2 top-1/2 left-1/2 absolute;
  transform: translate(-50%, -50%);
}

@media print {
  .modal-component__modal {
    @apply w-3/5;
  }
}
</style>
