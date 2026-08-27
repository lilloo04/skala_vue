<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import {
  RouterLink,
  useRoute,
} from 'vue-router'

import { weatherData } from '../data/weatherData'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()

// Pinia Store 불러오기
const configStore = useConfigStore()

const {
  unitSymbol,
  convertTemperature,
} = storeToRefs(configStore)

const selectedWeather = ref(null)

onMounted(() => {
  const cityId = route.params.cityId

  selectedWeather.value =
    weatherData.find(
      (weather) => weather.id === cityId,
    ) ?? null
})
</script>

<template>
  <main class="detail-page">
    <section
      v-if="selectedWeather"
      class="detail-card"
    >
      <div class="detail-header">
        <div>
          <p class="observation">
            {{ selectedWeather.observation }}
          </p>

          <h1>
            {{ selectedWeather.name }}
          </h1>
        </div>

        <span class="weather-icon">
          {{ selectedWeather.icon }}
        </span>
      </div>

      <!-- 현재 기온 -->
      <p class="temperature">
        {{ convertTemperature(
          selectedWeather.temp,
        ) }}{{ unitSymbol }}
      </p>

      <p class="status">
        현재 날씨: {{ selectedWeather.status }}
      </p>

      <div class="detail-grid">
        <div class="detail-item">
          <span>체감온도</span>

          <strong>
            {{ convertTemperature(
              selectedWeather.feelsLike,
            ) }}{{ unitSymbol }}
          </strong>
        </div>

        <div class="detail-item">
          <span>습도</span>

          <strong>
            {{ selectedWeather.humidity }}%
          </strong>
        </div>

        <div class="detail-item">
          <span>풍속</span>

          <strong>
            {{ selectedWeather.wind }}m/s
          </strong>
        </div>

        <div class="detail-item">
          <span>강수 확률</span>

          <strong>
            {{ selectedWeather.rainProbability }}%
          </strong>
        </div>
      </div>

      <RouterLink
        to="/"
        class="back-link"
      >
        날씨 대시보드로 돌아가기
      </RouterLink>
    </section>

    <section
      v-else
      class="not-found"
    >
      <h1>
        도시 정보를 찾을 수 없습니다.
      </h1>

      <p>
        존재하지 않는 도시 코드입니다.
      </p>

      <RouterLink
        to="/"
        class="back-link"
      >
        날씨 대시보드로 돌아가기
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  box-sizing: border-box;
  min-height: calc(100vh - 61px);
  padding: 60px 20px;
  background: linear-gradient(
    135deg,
    #dbeafe,
    #f0f9ff
  );
}

.detail-card,
.not-found {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  border: 1px solid #dbeafe;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 12px 30px rgb(15 23 42 / 12%);
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.observation {
  margin: 0;
  color: #64748b;
}

.detail-header h1 {
  margin: 8px 0;
  font-size: 36px;
}

.weather-icon {
  font-size: 64px;
}

.temperature {
  margin: 24px 0 8px;
  font-size: 56px;
  font-weight: bold;
}

.status {
  color: #475569;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 30px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: 12px;
  background-color: #eff6ff;
}

.detail-item span {
  color: #64748b;
}

.back-link {
  display: block;
  padding: 12px;
  border-radius: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  background-color: #2563eb;
}

.not-found {
  text-align: center;
}
</style>