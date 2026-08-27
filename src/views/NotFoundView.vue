<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found-page">
    <section class="not-found-card">
      <p class="error-code">404</p>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>
        입력한 주소가 잘못되었거나 페이지가
        존재하지 않습니다.
      </p>

      <RouterLink to="/" class="back-link">
        메인 대시보드로 돌아가기
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.not-found-page {
  box-sizing: border-box;
  min-height: calc(100vh - 61px);
  padding: 80px 20px;
  background: linear-gradient(135deg, #dbeafe, #f0f9ff);
}

.not-found-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  background-color: white;
  box-shadow: 0 12px 30px rgb(15 23 42 / 12%);
}

.error-code {
  margin: 0;
  color: #2563eb;
  font-size: 72px;
  font-weight: bold;
}

.not-found-card > p:not(.error-code) {
  color: #64748b;
}

.back-link {
  display: block;
  margin-top: 24px;
  padding: 12px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  background-color: #2563eb;
}
</style>