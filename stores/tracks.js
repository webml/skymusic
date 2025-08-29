export const useTracksStore = defineStore("tracks", {
  state: () => ({
    tracks: [],
    isLoading: false,
    error: null,
    filters: {
      authors: [],
      years: [],
      genres: [],
    },
  }),

  getters: {
    filteredTracks: (state) => {
      return state.tracks.filter(
        (el) =>
          (state.filters.authors.length
            ? state.filters.authors.includes(el.author)
            : true) &&
          (state.filters.years.length
            ? state.filters.years.includes(el.release_date?.split("-")[0])
            : true) &&
          (state.filters.genres.length
            ? Array.isArray(el.genre)
              ? el.genre.some((g) =>
                  state.filters.genres.includes(g.toLowerCase().trim())
                )
              : state.filters.genres.includes(el.genre?.toLowerCase().trim())
            : true)
      );
    },
  },

  actions: {
    setTracks(tracks) {
      this.tracks = tracks;
    },
    setLoading(value) {
      this.isLoading = value;
    },
    setError(error) {
      this.error = error;
    },
    setFilters(filters) {
      this.filters = filters;
    },
  },
});
