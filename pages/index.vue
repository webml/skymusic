<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="wrapper">
    <div class="container">
      <main class="main">
        <NavBar />
        <div class="main__centerblock centerblock">
          <div class="centerblock__search search">
            <svg class="search__svg">
              <use xlink:href="/assets/icons/sprite.svg#icon-search" />
            </svg>
            <input
              class="search__text"
              type="search"
              placeholder="Поиск"
              name="search"
            />
          </div>
          <h2 class="centerblock__h2">Треки</h2>
          <FilterControls :tracks="tracks" @filter-selected="handleFilter" />
          <PlaylistContent
            :tracks="filteredTracks"
            :loading="loading"
            :error="error"
          />
        </div>
        <SideBar />
      </main>
      <PlayerBar />
      <footer class="footer" />
    </div>
  </div>
</template>

<script setup>
const {
  data: response,
  loading,
  error,
} = await useFetch(
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/"
);

const tracks = computed(() => response.value?.data || []);

const filteredTracks = ref(tracks.value);

const handleFilter = ({ authors, years, genres }) => {
  filteredTracks.value = tracks.value.filter(
    (el) =>
      (authors.length > 0 ? authors.includes(el.author) : true) &&
      (years.length > 0
        ? years.includes(el.release_date?.split("-")[0])
        : true) &&
      (genres.length > 0
        ? Array.isArray(el.genre)
          ? el.genre.some((g) => genres.includes(g.toLowerCase().trim()))
          : genres.includes(el.genre?.toLowerCase().trim())
        : true)
  );
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
}

.container {
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
}
.main {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.main__centerblock {
  width: auto;
  -webkit-box-flex: 3;
  -ms-flex-positive: 3;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
}
.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
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
}
.centerblock__h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
}
.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
}
.search__text {
  -webkit-box-flex: 100;
  -ms-flex-positive: 100;
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.search__text::-webkit-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text:-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
