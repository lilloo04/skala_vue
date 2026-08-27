const OPEN_WEATHER_BASE_URL =
  'https://api.openweathermap.org/data/2.5'

const OPEN_METEO_AIR_QUALITY_URL =
  'https://air-quality-api.open-meteo.com/v1/air-quality'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getJson = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    let detail = ''

    try {
      const errorData = await response.json()
      detail = errorData.message ? ` ${errorData.message}` : ''
    } catch {
      // 응답이 JSON이 아닌 경우 상태 코드만 사용합니다.
    }

    throw new Error(
      `API 요청에 실패했습니다. (${response.status})${detail}`,
    )
  }

  return response.json()
}

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 600) return '🌧️'
  if (weatherId >= 600 && weatherId < 700) return '❄️'
  if (weatherId >= 700 && weatherId < 800) return '🌫️'
  if (weatherId === 800) return '☀️'
  if (weatherId > 800) return '☁️'
  return '🌤️'
}

const requireApiKey = () => {
  if (!apiKey) {
    throw new Error(
      'VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.',
    )
  }
}

export const getCurrentWeather = async (city) => {
  requireApiKey()

  const params = new URLSearchParams({
    lat: String(city.lat),
    lon: String(city.lon),
    appid: apiKey,
    units: 'metric',
    lang: 'kr',
  })
  const data = await getJson(
    `${OPEN_WEATHER_BASE_URL}/weather?${params}`,
  )
  const weather = data.weather?.[0]

  return {
    ...city,
    name: data.name || city.name,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    status: weather?.description || '정보 없음',
    humidity: data.main.humidity,
    icon: getWeatherIcon(weather?.id),
    wind: data.wind?.speed ?? 0,
    rainProbability: null,
    observation: `${data.name || city.name} 현재 관측`,
    updatedAt: new Date(data.dt * 1000),
  }
}

export const getAirQuality = async (city) => {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current: 'us_aqi,pm2_5',
    timezone: 'Asia/Seoul',
  })
  const data = await getJson(
    `${OPEN_METEO_AIR_QUALITY_URL}?${params}`,
  )

  return {
    aqi: data.current?.us_aqi ?? null,
    pm25: data.current?.pm2_5 ?? null,
  }
}

export const getCityWeather = async (city) => {
  const weather = await getCurrentWeather(city)

  try {
    const airQuality = await getAirQuality(city)
    return { ...weather, airQuality }
  } catch {
    return { ...weather, airQuality: null }
  }
}
