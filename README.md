# SKALA Vue Weather Dashboard

Vue 3 학습 과정에서 단계별로 발전시킨 날씨 대시보드 프로젝트입니다. 처음에는 Mock Data를 반복 렌더링하는 단일 화면으로 시작했고, Composition API와 컴포넌트 분리, Vue Router, Pinia를 순서대로 적용했습니다. 이후 실제 날씨, 대기질 API, Element Plus, Leaflet 기반 전국 날씨 지도를 추가하며 하나의 애플리케이션으로 확장했습니다.


## 주요 기능

- 전국 주요 도시의 현재 날씨 카드 표시
- 도시 이름 검색 및 검색 결과 필터링
- 25℃ 이상인 더운 도시만 보기
- 카드 선택 시 선택 도시와 현재 기온 표시
- 도시별 상세 날씨 페이지 제공
- 섭씨(℃)와 화씨(℉) 단위 전환
- OpenWeatherMap 기반 실제 현재 날씨 조회
- Open-Meteo 기반 대기질(AQI, PM2.5) 정보 제공
- Leaflet 기반 전국 날씨 지도와 도시별 기온 마커 제공
- 로딩, API 오류 및 존재하지 않는 경로 안내
- 반응형 레이아웃과 Element Plus UI 적용

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Framework | Vue 3, Composition API, `<script setup>` |
| Build Tool | Vite |
| Routing | Vue Router |
| State Management | Pinia |
| HTTP / API | Axios, OpenWeatherMap, Open-Meteo |
| UI | Element Plus |
| Map | Leaflet |
| Quality | ESLint, Vite Production Build |

## 실행 방법

### 1. 저장소 내려받기

```bash
git clone https://github.com/lilloo04/skala_vue.git
cd skala_vue
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일을 만들고 OpenWeatherMap API 키를 입력합니다.

```env
VITE_OPENWEATHER_API_KEY=발급받은_API_KEY
```

API 키가 포함된 `.env`는 Git에 커밋하지 않습니다. 대신 저장소에는 아래와 같은 `.env.example`을 둘 수 있습니다.

```env
VITE_OPENWEATHER_API_KEY=
```

### 4. 개발 서버 실행

```bash
npm run dev
```

터미널에 표시되는 주소(기본값 `http://localhost:5173`)로 접속합니다.

### 5. Production Build

```bash
npm run build
```

## 주요 라우트

| 경로 | 화면 | 설명 |
| --- | --- | --- |
| `/` | `WeatherHomeView.vue` | 날씨 검색, 필터, 카드 목록을 제공하는 메인 대시보드 |
| `/weather/:cityId` | `WeatherDetailView.vue` | URL의 도시 ID를 이용해 상세 기상정보 표시 |
| `/about` | `WeatherAboutView.vue` | 서비스 소개 및 메인 화면 이동 링크 제공 |
| `/map` | `NationalWeatherMapView.vue` | 전국 지도에서 도시별 기온과 선택 지역 정보 표시 |
| `/:pathMatch(.*)*` | `NotFoundView.vue` | 정의되지 않은 주소에 대한 404 안내 |

라우트 컴포넌트는 동적 `import()`를 사용해 지연 로딩합니다.

```js
{
  path: '/weather/:cityId',
  name: 'weather-detail',
  component: () => import('../views/WeatherDetailView.vue'),
}
```

## 프로젝트 구조

실습 과정에서 사용한 핵심 구조를 기준으로 정리했습니다.

```text
src/
├── assets/
├── components/
│   └── hands-on/
│       └── exercise/
│           ├── BaseDashboardCard.vue
│           ├── HotFilter.vue
│           ├── SearchBar.vue
│           ├── UnitToggler.vue
│           └── WeatherCard.vue
├── data/
│   ├── weatherData.js
│   └── weatherApiData.js
├── router/
│   └── index.js
├── stores/
│   └── configStore.js
├── views/
│   ├── NationalWeatherMapView.vue
│   ├── NotFoundView.vue
│   ├── WeatherAboutView.vue
│   ├── WeatherDetailView.vue
│   └── WeatherHomeView.vue
├── App.vue
└── main.js
```

