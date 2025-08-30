<template>
  <Teleport to="body">
    <Transition name="auth-form">
      <div class="wrapper">
        <div class="container-signup">
          <div class="modal__block">
            <form class="modal__form-login" @submit.prevent="handleSubmit">
              <NuxtLink to="/">
                <div class="modal__logo">
                  <NuxtImg
                    :placeholder="[5]"
                    src="assets/img/logo_modal.png"
                    alt="logo"
                  />
                </div>
              </NuxtLink>

              <input
                v-model.trim="email"
                class="modal__input"
                type="email"
                placeholder="Почта"
              />

              <input
                v-model.trim="password"
                class="modal__input"
                type="password"
                placeholder="Пароль"
              />

              <input
                v-if="isSignIn"
                v-model.trim="confirmPassword"
                class="modal__input"
                type="password"
                placeholder="Повторите пароль"
              />

              <button class="modal__btn-submit" type="submit">
                {{ isSignIn ? "Зарегистрироваться" : "Войти" }}
              </button>

              <button
                v-if="!isSignIn"
                class="modal__btn-switch"
                type="button"
                @click="$router.push('/sign-in')"
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const isSignIn = computed(() => route.path.includes("sign-in"));
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async () => {
  try {
    userStore.error = null;

    if (!email.value || !password.value) {
      userStore.error = "Заполните все обязательные поля";
      return;
    }

    if (isSignIn.value) {
      if (password.value !== confirmPassword.value) {
        userStore.error = "Пароли не совпадают";
        return;
      }

      if (!validateEmail(email.value)) {
        userStore.error = "Введите корректный email";
        return;
      }

      await userStore.setUser({
        email: email.value,
        password: password.value,
        username: email.value.split("@")[0],
      });
    } else {
      if (!validateEmail(email.value)) {
        userStore.error = "Введите корректный email";
        return;
      }

      await userStore.setUser({
        email: email.value,
        password: password.value,
      });
    }

    router.push("/");
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
};

onMounted(() => {
  userStore.error = null;
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal__block {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 366px;
  padding: 40px;
}

.modal__form-login {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal__input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d0cece;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  background-color: transparent;

  &:focus {
    border-color: #580ea2;
    outline: none;
  }
}

.modal__btn-submit {
  width: 100%;
  padding: 14px;
  background-color: #580ea2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3f007d;
  }
}

.modal__btn-switch {
  width: 100%;
  padding: 14px;
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #d0cece;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d0cece;
  }
}

.modal__logo {
  text-align: center;
  margin-bottom: 30px;

  img {
    max-width: 140px;
    height: auto;
  }
}
.error-message {
  color: #ff4d4d;
  background: #ffe6e6;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: 1px solid #ffcccc;
  font-size: 14px;
}
</style>
