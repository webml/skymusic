<template>
  <button
    :style="{
      width: buttonWidth,
      height: buttonHeight,
      borderRadius: buttonBorderRadius,
      color: textColor,
      backgroundColor: color,
    }"
    class="base-button"
    :placeholder="placeholder"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    width: { type: Number, default: 248 },
    height: { type: Number, default: 30 },
    borderRadius: { type: Number, default: 4 },
    color: { type: String, default: 'rgba(86, 94, 239, 1)' },
    textColor: { type: String, default: 'rgba(255, 255, 255, 1)' },
    placeholder: { type: String, default: '' },
  },
  computed: {
    buttonWidth() {
      return this.width + 'px'
    },
    buttonHeight() {
      return this.height + 'px'
    },
    buttonBorderRadius() {
      return this.borderRadius + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
.base-button {
  border: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -1%;
  text-align: center;
}
</style>
