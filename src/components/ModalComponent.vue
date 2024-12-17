<script setup lang="ts">
import {ref} from 'vue';
import {onClickOutside, onKeyStroke} from '@vueuse/core';
import {UseFocusTrap} from '@vueuse/integrations/useFocusTrap/component';
import IconComponent from '@/components/IconComponent.vue';

defineProps<{
  title?: string;
  show: boolean;
}>();

const emit = defineEmits(['close']);

const modal = ref<HTMLDivElement | null>(null);

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
      <div v-if="show" class="modal-component__backdrop">
        <UseFocusTrap>
          <div
            class="modal-component__modal"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h2 id="modal-title">{{ title }}</h2>
            <slot name="content" />
            <div class="modal-component__actions-container">
              <slot name="actions" />
              <button @click="$emit('close')">
                <IconComponent icon="closeCircle" />
                <span>{{ $t('modal.close') }}</span>
              </button>
            </div>
          </div>
        </UseFocusTrap>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss" scoped>
.modal-component__backdrop {
  @apply fixed z-20 inset-0 overflow-hidden bg-black bg-opacity-50;
}

.modal-component__modal {
  @apply rounded-lg text-left shadow-xl max-h-[90%] p-4 w-5/6 sm:w-3/5 lg:w-1/2 top-1/2 left-1/2 absolute overflow-y-scroll;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

.modal-component__actions-container {
  @apply flex gap-1 justify-end mt-4;
}

@media print {
  .modal-component__modal {
    @apply w-3/5 shadow-none;
  }
}
</style>
