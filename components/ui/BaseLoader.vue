<template>
  <div
    class="loader"
    :style="{ width: loaderWidth, height: loaderHeight, borderRadius: loaderBorderRadius }"
  ></div>
</template>

<script>
export default {
  name: 'BaseLoader',
  props: {
    width: { type: Number, default: 40 },
    height: { type: Number, default: 40 },
    borderRadius: { type: Number, default: 0 },
  },
  computed: {
    loaderWidth() {
      return this.width + 'px'
    },
    loaderHeight() {
      return this.height + 'px'
    },
    loaderBorderRadius() {
      return this.borderRadius + 'px'
    },
  },
}
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #c1cddc 0%, #e9eef7 50%, #c1cddc 100%);
  background-size: 200% 100%;
  animation: gradient 1.5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
