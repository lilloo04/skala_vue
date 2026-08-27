<script setup>
import {
  computed,
  ref,
  watch,
  watchEffect,
} from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '../components/hands-on/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/hands-on/exercise/SearchBar.vue'
import WeatherCard from '../components/hands-on/exercise/WeatherCard.vue'
import HotFilter from '../components/hands-on/exercise/HotFilter.vue'

const router = useRouter()

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

const searchQuery = ref('')
const selectedCityInfo = ref(
  '도시를 선택해 주세요.',
)
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

const updateSearchQuery = (query) => {
  searchQuery.value = query
}

const updateHotFilter = (checked) => {
  showHotOnly.value = checked
}

const selectCity = (weather) => {
  selectedCityInfo.value =
    `${weather.name}이(가) 선택되었습니다. ` +
    `현재 기온은 ${weather.temp}℃입니다.`
}

// alert 대신 상세 페이지로 이동
const showDetail = (weather) => {
  router.push(`/weather/${weather.id}`)
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
    console.log(
      '더운 도시만 보기 기능이 켜졌습니다.',
    )
  } else {
    console.log(
      '전체 도시 보기로 변경되었습니다.',
    )
  }
})
</script>

<template>
  <div class="weather-page">
    <header class="weather-header">
      <h1>오늘의 날씨</h1>
      <p>지역별 날씨 현황을 확인해 보세요.</p>
    </header>

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
  box-sizing: border-box;
  width: 100%;
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