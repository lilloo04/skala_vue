<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  ElAlert,
  ElButton,
  ElCard,
  ElTag,
} from 'element-plus'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'vue-router'

import { weatherData } from '../data/weatherApiData'
import { getCurrentWeather } from '../services/weatherApi'

const mapElement = ref(null)
const weatherList = ref([])
const selectedWeather = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const router = useRouter()

let map
const markers = []

const selectedUpdatedAt = computed(() => {
  if (!selectedWeather.value?.updatedAt) {
    return '관측 시각 정보 없음'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(selectedWeather.value.updatedAt)
})

const getTemperatureColor = (temperature) => {
  if (temperature >= 30) return '#dc2626'
  if (temperature >= 25) return '#f97316'
  if (temperature >= 20) return '#eab308'
  return '#0ea5e9'
}

const createMarker = (weather) => {
  const color = getTemperatureColor(weather.temp)
  const icon = L.divIcon({
    className: 'weather-marker-wrapper',
    html: `<span class="weather-marker" style="background-color: ${color}">${weather.temp}°</span>`,
    iconSize: [54, 34],
    iconAnchor: [27, 17],
  })
  const marker = L.marker([weather.lat, weather.lon], { icon })
    .addTo(map)
    .on('click', () => {
      selectedWeather.value = weather
    })

  markers.push(marker)
}

onMounted(async () => {
  map = L.map(mapElement.value).setView([36.3, 127.8], 7)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  try {
    weatherList.value = await Promise.all(
      weatherData.map((city) => getCurrentWeather(city)),
    )
    weatherList.value.forEach(createMarker)
    selectedWeather.value = weatherList.value[0] ?? null
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  map?.remove()
})
</script>

<template>
  <div class="map-page">
    <header class="map-header">
      <div>
        <p class="eyebrow">LIVE WEATHER MAP</p>
        <h1>전국 날씨 지도</h1>
        <p>도시를 선택해 현재 날씨를 확인하세요.</p>
      </div>

      <ElTag type="info" effect="plain">
        {{ weatherList.length }}개 지역
      </ElTag>
    </header>

    <ElAlert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      :closable="false"
    />

    <div v-if="isLoading" class="map-loading">
      전국 날씨 데이터를 불러오는 중입니다.
    </div>

    <div class="map-layout">
      <section ref="mapElement" class="weather-map" aria-label="전국 날씨 지도" />

      <ElCard
        v-if="selectedWeather"
        class="weather-summary"
        shadow="never"
      >
        <div class="summary-kicker">
          <span>선택한 지역</span>
          <ElTag type="success" effect="plain">실시간</ElTag>
        </div>

        <div class="summary-title">
          <div>
            <h2>{{ selectedWeather.name }}</h2>
            <p>{{ selectedWeather.status }}</p>
          </div>
          <span class="summary-icon">{{ selectedWeather.icon }}</span>
        </div>

        <div class="summary-temperature">
          <strong>{{ selectedWeather.temp }}°</strong>
          <span>현재 기온</span>
        </div>

        <div class="metric-grid">
          <div class="metric-tile">
            <span>체감온도</span>
            <strong>{{ selectedWeather.feelsLike }}℃</strong>
          </div>
          <div class="metric-tile">
            <span>습도</span>
            <strong>{{ selectedWeather.humidity }}%</strong>
          </div>
          <div class="metric-tile">
            <span>풍속</span>
            <strong>{{ selectedWeather.wind }}m/s</strong>
          </div>
          <div class="metric-tile">
            <span>강수 확률</span>
            <strong>
              {{ selectedWeather.rainProbability ?? '정보 없음' }}<span
                v-if="selectedWeather.rainProbability !== null"
              >%</span>
            </strong>
          </div>
        </div>

        <div class="summary-footer">
          <span>마지막 관측 {{ selectedUpdatedAt }}</span>
          <ElButton
            type="primary"
            plain
            size="small"
            @click="router.push(`/weather/${selectedWeather.id}`)"
          >
            상세보기
          </ElButton>
        </div>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  min-height: calc(100vh - 61px);
  padding: 36px 32px 48px;
  background: #eef6f7;
}

.map-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 1180px;
  margin: 0 auto 22px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.map-header h1 {
  margin: 0;
  color: #12343b;
  font-size: 36px;
}

.map-header p:last-child {
  margin-bottom: 0;
  color: #557178;
}

.map-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 20px;
  max-width: 1180px;
  margin: 0 auto;
}

.weather-map {
  min-height: 560px;
  overflow: hidden;
  border: 1px solid #c7dfe0;
  border-radius: 16px;
  background: #dbecef;
  box-shadow: 0 12px 28px rgb(18 52 59 / 10%);
}

.weather-summary {
  align-self: start;
  border-color: #c7dfe0;
  background: #eef6f7;
}

.summary-kicker,
.summary-title,
.summary-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-kicker {
  color: #6a858b;
  font-size: 12px;
  font-weight: 700;
}

.summary-title {
  align-items: flex-start;
  margin-top: 22px;
}

.summary-title h2 {
  margin: 0;
  color: #12343b;
  font-size: 26px;
}

.summary-title p {
  margin: 6px 0 0;
  color: #557178;
  text-transform: capitalize;
}

.summary-icon {
  font-size: 42px;
  line-height: 1;
}

.summary-temperature {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 26px 0 22px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5eff0;
}

.summary-temperature strong {
  color: #12343b;
  font-size: 64px;
  line-height: 0.9;
}

.summary-temperature span {
  color: #6a858b;
  font-size: 13px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.metric-tile {
  padding: 14px;
  border: 1px solid #e5eff0;
  border-radius: 10px;
  background: #f7fbfb;
}

.metric-tile span,
.metric-tile strong {
  display: block;
}

.metric-tile span {
  color: #6a858b;
  font-size: 12px;
}

.metric-tile strong {
  margin-top: 6px;
  color: #12343b;
  font-size: 17px;
}

.summary-footer {
  gap: 12px;
  margin-top: 22px;
  color: #8aa1a5;
  font-size: 11px;
}

.map-loading {
  max-width: 1180px;
  margin: 0 auto 16px;
  color: #557178;
}

:deep(.weather-marker-wrapper) {
  border: 0;
  background: transparent;
}

:deep(.weather-marker) {
  display: grid;
  width: 54px;
  height: 34px;
  place-items: center;
  border: 3px solid white;
  border-radius: 17px;
  color: white;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 3px 10px rgb(18 52 59 / 35%);
}

@media (max-width: 800px) {
  .map-page {
    padding: 28px 16px 36px;
  }

  .map-header {
    align-items: flex-start;
    gap: 16px;
  }

  .map-header h1 {
    font-size: 28px;
  }

  .map-layout {
    grid-template-columns: 1fr;
  }

  .weather-map {
    min-height: 440px;
  }
}
</style>
