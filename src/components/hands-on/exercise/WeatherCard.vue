<script setup>
import { storeToRefs } from 'pinia'

import { useConfigStore } from '../../../stores/configStore'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'select-card',
  'click-detail',
])

const configStore = useConfigStore()

const {
  unitSymbol,
  convertTemperature,
} = storeToRefs(configStore)

const selectCard = () => {
  emit('select-card', props.weather)
}

const clickDetail = () => {
  emit('click-detail', props.weather)
}
</script>

<template>
  <article
    class="weather-card"
    @click="selectCard"
  >
    <!-- 기존 카드 내용 -->

    <div class="card-top">
      <div>
        <h2>{{ weather.name }}</h2>
        <p class="weather-status">
          {{ weather.status }}
        </p>
      </div>

      <span class="weather-icon">
        {{ weather.icon }}
      </span>
    </div>

    <p class="temperature">
      {{ convertTemperature(weather.temp) }}{{ unitSymbol }}
    </p>

    <p
      v-if="weather.temp >= 25"
      class="temperature-label hot"
    >
      🔥 더움
      ({{ convertTemperature(25) }}{{ unitSymbol }} 이상)
    </p>

    <p
      v-else
      class="temperature-label cool"
    >
      ❄️ 선선함
      ({{ convertTemperature(25) }}{{ unitSymbol }} 미만)
    </p>

    <p class="humidity">
      💧 습도 {{ weather.humidity }}%
    </p>

    <button
      type="button"
      @click.stop="clickDetail"
    >
      상세보기
    </button>
  </article>
</template>

<style scoped>
.weather-card {
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background-color: white;
  box-shadow: 0 8px 24px rgb(15 23 42 / 8%);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgb(15 23 42 / 15%);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card-top h2 {
  margin: 0;
}
</style>