<script setup>
import { ref } from 'vue'
// v-model Modifiers 실습용 reactive 변수 선언
const lazyText = ref('')
const age = ref('')
// const userEmail = ref('')
// const price = ref('')
</script>

<template>
<div class="practice-section">
<h2>v-model 수식어 (Modifiers) 활용</h2>
<!-- 1) .lazy 수식어 실습-->
<section style="margin-bottom: 20px">
<h3>1) .lazy 수식어 (change 이벤트 시점 반영)</h3>
<input type="text" v-model.lazy="lazyText" placeholder=
"입력 후 Enter 또는 외부 클릭" />
<p>
실시간이 아닌 확정된 값: <strong>{{ lazyText }}</strong>
</p>
</section>
<!-- 2) .number 수식어 실습-->
<section style="margin-bottom: 20px">
<h3>2) .number 수식어 (Number 타입 자동 형변환)</h3>
<input type="text" v-model.number="age" placeholder=
"나이를 입력하세요" />
<p>
입력된 값: <strong>{{ age }}</strong>
</p>
<p>
데이터 타입: <strong>{{ typeof age }}</strong>
</p>
</section>
</div>
</template>