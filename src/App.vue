<script setup>
// hands-on

// 1일차 Hands On 과제1
// import WeatherMockup from './components/hands-on/WeatherMockup.vue'

// 2일차 Hands On 과제2
// import WeatherComposition from './components/hands-on/WeatherComposition.vue'

// 3일차 Hands On 과제3
// import WeatherParent from './components/hands-on/weather-component/WeatherParent.vue'

// 3일차 Hands On 과제4
import {
  RouterLink,
  RouterView,
} from 'vue-router'

// 4일차 Hands On 과제5
import UnitToggler from './components/hands-on/exercise/UnitToggler.vue'

</script>

<template>
  <div class="app">
    <nav class="navigation">
      <div class="navigation-links">
        <RouterLink to="/">
          날씨 대시보드
        </RouterLink>

        <RouterLink to="/about">
          서비스 소개
        </RouterLink>
      </div>

      <UnitToggler />
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 32px;
  border-bottom: 1px solid #dbeafe;
  background-color: white;
}

.navigation-links {
  display: flex;
  gap: 24px;
}

.navigation a {
  color: #64748b;
  font-weight: 700;
  text-decoration: none;
}

.navigation a:hover,
.navigation a.router-link-exact-active {
  color: #2563eb;
}

@media (max-width: 600px) {
  .navigation {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px 20px;
  }
}
</style>