실제 파일 위치나 일부 파일명은 최신 브랜치의 구조에 따라 달라질 수 있습니다.

## Hands-on 진행 과정

각 Hands-on 결과를 별도의 커밋으로 남겨 학습 과정과 코드 변화를 확인할 수 있도록 했습니다.

| 과정 | 핵심 학습 내용 | 결과 커밋 |
| --- | --- | --- |
| Hands on1 - Weather Mockup | Directive, 반복·조건부 렌더링, 이벤트 | [feat: Day 1, 2 예제 및 Hands On1](https://github.com/lilloo04/skala_vue/commit/32ad75f3b14df4512117e473bff56a9462a9ea73) |
| Hands on2 - Weather Composition | `ref`, `computed`, `watch`, `watchEffect` | [feat: Day2 Hands On2](https://github.com/lilloo04/skala_vue/commit/4aac81ffa689e48616d76dc0a8aef22a718869b7) |
| Hands on3 - Weather Component | props, emits, slot, 컴포넌트 분리 | [feat: Day3 Hands On3](https://github.com/lilloo04/skala_vue/commit/ab19cb0844a0902ca6a334d241a68b9af92809a7) |
| Hands on4 - Weather Router | 동적 라우팅, Lazy Loading, 404 | [feat: Day3 Hands On4](https://github.com/lilloo04/skala_vue/commit/89479a7d90da8554b6181ec051e0fe78794c7c2a) |
| Hands on5 - Weather Store | Pinia, 전역 상태, 섭씨·화씨 변환 | [fix: Day4 Hands On5 WeatherCard 누락된 스타일 추가](https://github.com/lilloo04/skala_vue/commit/a9be44e36cebdd11a9258092d6e85972a770c320) |
| Hands on6 - Weather Axios | Axios, 실제 날씨 API, 환경변수 | [Day4 Hands On6](https://github.com/lilloo04/skala_vue/commit/e146edf23917be43d982311f63f90002782148e1) |
| Hands on7 - Weather UI Library | Element Plus, 외부 UI 컴포넌트 | [Day4 Hands On7](https://github.com/lilloo04/skala_vue/commit/c323f1350f55baefccc47e5cde80f5f479b3497f) |

### 사전 준비 - Project Scaffolding

- Vite 기반 Vue 프로젝트를 생성하고 개발 서버 실행을 확인했습니다.
- HMR을 이용해 소스 수정 내용이 브라우저에 즉시 반영되는 것을 확인했습니다.
- Vue Devtools에서 Components, Router, Pinia 등 주요 탭을 확인했습니다.

### Hands on1 - Weather Mockup

**결과 커밋:** [feat: Day 1, 2 예제 및 Hands On1](https://github.com/lilloo04/skala_vue/commit/32ad75f3b14df4512117e473bff56a9462a9ea73)

#### 배운 내용

- `v-for`, `v-if`, `v-else`를 이용한 반복·조건부 렌더링
- `:key`, `:value`와 같은 속성 바인딩
- `@input`, `@click`을 이용한 이벤트 처리
- `.stop` 이벤트 수식어를 이용한 버블링 제어

#### 구현 내용

- `ref()`로 도시별 Mock Data 배열을 만들었습니다.
- `v-for`와 `:key="weather.id"`를 사용해 날씨 카드를 반복 출력했습니다.
- `v-if`로 25℃ 이상은 `🔥 더움`, 미만은 `❄️ 선선함`으로 표시했습니다.
- 한글 도시 검색을 위해 `:value`와 `@input`을 사용했습니다.
- 날씨 카드를 선택하면 상태바가 변경되도록 구현했습니다.
- 상세보기 버튼에는 `.stop` 수식어를 적용해 카드 클릭 이벤트의 버블링을 막았습니다.
- 개인화 기능으로 습도, 날씨 아이콘, 더운 도시만 보기 필터를 추가했습니다.

### Hands on2 - Weather Composition

**결과 커밋:** [feat: Day2 Hands On2](https://github.com/lilloo04/skala_vue/commit/4aac81ffa689e48616d76dc0a8aef22a718869b7)

#### 배운 내용

- `ref()`를 이용한 반응형 상태 선언
- `computed()`를 이용한 파생 데이터 계산
- `watch()`와 `watchEffect()`의 차이 및 상태 변화 추적
- 원본 상태를 직접 변경하지 않고 화면용 목록을 계산하는 방식

#### 구현 내용

- `searchQuery`, `selectedCityInfo`, `showHotOnly`, `weatherList`를 반응형 상태로 관리했습니다.
- `computed()`로 검색 결과와 더운 도시 필터 결과를 계산했습니다.
- `watch()`로 선택 도시와 필터 상태의 변화를 추적했습니다.
- `watchEffect()`로 검색어가 변할 때마다 콘솔에서 확인했습니다.
- 이후 온도 단위가 변경되어도 상태바가 자동 갱신되도록 선택 도시 객체를 저장하고 `selectedCityInfo`를 계산된 값으로 개선했습니다.

### Hands on3 - Weather Component

**결과 커밋:** [feat: Day3 Hands On3](https://github.com/lilloo04/skala_vue/commit/ab19cb0844a0902ca6a334d241a68b9af92809a7)

#### 배운 내용

- props를 이용한 부모 → 자식 데이터 전달
- emits를 이용한 자식 → 부모 이벤트 전달
- `<slot>`을 이용한 공통 레이아웃 재사용
- `<style scoped>`를 이용한 컴포넌트별 스타일 격리

#### 구현 내용

기존 단일 화면을 역할별 컴포넌트로 분리했습니다.

| 컴포넌트 | 역할 |
| --- | --- |
| `BaseDashboardCard.vue` | 검색 및 목록 영역의 공통 디자인과 `<slot>` 제공 |
| `SearchBar.vue` | 검색어를 props로 받고 `update-query` 이벤트 전달 |
| `WeatherCard.vue` | 날씨 객체를 props로 받고 선택·상세 이벤트 전달 |
| `HotFilter.vue` | 더운 도시 필터 상태를 부모에게 전달 |
| `UnitToggler.vue` | Pinia Store를 이용해 섭씨·화씨 단위 변경 |

각 컴포넌트의 스타일은 `<style scoped>`로 분리했습니다. 컴포넌트 분리 후 화면이 1열로 좁아지는 문제는 전역 `#app` 너비 제한과 기본 Grid 스타일을 정리해 해결했습니다.

### Hands on4 - Weather Router

**결과 커밋:** [feat: Day3 Hands On4](https://github.com/lilloo04/skala_vue/commit/89479a7d90da8554b6181ec051e0fe78794c7c2a)

#### 배운 내용

- `RouterLink`와 `RouterView`를 이용한 SPA 화면 구성
- `useRouter()`를 이용한 Programmatic Navigation
- `useRoute()`와 동적 파라미터 `:cityId` 사용
- 동적 `import()` 기반 Lazy Loading과 Catch-all Route

#### 구현 내용

- `App.vue`에 `RouterLink`, `RouterView`와 공통 Navigation Bar를 배치했습니다.
- 기존 부모 컴포넌트 역할을 `WeatherHomeView.vue`로 이전했습니다.
- 상세보기의 `window.alert()`를 제거하고 `router.push()`를 이용한 화면 이동으로 변경했습니다.
- `/weather/:cityId`의 동적 파라미터로 도시 상세정보를 조회했습니다.
- 서비스 소개 화면과 Catch-all 404 화면을 작성했습니다.
- 모든 View에 Lazy Loading을 적용했습니다.
- 추가 View로 전국 날씨 지도 화면을 만들고 `/map` 라우트와 메뉴를 연결했습니다.

### Hands on5 - Weather Store

**결과 커밋:** [fix: Day4 Hands On5 WeatherCard 누락된 스타일 추가](https://github.com/lilloo04/skala_vue/commit/a9be44e36cebdd11a9258092d6e85972a770c320)

#### 배운 내용

- Pinia Store의 state, getter, action 역할
- 여러 View와 컴포넌트가 하나의 전역 상태를 공유하는 방식
- `storeToRefs()`를 이용해 구조 분해 후에도 반응성을 유지하는 방법
- 원본 데이터와 화면 표시용 데이터를 분리하는 방식

#### 구현 내용

`stores/configStore.js`에서 전체 화면이 공유하는 온도 단위를 관리했습니다.

- State: 현재 온도 단위와 단위 변경 횟수
- Getter: 현재 단위 기호, 단위 이름, 섭씨 온도 변환 함수
- Action: 특정 단위 설정 및 섭씨·화씨 전환

원본 날씨 데이터는 섭씨로 유지하고 화면에 표시할 때만 변환합니다.

```js
convertTemperature: (state) => {
  return (celsius) => {
    if (state.temperatureUnit === 'celsius') {
      return celsius
    }

    return Math.round((celsius * 9) / 5 + 32)
  }
}
```

`UnitToggler.vue`를 Navigation Bar 옆에 배치하고 메인 카드, 선택 도시 상태바, 상세 페이지의 현재·체감온도에 동일한 설정을 적용했습니다. 더운 도시 판단은 표시 단위와 관계없이 원본 섭씨 `25℃`를 기준으로 유지했습니다.

### Hands on6 - Weather Axios

**결과 커밋:** [Day4 Hands On6](https://github.com/lilloo04/skala_vue/commit/e146edf23917be43d982311f63f90002782148e1)

#### 배운 내용

- Axios를 이용한 비동기 HTTP 요청
- API 응답을 화면에서 사용하는 데이터 형태로 변환하는 방법
- 요청 중 로딩 상태와 요청 실패 상태 처리
- Vite 환경변수를 이용한 API 키 분리

#### 구현 내용

- OpenWeatherMap 현재 날씨 API를 연동해 Mock Data를 실제 데이터로 교체할 수 있도록 구성했습니다.
- 요청 중에는 로딩 상태를 표시하고, 실패 시 오류 안내를 제공합니다.
- API 키를 `VITE_OPENWEATHER_API_KEY` 환경변수로 분리했습니다.
- Open-Meteo 대기질 API를 추가해 상세 화면에 AQI와 PM2.5를 표시했습니다.
- 여러 화면에서 중복되던 날씨 데이터는 `weatherData.js`로 통합했습니다.
- API 응답 교체를 고려한 `weatherApiData.js`도 추가했습니다.

### Hands on7 - Weather UI Library

**결과 커밋:** [Day4 Hands On7](https://github.com/lilloo04/skala_vue/commit/c323f1350f55baefccc47e5cde80f5f479b3497f)

#### 배운 내용

- 외부 UI Library 설치와 Vue 애플리케이션 등록
- UI 컴포넌트의 props와 slot 활용
- 직접 작성한 CSS와 UI Library 컴포넌트를 함께 사용하는 방법
- 정보 유형에 맞는 카드, 태그, 알림, 버튼 선택

#### 구현 내용

Element Plus를 적용해 화면의 정보 계층과 상태 표현을 개선했습니다.

- `ElCard`: 지도와 선택 도시 정보 패널
- `ElTag`: 날씨·대기질 상태 강조
- `ElAlert`: API 오류 및 안내 메시지
- `ElButton`: 상세 페이지 이동과 주요 동작

`ElProgress`와 ECharts 기반 시각화도 실험했지만, 현재 정보 표현 목적과 맞지 않아 최종 적용에서는 제외했습니다.

### 추가 구현 - 전국 날씨 지도

`NationalWeatherMapView.vue`에 Leaflet 지도를 적용했습니다.

- 도시별 위치에 현재 기온 마커 표시
- 마커 선택 시 지역별 상세정보 패널 표시
- 현재 기온 강조
- 체감온도, 습도, 풍속, 강수 확률을 타일로 구성
- 관측 시각 및 상세 페이지 이동 버튼 제공
- 선택 패널 배경색을 `#eef6f7`로 조정

이 화면은 Router 단원의 “본인의 추가 View 작성”과 UI Library 활용 요구사항을 함께 확장한 기능입니다.

### 마무리 - Build 및 검증

- 주요 변경 후 VS Code 진단을 확인했습니다.
- `npm run build`를 여러 차례 실행해 Production Build 통과를 확인했습니다.
- 제출 시 API 키가 Git에 포함되지 않는지 확인합니다.
- GitHub 저장소가 Public인지 시크릿 브라우저에서 확인합니다.
- 배포한 경우 새 브라우저에서 라우팅, API 요청, 지도 타일을 다시 확인합니다.

## 핵심 데이터 흐름

```text
UnitToggler
  → configStore의 단위 변경
  → 메인 카드 / 상태바 / 상세 페이지 자동 갱신

SearchBar
  → update-query emit
  → WeatherHomeView의 searchQuery 변경
  → computed 목록 재계산

WeatherCard 상세보기
  → click-detail emit
  → router.push('/weather/' + cityId)
  → WeatherDetailView에서 cityId에 해당하는 데이터 표시
```

## 트러블슈팅 기록

### 컴포넌트 분리 후 카드가 한 줄에 하나만 표시됨

Vue 기본 전역 CSS의 `#app` 최대 너비와 Grid 설정이 전체 화면 폭을 제한하고 있었습니다. `body`와 `#app`을 전체 너비로 조정하고 카드 영역에 반응형 Grid를 적용했습니다.

```css
.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}
```

### `UnitToggler`가 화면에 표시되지 않음

템플릿에 `<UnitToggler />`만 작성하는 것으로는 부족하며 `App.vue`의 `<script setup>`에서 실제 위치에 맞게 import해야 합니다.

```js
import UnitToggler from './components/hands-on/exercise/UnitToggler.vue'
```

### 선택 도시 상태바만 온도 단위가 변경되지 않음

선택 시 완성된 문자열을 저장하면 단위 변경을 추적하지 못합니다. 선택 도시 객체를 `ref`에 저장한 뒤 상태바 문자열을 `computed`로 계산해 해결했습니다.

## 학습 결과

이 프로젝트를 통해 다음 내용을 실습했습니다.

- Vue Directive와 이벤트 수식어
- `ref`, `computed`, `watch`, `watchEffect`
- props, emits, slot을 이용한 컴포넌트 통신
- Vue Router의 동적 경로, Programmatic Navigation, Lazy Loading, Catch-all Route
- Pinia의 state, getter, action과 `storeToRefs`
- Axios 기반 비동기 API 요청 및 로딩·오류 처리
- 환경변수를 이용한 API 키 관리
- Element Plus와 Leaflet을 이용한 UI 확장
- Production Build와 제출 전 품질 확인

## 향후 개선사항

- 중복된 온도 변환 로직을 Composable로 분리
- 사용자가 선택한 온도 단위를 Local Storage에 저장
- API 응답 캐싱 및 재시도 처리
- 도시 즐겨찾기 Store 추가
- 지도 마커 클러스터링 및 지역 확대 기능 보강
- 단위 테스트와 컴포넌트 테스트 추가
- 정적 호스팅 환경에 맞는 새로고침 라우팅 설정 검증

## 참고

- [Vue 공식 문서](https://vuejs.org/)
- [Vue Router 공식 문서](https://router.vuejs.org/)
- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
- [Element Plus](https://element-plus.org/)
- [Leaflet](https://leafletjs.com/)
