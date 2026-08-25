<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

// day1-2 실습
// import SampleOne from './components/practices/basic/SampleOne.vue'
// import SampleTwo from './components/practices/basic/SampleTwo.vue'
// import VMemo from './components/practices/basic/v-memo.vue'
// import VBind from './components/practices/basic/v-bind.vue'
// import VCloak from './components/practices/basic/v-cloak.vue'
// import VFor from './components/practices/basic/v-for.vue'
// import VHtml from './components/practices/basic/v-html.vue'
// import VIf from './components/practices/basic/v-if-v-else-if-v-else.vue'
// import VOnce from './components/practices/basic/v-once.vue'
// import VPre from './components/practices/basic/v-pre.vue'
// import VShow from './components/practices/basic/v-show.vue'
// import VText from './components/practices/basic/v-text.vue'
// import VOn from './components/practices/basic/v-on.vue'
// import VEventModifier from './components/practices/basic/v-event-modifier.vue'
// import VFormData from './components/practices/basic/v-form-data.vue'
// import VFormData2 from './components/practices/basic/v-from-data2.vue'
// import VFormData3 from './components/practices/basic/v-form-data3.vue'
// import VStyle from './components/practices/basic/v-style.vue'

// hands-on 실습
import WeatherMockup from './components/hands-on/WeatherMockup.vue'
</script>

<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template> -->

<template>
  <div style="padding: 20px">

    <WeatherMockup />
    
    <!-- day1-2 실습
    <SampleOne />
    <SampleTwo />
    <VMemo />
    <VBind />
    <VCloak />
    <VFor />
    <VHtml />
    <VIf />
    <VOnce />
    <VPre />
    <VShow />
    <VText />
    <VOn />
    <VEventModifier />
    <VFormData />
    <VFormData2 />
    <VFormData3 />
    <VStyle /> -->
  </div>
</template>


<!-- 
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
