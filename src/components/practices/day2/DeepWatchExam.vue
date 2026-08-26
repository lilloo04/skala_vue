<script setup>
import { ref, watch } from 'vue'
const user = ref({
name: '홍길동'
,
age: 20,
})
const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')
// 실패하는 예시 (가장 많이 범하는 오류)
// watch(user, () => { console.log('이 로그는 영원히 안 찍힙니다.') })
// 해결책 1: deep 옵션을 켜서 객체 하위 속성 전체 감시하기
watch(user, (newVal) => {
logDeep.value = `[deep 감지] 누군가 변경됨! 현재 이름: ${newVal.name}, 나이: ${newVal.age}`
},
{ deep: true },
)
// 해결책 2: 화살표 함수로 특정 속성(age)만 콕 집어 감시하기 (★이전 값 추적 가능!)
watch(() => user.value.age, (newAge, oldAge) => {
logTarget.value = `[타겟 감지] 나이가 ${oldAge}세 ➡️ ${newAge}세로 변경됨!`

},
)
</script>