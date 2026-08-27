<script setup>
import { computed, ref } from 'vue'

import { weatherData } from '../../data/weatherData'

const weatherList = ref(weatherData)

const searchText = ref('')
const selectedMessage = ref('도시를 선택해 주세요.')

// 한글 검색어 입력
const handleInput = (event) => {
  searchText.value = event.target.value
}

// 검색 결과
const filteredWeatherList = computed(() => {
  if (!searchText.value.trim()) {
    return weatherList.value
  }

  return weatherList.value.filter((weather) =>
    weather.name.includes(searchText.value.trim()),
  )
})

// 카드 선택
const selectCity = (cityName) => {
  selectedMessage.value = `${cityName}이(가) 선택되었습니다.`
}

// 상세보기
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-page">
    <header class="weather-header">
      <h1>오늘의 날씨</h1>
      <p>지역별 날씨 현황을 확인해 보세요.</p>
    </header>

    <!-- 양방향 바인딩 및 한글 입력 -->
    <section class="search-section">
      <input
        type="text"
        :value="searchText"
        @input="handleInput"
        placeholder="도시 이름을 입력하세요"
      />

      <p>
        입력한 도시명:
        <strong>{{ searchText || '없음' }}</strong>
      </p>
    </section>

    <!-- 선택 상태 표시 -->
    <div class="status-bar">
      {{ selectedMessage }}
    </div>

    <!-- 배열 렌더링 -->
    <section class="weather-grid">
      <article
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        class="weather-card"
        @click="selectCity(weather.name)"
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

        <p class="temperature">
          {{ weather.temp }}℃
        </p>

        <!-- 조건부 렌더링 -->
        <p v-if="weather.temp >= 25" class="temperature-label hot">
          🔥 더움 (25도 이상)
        </p>

        <p v-else class="temperature-label cool">
          ❄️ 선선함 (25도 미만)
        </p>

        <!-- 본인만의 추가 데이터 -->
        <p class="humidity">
          💧 습도 {{ weather.humidity }}%
        </p>

        <!-- .stop으로 카드 클릭 이벤트 버블링 방지 -->
        <button
          type="button"
          @click.stop="showDetail(weather.name, weather.status)"
        >
          상세보기
        </button>
      </article>
    </section>

    <p v-if="filteredWeatherList.length === 0" class="empty-message">
      검색 결과가 없습니다.
    </p>
  </div>
</template>

<style scoped>
.weather-page {
  min-height: 100vh;
  padding: 40px 20px;
  color: #1f2937;
  background: linear-gradient(135deg, #dbeafe, #f0f9ff);
}

.weather-header {
  margin-bottom: 30px;
  text-align: center;
}

.weather-header h1 {
  margin-bottom: 8px;
  font-size: 36px;
}

.weather-header p {
  color: #64748b;
}

.search-section {
  max-width: 600px;
  margin: 0 auto 20px;
  text-align: center;
}

.search-section input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 18px;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
}

.search-section input:focus {
  border-color: #3b82f6;
}

.search-section p {
  margin-top: 10px;
}

.status-bar {
  max-width: 600px;
  margin: 0 auto 24px;
  padding: 12px;
  border-radius: 10px;
  color: white;
  text-align: center;
  background-color: #2563eb;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

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

.empty-message {
  margin-top: 40px;
  text-align: center;
  color: #64748b;
}
</style>