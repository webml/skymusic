<template>
  <h2 class="centerblock__h2">Избранное</h2>
  <FilterControls :tracks="tracks" @filter-selected="handleFilter" />
  <PlaylistContent
    :tracks="filteredTracks"
    :loading="isLoading || loading"
    :error="error || tracksError"
  />
</template>

<script setup>
const {
  data: response,
  loading,
  error,
} = await useFetch(API_URL + "catalog/track/favorite/all/");

const playlistTitle = computed(() => response.value.data.name || "Tреки");

const store = useTracksStore();
const { tracks, isLoading, error: tracksError } = storeToRefs(store);
const handleFilter = ({ authors, years, genres }) => {
  store.setFilters({ authors, years, genres });
};

const filteredTracks = tracks.value.filter((el) =>
  response.value.data.items.includes(el._id)
);

watch(
  playlistTitle,
  (newTitle) => {
    useHead({
      title: `${newTitle || "Skypro.Music"} | Skypro.Music`,
    });
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.centerblock__h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
}
</style>
