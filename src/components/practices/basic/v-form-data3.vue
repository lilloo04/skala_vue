<script setup>
import { ref } from 'vue'
const userEmail = ref('')
const price = ref('')
</script>

<template>
<div>
<!-- 3) .trim 수식어 실습-->
<section>
<h3>3) .trim 수식어 (양끝 공백 자동 제거)</h3>
<input type="text" v-model.trim="userEmail" placeholder=
"앞뒤 공백을 포함해 입력해 보세요" />
<p>
공백 제거된 값: <strong>"{{ userEmail }}"</strong>
</p>
<p>
문자열 길이: <strong>{{ userEmail.length }}</strong>
</p>
</section>
<!-- 4) 수식어 체이닝 (Chaining) 실습-->


<section>
<h3>4) Chaining (수식어 체이닝: .trim.number)</h3>
<input type="text" v-model.trim.number="price" placeholder=
"공백과 숫자를 섞어 입력해 보세요" />
<p>
처리된 값: <strong>"{{ price }}"</strong>
</p>
<p>
데이터 타입: <strong>{{ typeof price }}</strong>
</p>
</section>
</div>
</template>