<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 45,
    icon: '☀️',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 80,
    icon: '🌧️',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 65,
    icon: '☁️',
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 29,
    status: '맑음',
    humidity: 70,
    icon: '🌤️',
  },
  {
    id: 'city_05',
    name: '대전',
    temp: 23,
    status: '비',
    humidity: 75,
    icon: '🌧️',
  },
  {
    id: 'city_06',
    name: '광주',
    temp: 27,
    status: '맑음',
    humidity: 60,
    icon: '☀️',
  },
  {
    id: 'city_07',
    name: '인천',
    temp: 22,
    status: '흐림',
    humidity: 55,
    icon: '☁️',
  },
  {
    id: 'city_08',
    name: '대구',
    temp: 30,
    status: '맑음',
    humidity: 50,
    icon: '☀️',
  },
])

// 과제 요구사항 1: 반응형 상태
const searchQuery = ref('')
const selectedCityInfo = ref('도시를 선택해 주세요.')

// 본인만의 반응형 상태
const showHotOnly = ref(false)

// 한글 검색어 입력
const handleInput = (event) => {
  searchQuery.value = event.target.value
}

// 과제 요구사항 2: 검색 결과 Computed
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  // 검색어가 비었을 때 원본 데이터 반환
  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((weather) =>
    weather.name.includes(query),
  )
})

// 본인만의 Computed
const displayedWeatherList = computed(() => {
  if (showHotOnly.value) {
    return filteredWeatherList.value.filter(
      (weather) => weather.temp >= 25,
    )
  }

  return filteredWeatherList.value
})

// 도시 카드 선택
const selectCity = (weather) => {
  selectedCityInfo.value =
    `${weather.name}이(가) 선택되었습니다. ` +
    `현재 기온은 ${weather.temp}℃입니다.`
}

// 상세보기
const showDetail = (cityName, status) => {
  window.alert(
    `${cityName}의 현재 날씨는 [${status}] 상태입니다.`,
  )
}

// 과제 요구사항 3-1: 선택된 도시 감시
watch(selectedCityInfo, (newValue, oldValue) => {
  console.log('이전 상태바:', oldValue)
  console.log('변경된 상태바:', newValue)
})

// 과제 요구사항 3-2: 검색어 자동 감시
watchEffect(() => {
  console.log('현재 검색어:', searchQuery.value)
})

// 본인만의 Watcher
watch(showHotOnly, (newValue) => {
  if (newValue) {
    console.log('더운 도시만 보기 기능이 켜졌습니다.')
  } else {
    console.log('전체 도시 보기로 변경되었습니다.')
  }
})
</script>

<template>
  <div class="weather-page">
    <header class="weather-header">
      <h1>오늘의 날씨</h1>
      <p>지역별 날씨 현황을 확인해 보세요.</p>
    </header>

    <section class="search-section">
      <input
        type="text"
        :value="searchQuery"
        @input="handleInput"
        placeholder="도시 이름을 입력하세요"
      />

      <p>
        입력한 도시명:
        <strong>{{ searchQuery || '없음' }}</strong>
      </p>

      <!-- 본인만의 반응형 상태 -->
      <label class="hot-filter">
        <input v-model="showHotOnly" type="checkbox" />
            더운 도시만 보기 🔥
      </label>
    </section>

    <!-- 선택된 도시 상태바 -->
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>

    <!-- 검색 결과 또는 원본 데이터 출력 -->
    <section
      v-if="displayedWeatherList.length > 0"
      class="weather-grid"
    >
      <article
        v-for="weather in displayedWeatherList"
        :key="weather.id"
        class="weather-card"
        @click="selectCity(weather)"
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

        <p
          v-if="weather.temp >= 25"
          class="temperature-label hot"
        >
          🔥 더움 (25도 이상)
        </p>

        <p
          v-else
          class="temperature-label cool"
        >
          ❄️ 선선함 (25도 미만)
        </p>

        <p class="humidity">
          💧 습도 {{ weather.humidity }}%
        </p>

        <button
          type="button"
          @click.stop="
            showDetail(weather.name, weather.status)
          "
        >
          상세보기
        </button>
      </article>
    </section>

    <!-- 일치하는 검색 결과가 없을 때 -->
    <p
      v-else-if="searchQuery.trim()"
      class="empty-message"
    >
      검색 결과와 일치하는 도시가 없습니다.
    </p>

    <!-- 더운 도시만 보기 결과가 없을 때 -->
    <p
      v-else
      class="empty-message"
    >
      조건에 해당하는 도시가 없습니다.
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

.hot-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
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