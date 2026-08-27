<script setup>
import { onMounted, ref } from 'vue'
import {
  RouterLink,
  useRoute,
} from 'vue-router'

const route = useRoute()
const selectedWeather = ref(null)

const weatherDetailList = [
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 45,
    icon: '☀️',
    wind: 2.4,
    rainProbability: 10,
    feelsLike: 30,
    observation: '서울 종로구 관측소',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 80,
    icon: '🌧️',
    wind: 3.8,
    rainProbability: 80,
    feelsLike: 25,
    observation: '수원 권선구 관측소',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 65,
    icon: '☁️',
    wind: 4.5,
    rainProbability: 30,
    feelsLike: 27,
    observation: '부산 중구 관측소',
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 29,
    status: '맑음',
    humidity: 70,
    icon: '🌤️',
    wind: 5.2,
    rainProbability: 20,
    feelsLike: 31,
    observation: '제주 제주시 관측소',
  },
  {
    id: 'city_05',
    name: '대전',
    temp: 23,
    status: '비',
    humidity: 75,
    icon: '🌧️',
    wind: 3.1,
    rainProbability: 70,
    feelsLike: 23,
    observation: '대전 유성구 관측소',
  },
  {
    id: 'city_06',
    name: '광주',
    temp: 27,
    status: '맑음',
    humidity: 60,
    icon: '☀️',
    wind: 2.8,
    rainProbability: 10,
    feelsLike: 29,
    observation: '광주 북구 관측소',
  },
  {
    id: 'city_07',
    name: '인천',
    temp: 22,
    status: '흐림',
    humidity: 55,
    icon: '☁️',
    wind: 4.7,
    rainProbability: 40,
    feelsLike: 21,
    observation: '인천 중구 관측소',
  },
  {
    id: 'city_08',
    name: '대구',
    temp: 30,
    status: '맑음',
    humidity: 50,
    icon: '☀️',
    wind: 1.9,
    rainProbability: 10,
    feelsLike: 32,
    observation: '대구 동구 관측소',
  },
]

onMounted(() => {
  const cityId = route.params.cityId

  selectedWeather.value =
    weatherDetailList.find(
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

      <p class="temperature">
        {{ selectedWeather.temp }}℃
      </p>

      <p class="status">
        현재 날씨: {{ selectedWeather.status }}
      </p>

      <div class="detail-grid">
        <div class="detail-item">
          <span>체감온도</span>
          <strong>
            {{ selectedWeather.feelsLike }}℃
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

      <RouterLink to="/" class="back-link">
        날씨 대시보드로 돌아가기
      </RouterLink>
    </section>

    <section v-else class="not-found">
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <p>존재하지 않는 도시 코드입니다.</p>

      <RouterLink to="/" class="back-link">
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
  background: linear-gradient(135deg, #dbeafe, #f0f9ff);
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