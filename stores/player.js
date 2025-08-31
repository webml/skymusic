import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    // Текущий трек
    currentTrack: null,
    // Список треков
    playlist: [],
    // Играет ли сейчас
    isPlaying: false,
    // Прогресс воспроизведения (0-100)
    progress: 0,
    // Громкость (0-100)
    volume: 50,
    // Ссылка на аудиотег
    audioRef: null,
    isShuffle: false,
    isRepeat: false,
    originPlaylist: [],
  }),

  actions: {
    // Установить текущий трек
    setCurrentTrack(track) {
      this.currentTrack = track;
    },

    // Установить плейлист
    setPlaylist(tracks) {
      this.isShuffle = !this.isShuffle;
      this.originPlaylist = tracks;
      this.shufflePlaylist();
    },

    // Установить прогресс
    setProgress(progress) {
      this.progress = progress;
    },

    // Установить громкость
    setVolume(volume) {
      this.volume = volume;
    },

    // Установить состояние воспроизведения
    setPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },

    // Установить ссылку на аудиоэлемент
    setAudioRef(element) {
      this.audioRef = element;
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100;
      }
    },

    shufflePlaylist() {
      this.isShuffle = !this.isShuffle;

      if (this.isShuffle) {
        const copyPlaylist = [...this.originPlaylist];
        let currentIndex = copyPlaylist.length,
          randomIndex;

        while (currentIndex !== 0) {
          // Выбираем случайный элемент
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // Меняем его с текущим элементом
          [copyPlaylist[currentIndex], copyPlaylist[randomIndex]] = [
            copyPlaylist[randomIndex],
            copyPlaylist[currentIndex],
          ];
        }

        this.playlist = copyPlaylist;
      } else {
        this.playlist = this.originPlaylist;
      }
    },

    repeat() {
      this.isRepeat = !this.isRepeat;
    },
  },
});
