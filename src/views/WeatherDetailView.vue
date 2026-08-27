<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import {
  RouterLink,
  useRoute,
} from 'vue-router'

import { weatherData } from '../data/weatherApiData'
import { getCityWeather } from '../services/weatherApi'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()

// Pinia Store 불러오기
const configStore = useConfigStore()

const {
  unitSymbol,
  convertTemperature,
} = storeToRefs(configStore)

const selectedWeather = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  const cityId = route.params.cityId
  const city = weatherData.find(
    (weather) => weather.id === cityId,
  )

  if (!city) {
    isLoading.value = false
    return
  }

  try {
    selectedWeather.value = await getCityWeather(city)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="detail-page">
    <p v-if="isLoading" class="message">
      실제 날씨 데이터를 불러오는 중입니다.
    </p>

    <section v-else-if="errorMessage" class="not-found">
      <h1>날씨 정보를 불러올 수 없습니다.</h1>
      <p>{{ errorMessage }}</p>
      <RouterLink to="/" class="back-link">
        날씨 대시보드로 돌아가기
      </RouterLink>
    </section>

    <section
      v-else-if="selectedWeather"
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
            {{ selectedWeather.rainProbability ?? '정보 없음' }}<span
              v-if="selectedWeather.rainProbability !== null"
            >%</span>
          </strong>
        </div>

        <div
          v-if="selectedWeather.airQuality"
          class="detail-item"
        >
          <span>대기질 AQI</span>
          <strong>{{ selectedWeather.airQuality.aqi ?? '정보 없음' }}</strong>
        </div>

        <div
          v-if="selectedWeather.airQuality"
          class="detail-item"
        >
          <span>초미세먼지</span>
          <strong>{{ selectedWeather.airQuality.pm25 ?? '정보 없음' }} μg/m³</strong>
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

.message {
  max-width: 600px;
  margin: 0 auto;
  color: #475569;
  text-align: center;
}
</style>