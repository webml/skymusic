import { ref } from "vue";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import NavBar from "./NavBar.vue";
import { useUserStore } from "../stores/user";

vi.mock("../stores/user", () => {
  return {
    useUserStore: vi.fn(),
  };
});

describe("NavBar.vue", () => {
  let wrapper;
  let userStoreMock;

  beforeEach(() => {
    userStoreMock = {
      user: ref(null),
      clearUser: vi.fn(),
    };
    useUserStore.mockReturnValue(userStoreMock);

    wrapper = mount(NavBar, {
      global: {
        stubs: {
          NuxtImg: true,
          RouterLink: { template: "<a><slot /></a>" },
          ClientOnly: { template: "<div><slot /></div>" },
        },
      },
    });
  });

  it("рендерит логотип", () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: ["NuxtImg", "RouterLink"],
      },
    });
    const logo = wrapper.find(".logo__image");
    expect(logo.exists()).toBe(true);
  });

  it("меню скрыто по умолчанию", () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: ["NuxtImg", "RouterLink"],
      },
    });
    const menu = wrapper.find(".nav__menu");
    expect(menu.element.style.display).toBe("none"); // проверка на v-show
  });

  it("клик по бургеру открывает меню", async () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: ["NuxtImg", "RouterLink"],
      },
    });
    const burger = wrapper.find(".nav__burger");
    await burger.trigger("click");
    const menu = wrapper.find(".nav__menu");
    expect(menu.element.style.display).not.toBe("none");
  });

  it("клик по бургеру дважды закрывает меню", async () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: ["NuxtImg", "RouterLink"],
      },
    });
    const burger = wrapper.find(".nav__burger");
    await burger.trigger("click"); // открыть
    await burger.trigger("click"); // закрыть
    const menu = wrapper.find(".nav__menu");
    expect(menu.element.style.display).toBe("none");
  });

  it("рендерит все ссылки меню", () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          NuxtImg: true,
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });
    const links = wrapper.findAll(".menu__link");
    expect(links).toHaveLength(3);
    const linkTexts = links.map((link) => link.text());
    expect(linkTexts).toContain("Главное");
    expect(linkTexts).toContain("Мой плейлист");
    expect(linkTexts).toContain("Войти");
  });

  it('вызывает clearUser при клике "Выйти", если user есть', async () => {
    userStoreMock.user.value = { email: "test@mail.com" };
    await wrapper.find(".nav__burger").trigger("click");
    const lastItem = wrapper.findAll(".menu__item").at(-1);
    await lastItem.trigger("click");
    expect(userStoreMock.clearUser).toHaveBeenCalled();
  });
});
