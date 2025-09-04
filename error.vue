<template>
  <div class="error-page">
    <h1>Ошибка {{ error.statusCode }}</h1>
    <p class="error-message">{{ error.message }}</p>
    <NuxtLink to="/log-in" class="back-link">Выйти и зайти нормально</NuxtLink>
  </div>
</template>

<script setup>
const error = useError();
</script>

<style>
.error-page {
  text-align: center;
  padding: 2rem;
}

.error-message {
  color: #ff4444;
  margin: 1rem 0;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #1976d2;
  text-decoration: none;
}
</style>
