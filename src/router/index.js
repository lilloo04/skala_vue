import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'weather-home',
    component: () => import(
      '../views/WeatherHomeView.vue'
    ),
  },
  {
    path: '/about',
    name: 'weather-about',
    component: () => import(
      '../views/WeatherAboutView.vue'
    ),
  },
  {
    path: '/map',
    name: 'national-weather-map',
    component: () => import(
      '../views/NationalWeatherMapView.vue'
    ),
  },
  {
    path: '/weather/:cityId',
    name: 'weather-detail',
    component: () => import(
      '../views/WeatherDetailView.vue'
    ),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(
      '../views/NotFoundView.vue'
    ),
  },
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL,
  ),
  routes,
})

export default router