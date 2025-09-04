<template>
  <div class="playlist__item" :class="{ 'playlist__item--active': isActive }">
    <div class="playlist__track track">
      <div class="track__title" @click="setTrack">
        <div class="track__title-image">
          <svg
            class="track__title-svg"
            :class="{
              'track__title-svg--playing': isActive && isPlaying,
            }"
          >
            <use xlink:href="/assets/icons/sprite.svg#icon-note" />
          </svg>
        </div>
        <div class="track__title-text">
          <a class="track__title-link" href="http://"
            >{{ track.name }}
            <span class="track__title-span">{{ track.desc }}</span></a
          >
        </div>
      </div>
      <div class="track__author">
        <a class="track__author-link" href="http://">{{ track.author }}</a>
      </div>
      <div class="track__album">
        <a class="track__album-link" href="http://">{{ track.album }}</a>
      </div>
      <div class="track__time">
        <svg class="track__time-svg">
          <use xlink:href="/assets/icons/sprite.svg#icon-like" />
        </svg>
        <span class="track__time-text">{{
          formatDuration(track.duration_in_seconds)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { track, tracks } = defineProps({
  track: {
    type: {
      _id: Number,
      name: String,
      album: String,
      duration_in_seconds: String,
      desc: String,
      author: [String],
    },
    default: null,
  },
  tracks: Array,
});

const player = usePlayerStore();
const { currentTrack, isPlaying } = storeToRefs(player);
const { setPlaylist } = player;

const { playTrack } = useAudioPlayer();

const setTrack = () => {
  playTrack(track);
  setPlaylist(tracks);
};

const isActive = computed(() => {
  const currId = currentTrack.value?._id;
  return currId != null && String(currId) === String(track._id);
});
</script>

<style lang="scss" scoped>
.playlist__item {
  width: 100%;
  display: block;
  margin-bottom: 12px;
}

.playlist__item--active {
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
}

.playlist__track {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.track__title {
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
  width: 447px;
}

.track__title-image {
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 17px;
}

.track__title-svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    stroke: #4e4e4e;
  }
  50% {
    transform: scale(1.2);
    stroke: #ffffff;
  }
  100% {
    transform: scale(1);
    stroke: #4e4e4e;
  }
}

.track__title-svg--playing {
  animation: pulse 1s infinite;
}

.track__title-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.track__title-span {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
}

.track__author {
  width: 321px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.track__author-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
}

.track__album {
  width: 245px;
}

.track__album-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
}

.track__time-svg {
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
}

.track__time-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
}
</style>
