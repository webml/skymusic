<template>
  <div class="container">
    <h1 class="title">404</h1>
    <p class="subtitle">Страница не найдена 😞</p>
    <p class="description">
      Возможно, она была удалена или перенесена на другой адрес
    </p>
    <button class="btn" @click="$router.push('/')">Вернуться на главную</button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: transparent;
  color: white;
  font-family: Arial, sans-serif;
  text-align: center;
}

.title {
  font-size: 100px;
  margin: 0;
}

.subtitle {
  font-size: 24px;
  margin-top: 20px;
}

.description {
  font-size: 18px;
  margin-top: 10px;
}

.btn {
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  background-color: purple;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-top: 30px;
}
</style>
