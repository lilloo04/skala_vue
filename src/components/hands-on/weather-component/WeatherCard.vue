<script setup>
import { storeToRefs } from 'pinia'

import { useConfigStore } from '../../stores/configStore'

// 부모로부터 날씨 정보 받기
const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

// 부모에게 이벤트 전달
const emit = defineEmits([
  'select-card',
  'click-detail',
])

// Pinia Store 불러오기
const configStore = useConfigStore()

// Store의 getter를 반응형으로 꺼내기
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

    <!-- 현재 설정된 단위로 온도 출력 -->
    <p class="temperature">
      {{ convertTemperature(weather.temp) }}{{ unitSymbol }}
    </p>

    <!-- 더움 여부는 원본 섭씨 온도로 판단 -->
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

.weather-status {
  color: #64748b;
}

.weather-icon {
  font-size: 42px;
}

.temperature {
  margin: 20px 0 10px;
  font-size: 38px;
  font-weight: bold;
}

.temperature-label {
  display: inline-block;
  padding: 7px 10px;
  border-radius: 8px;
  font-weight: bold;
}

.hot {
  color: #dc2626;
  background-color: #fee2e2;
}

.cool {
  color: #2563eb;
  background-color: #dbeafe;
}

.humidity {
  color: #475569;
}

button {
  width: 100%;
  margin-top: 14px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #0f172a;
  cursor: pointer;
}

button:hover {
  background-color: #334155;
}
</style>