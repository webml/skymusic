<template>
  <h2 class="centerblock__h2">Треки</h2>
  <FilterControls :tracks="tracks" @filter-selected="handleFilter" />
  <PlaylistContent
    :tracks="filteredTracks"
    :loading="isLoading"
    :error="error"
  />
</template>

<script setup>
const store = useTracksStore();
const { tracks, filteredTracks, isLoading, error } = storeToRefs(store);

const handleFilter = ({ authors, years, genres }) => {
  store.setFilters({ authors, years, genres });
};
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
