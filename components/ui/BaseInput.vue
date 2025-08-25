<template>
  <input
    :type="props.type"
    :style="{
      width: inputWidth,
      height: inputHeight,
      borderRadius: inputBorderRadius,
      borderColor: props.borderColor,
    }"
    :placeholder="props.placeholder"
    :class="`base-input ${props.class}`"
    :name="props.name"
    :autofocus="props.autofocus"
    v-model="model"
  />
</template>

<script setup>
import { computed } from 'vue'

const model = defineModel()
const props = defineProps({
  width: { type: Number, default: 248 },
  height: { type: Number, default: 30 },
  borderRadius: { type: Number, default: 8 },
  type: { type: String, default: 'text' },
  borderColor: { type: String, default: 'rgba(148, 166, 190, 0.4)' },
  class: { type: String, default: '' },
  name: { type: String, default: 'default' },
  autofocus: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  id: { type: String || Number, default: '' },
})

const inputWidth = computed(() => props.width + 'px')
const inputHeight = computed(() => props.height + 'px')
const inputBorderRadius = computed(() => props.borderRadius + 'px')
</script>

<style lang="scss" scoped>
.base-input {
  border: 1px solid rgba(148, 166, 190, 0.4);
  padding-top: 8px;
  padding-right: 10px;
  padding-bottom: 8px;
  padding-left: 10px;
  gap: 10px;
}
</style>
