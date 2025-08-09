<template>
  <div class="centerblock__filter filter">
    <div class="filter__title">Искать по:</div>
    <div class="filter__group">
      <div
        class="filter__button button-author _btn-text"
        :class="{ active: activeFilter === 'author' }"
        @click="toggleFilter('author')"
      >
        исполнителю
      </div>
      <div v-show="activeFilter === 'author'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in authorItems"
            :key="item"
            class="filter__item"
            :class="{ active: selectedAuthors.includes(item) }"
            @click="toggleFilterItem('author', item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter__group">
      <div
        class="filter__button button-year _btn-text"
        :class="{ active: activeFilter === 'year' }"
        @click="toggleFilter('year')"
      >
        году выпуска
      </div>
      <div v-show="activeFilter === 'year'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in yearItems"
            :key="item"
            class="filter__item"
            :class="{ active: selectedYears.includes(item) }"
            @click="toggleFilterItem('year', item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter__group">
      <div
        class="filter__button button-genre _btn-text"
        :class="{ active: activeFilter === 'genre' }"
        @click="toggleFilter('genre')"
      >
        жанру
      </div>
      <div v-show="activeFilter === 'genre'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in genreItems"
            :key="item"
            class="filter__item"
            :class="{ active: selectedGenres.includes(item) }"
            @click="toggleFilterItem('genre', item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const { tracks } = defineProps({ tracks: { default: [], type: Array } });
const emit = defineEmits(["filter-selected"]);

const activeFilter = ref(null);

// Множественный выбор
const selectedAuthors = ref([]);
const selectedYears = ref([]);
const selectedGenres = ref([]);

// Переключение фильтра
const toggleFilter = (filter) => {
  activeFilter.value = activeFilter.value === filter ? null : filter;
};

// Добавление/удаление значения из фильтра
const toggleFilterItem = (type, value) => {
  const target = {
    author: selectedAuthors,
    year: selectedYears,
    genre: selectedGenres,
  }[type];

  if (!target) return;

  const index = target.value.indexOf(value);
  if (index === -1) {
    target.value.push(value);
  } else {
    target.value.splice(index, 1);
  }

  emitFilters();
};

// Передача выбранных значений в родительский компонент
const emitFilters = () => {
  emit("filter-selected", {
    authors: selectedAuthors.value,
    years: selectedYears.value,
    genres: selectedGenres.value,
  });
};

// Создание списков фильтров
const authorItems = computed(() => {
  if (!tracks) return [];
  const items = new Set();
  tracks.forEach((track) => track.author && items.add(track.author));
  return Array.from(items).sort((a, b) => {
    if (a === "Неизвестно") return 1;
    if (b === "Неизвестно") return -1;
    return a.localeCompare(b);
  });
});

const yearItems = computed(() => {
  if (!tracks) return [];
  const items = new Set();
  tracks.forEach((track) => {
    const year = track.release_date?.split("-")[0] || "Неизвестно";
    items.add(year);
  });
  return Array.from(items).sort((a, b) => {
    if (a === "Неизвестно") return 1;
    if (b === "Неизвестно") return -1;
    return b.localeCompare(a); // по убыванию
  });
});

const genreItems = computed(() => {
  if (!tracks) return [];
  const items = new Set();
  tracks.forEach((track) => {
    if (Array.isArray(track.genre)) {
      track.genre.forEach((g) => g && items.add(g.toLowerCase().trim()));
    } else if (track.genre) {
      items.add(track.genre.toLowerCase().trim());
    }
  });
  return Array.from(items).sort((a, b) => {
    if (a === "неизвестно") return 1;
    if (b === "неизвестно") return -1;
    return a.localeCompare(b);
  });
});
</script>

<style lang="scss" scoped>
.centerblock__filter {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 51px;
}
.filter__title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
}

.filter__button {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
}

.filter__button:not(:last-child) {
  margin-right: 10px;
}
._btn-text:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
  cursor: pointer;
}

._btn-icon:hover svg {
  fill: transparent;
  stroke: #acacac;
  cursor: pointer;
}

._btn-text:active {
  border-color: #ad61ff;
  color: #ad61ff;
  cursor: pointer;
}

._btn-icon:active svg {
  fill: transparent;
  stroke: #ffffff;
  cursor: pointer;
}

._btn-icon:active .track-play__like-svg,
._btn-icon:active .track-play__dislike-svg {
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
}

.filter__group {
  position: relative;
  margin-right: 10px;
}

.filter__dropdown {
  position: absolute;
  top: calc(100% + 6px); // немного отступает от кнопки
  left: 0;
  z-index: 1000;

  background-color: #313131;
  border-radius: 12px;
  padding: 12px 16px;
  max-height: 200px;
  overflow-y: auto;
  width: max-content;
  min-width: 180px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  // Scrollbar styles
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a5a;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.filter__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter__item {
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #d9b6ff;
  }

  &.active {
    color: #ad61ff;
    text-decoration: underline;
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>
