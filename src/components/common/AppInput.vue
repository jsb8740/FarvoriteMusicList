<template>
  <input :value="value" @input="updateValue" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  modelValue: string;
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const value = computed<Props['modelValue']>(() => props.modelValue);

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<style scoped>
input[type='text'] {
  color: white;
  background-color: transparent;
}
</style>
