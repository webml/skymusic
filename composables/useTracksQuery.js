export const useTracksQuery = () => {
  const { setTracks, setLoading, setError } = useTracksStore();

  const fetchTracks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/catalog/track/all/`);
      if (!response.ok) {
        throw new Error("Не удалось получить треки");
      }
      const data = await response.json();
      setTracks(data.data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Ошибка при загрузке треков :("
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchTracks,
  };
};
