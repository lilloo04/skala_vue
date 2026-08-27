<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '../components/hands-on/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/hands-on/exercise/SearchBar.vue'
import WeatherCard from '../components/hands-on/exercise/WeatherCard.vue'
import HotFilter from '../components/hands-on/exercise/HotFilter.vue'
import { weatherData } from '../data/weatherApiData'
import { getCurrentWeather } from '../services/weatherApi'
import { useConfigStore } from '../stores/configStore'

const router = useRouter()

// Pinia Store
const configStore = useConfigStore()

const {
  unitSymbol,
  convertTemperature,
} = storeToRefs(configStore)

const weatherList = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const searchQuery = ref('')
const selectedCity = ref(null)
const showHotOnly = ref(false)

// 선택한 도시와 온도 단위가 변경될 때마다 다시 계산
const selectedCityInfo = computed(() => {
  if (!selectedCity.value) {
    return '도시를 선택해 주세요.'
  }

  const weather = selectedCity.value
  const temperature =
    convertTemperature.value(weather.temp)

  return (
    `${weather.name}이(가) 선택되었습니다. ` +
    `현재 기온은 ${temperature}` +
    `${unitSymbol.value}입니다.`
  )
})

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
  selectedCity.value = weather
}

// 상세 페이지로 이동
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

onMounted(async () => {
  try {
    weatherList.value = await Promise.all(
      weatherData.map((city) => getCurrentWeather(city)),
    )
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="weather-page">
    <header class="weather-header">
      <h1>오늘의 날씨</h1>

      <p>
        지역별 날씨 현황을 확인해 보세요.
      </p>
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

    <p v-if="isLoading" class="message">
      실제 날씨 데이터를 불러오는 중입니다.
    </p>

    <p v-else-if="errorMessage" class="message error-message">
      {{ errorMessage }}
      <br />
      .env 파일에 OpenWeatherMap API 키를 설정해 주세요.
    </p>

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

      <p
        v-else
        class="empty-message"
      >
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
  background: linear-gradient(
    135deg,
    #dbeafe,
    #f0f9ff
  );
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

.message {
  max-width: 1040px;
  margin: 20px auto;
  color: #475569;
  text-align: center;
}

.error-message {
  color: #b91c1c;
}
</style>