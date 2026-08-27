<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="about-page">
    <section class="about-card">
      <h1>날씨 서비스 소개</h1>

      <p>
        지역별 기온, 날씨 상태, 습도 등의 정보를
        간단하게 확인할 수 있는 날씨 대시보드입니다.
      </p>

      <p>
        도시 이름 검색과 더운 도시 필터를 사용할 수
        있으며, 상세 페이지에서는 추가 기상관측 정보를
        확인할 수 있습니다.
      </p>

      <RouterLink to="/" class="back-link">
        메인 대시보드로 돌아가기
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  box-sizing: border-box;
  min-height: calc(100vh - 61px);
  padding: 60px 20px;
  background: linear-gradient(135deg, #dbeafe, #f0f9ff);
}

.about-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 12px 30px rgb(15 23 42 / 12%);
}

.about-card h1 {
  margin-top: 0;
}

.about-card p {
  color: #475569;
  line-height: 1.8;
}

.back-link {
  display: block;
  margin-top: 24px;
  padding: 12px;
  border-radius: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  background-color: #2563eb;
}
</style>