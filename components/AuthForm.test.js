import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import { h } from "vue";
import AuthForm from "./AuthForm.vue";
import { useUserStore } from "../stores/user";

describe("AuthForm.vue", () => {
  let wrapper;
  let router;
  let pinia;

  beforeEach(async () => {
    // Pinia
    pinia = createPinia();
    setActivePinia(pinia);

    // Router
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/sign-in", component: { render: () => h("div") } },
        { path: "/log-in", component: { render: () => h("div") } },
      ],
    });
    await router.push("/sign-in");
    await router.isReady();

    // Монтируем компонент
    wrapper = mount(AuthForm, {
      global: {
        plugins: [pinia, router],
        stubs: {
          NuxtImg: true,
          NuxtLink: { template: "<a><slot /></a>" },
          Teleport: true,
          Transition: true,
        },
      },
    });

    // Мокаем setUser в store
    const userStore = useUserStore();
    userStore.setUser = vi.fn().mockResolvedValue(true);
  });

  it("рендерит форму с полями", () => {
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Повторите пароль"]').exists()).toBe(
      true
    );
    expect(wrapper.find(".modal__btn-submit").text()).toContain(
      "Зарегистрироваться"
    );
  });

  it("показывает ошибку при пустых полях", async () => {
    const userStore = useUserStore();
    await wrapper.find("form").trigger("submit.prevent");
    expect(userStore.error).toBe("Заполните все обязательные поля");
  });

  it("показывает ошибку при невалидном email", async () => {
    const userStore = useUserStore();
    await wrapper.find('input[type="email"]').setValue("invalid-email");
    await wrapper.find('input[type="password"]').setValue("123456");
    await wrapper
      .find('input[placeholder="Повторите пароль"]')
      .setValue("123456");
    await wrapper.find("form").trigger("submit.prevent");
    expect(userStore.error).toBe("Введите корректный email");
  });

  it("показывает ошибку если пароли не совпадают (регистрация)", async () => {
    const userStore = useUserStore();
    await wrapper.find('input[type="email"]').setValue("test@mail.com");
    await wrapper.find('input[type="password"]').setValue("123456");
    await wrapper
      .find('input[placeholder="Повторите пароль"]')
      .setValue("654321");
    await wrapper.find("form").trigger("submit.prevent");
    expect(userStore.error).toBe("Пароли не совпадают");
  });

  it("вызывает setUser и редиректит при успешной регистрации", async () => {
    const userStore = useUserStore();
    await wrapper.find('input[type="email"]').setValue("test@mail.com");
    await wrapper.find('input[type="password"]').setValue("123456");
    await wrapper
      .find('input[placeholder="Повторите пароль"]')
      .setValue("123456");
    await wrapper.find("form").trigger("submit.prevent");

    expect(userStore.setUser).toHaveBeenCalledWith({
      email: "test@mail.com",
      password: "123456",
      username: "test",
    });
  });
});
