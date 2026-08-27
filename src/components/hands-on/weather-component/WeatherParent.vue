<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import HotFilter from './HotFilter.vue'
import { weatherData } from '../../../data/weatherData'

const weatherList = ref(weatherData)

const searchQuery = ref('')
const selectedCityInfo = ref('도시를 선택해 주세요.')
const showHotOnly = ref(false)

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((weather) =>
    weather.name.includes(query),
  )
})

const displayedWeatherList = computed(() => {
  if (showHotOnly.value) {
    return filteredWeatherList.value.filter(
      (weather) => weather.temp >= 25,
    )
  }

  return filteredWeatherList.value
})

// SearchBar가 보낸 검색어 처리
const updateSearchQuery = (query) => {
  searchQuery.value = query
}

// HotFilter가 보낸 체크 상태 처리
const updateHotFilter = (checked) => {
  showHotOnly.value = checked
}

// WeatherCard가 보낸 도시 객체 처리
const selectCity = (weather) => {
  selectedCityInfo.value =
    `${weather.name}이(가) 선택되었습니다. ` +
    `현재 기온은 ${weather.temp}℃입니다.`
}

// WeatherCard가 보낸 상세보기 이벤트 처리
const showDetail = (weather) => {
  window.alert(
    `${weather.name}의 현재 날씨는 ` +
    `[${weather.status}] 상태입니다.`,
  )
}

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log('이전 상태바:', oldValue)
  console.log('변경된 상태바:', newValue)
})

watchEffect(() => {
  console.log('현재 검색어:', searchQuery.value)
})

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

    <!-- 검색박스 공통 컴포넌트 -->
    <BaseDashboardCard variant="search">
      <SearchBar
        :search-query="searchQuery"
        @update-query="updateSearchQuery"
      />

      <HotFilter
        :show-hot-only="showHotOnly"
        @update-hot-filter="updateHotFilter"
      />
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>

    <!-- 리스트박스 공통 컴포넌트 -->
    <BaseDashboardCard variant="list">
      <section
        v-if="displayedWeatherList.length > 0"
        class="weather-grid"
      >
        <WeatherCard
          v-for="weather in displayedWeatherList"
          :key="weather.id"
          :weather="weather"
          @select-card="selectCity"
          @click-detail="showDetail"
        />
      </section>

      <p
        v-else-if="searchQuery.trim()"
        class="empty-message"
      >
        검색 결과와 일치하는 도시가 없습니다.
      </p>

      <p v-else class="empty-message">
        조건에 해당하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>
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
  grid-template-columns: repeat(
    auto-fit,
    minmax(230px, 1fr)
  );
  gap: 20px;
}

.empty-message {
  margin: 20px 0;
  color: #64748b;
  text-align: center;
}
</style>