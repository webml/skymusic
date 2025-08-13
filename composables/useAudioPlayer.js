import { usePlayerStore } from "~/stores/player";

export function useAudioPlayer() {
  // Получаем store, чтобы менять данные в хранилище
  const playerStore = usePlayerStore();

  // Инициализируем плеер в самом начале
  const initPlayer = (element) => {
    if (!element) {
      console.error("Плеера нет :(");
      return;
    }
    playerStore.setAudioRef(element);
  };

  // Воспроизводим трек
  const playTrack = async (track) => {
    const audio = playerStore.audioRef;
    if (!audio) {
      console.error("Плеер не инициализирован");
      return;
    }

    try {
      const isSameTrack = playerStore.currentTrack?.id === track.id;

      // Если трек другой — загружаем новый
      if (!isSameTrack || audio.src !== track.track_file) {
        audio.src = track.track_file;
        playerStore.setCurrentTrack(track);
      }

      await audio.play();
      playerStore.setPlaying(true);
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
      playerStore.setPlaying(false);
    }
  };

  const pauseTrack = async () => {
    await playerStore.audioRef.pause();
    playerStore.setPlaying(false);
  };

  const playNextTrack = () => {
    const playlist = playerStore.playlist;
    const currentTrack = playerStore.currentTrack;

    if (!playlist || !playlist.length || !currentTrack) return;

    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = currentIndex + 1;

    if (nextIndex < playlist.length) {
      playTrack(playlist[nextIndex]);
    }
  };

  const playPrevTrack = () => {
    const playlist = playerStore.playlist;
    const currentTrack = playerStore.currentTrack;

    if (!playlist || !playlist.length || !currentTrack) return;

    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      playTrack(playlist[prevIndex]);
    }
  };

  // Обновляем прогресс трека
  const handleTimeUpdate = () => {
    if (!playerStore.audioRef) return;
    const currentTime = playerStore.audioRef.currentTime;
    const duration = playerStore.audioRef.duration;
    if (duration) {
      const progress = (currentTime / duration) * 100;
      playerStore.setProgress(progress);
    }
  };
  // Перематываем
  const seekTo = (percentage) => {
    if (!playerStore.audioRef || !playerStore.currentTrack) return;
    const newTime = (percentage / 100) * playerStore.audioRef.duration;
    playerStore.audioRef.currentTime = newTime;
    playerStore.setProgress(percentage);
  };

  // Меняем громкость
  const updateVolume = () => {
    if (!playerStore.audioRef) return;
    playerStore.audioRef.volume = playerStore.volume / 100;
  };

  return {
    initPlayer,
    playTrack,
    pauseTrack,
    playPrevTrack,
    playNextTrack,
    handleTimeUpdate,
    seekTo,
    updateVolume,
  };
}
