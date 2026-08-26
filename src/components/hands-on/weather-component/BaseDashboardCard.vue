<script setup>
defineProps({
  variant: {
    type: String,
    default: 'list',
  },
})
</script>

<template>
  <section
    class="dashboard-card"
    :class="`dashboard-card--${variant}`"
  >
    <slot />
  </section>
</template>

<style scoped>
.dashboard-card {
  box-sizing: border-box;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 20px;
  border: 1px solid #dbeafe;
  border-radius: 18px;
  background-color: rgb(255 255 255 / 70%);
  box-shadow: 0 8px 24px rgb(15 23 42 / 8%);
}

.dashboard-card--search {
  max-width: 600px;
  margin-bottom: 20px;
}

.dashboard-card--list {
  max-width: 1040px;
}
</style>