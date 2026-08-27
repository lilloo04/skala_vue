<script setup>
defineProps({
  showHotOnly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update-hot-filter'])

const handleChange = (event) => {
  emit('update-hot-filter', event.target.checked)
}
</script>

<template>
  <label class="hot-filter">
    <input
      type="checkbox"
      :checked="showHotOnly"
      @change="handleChange"
    />
    <span>더운 도시만 보기 🔥</span>
  </label>
</template>

<style scoped>
.hot-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
}

.hot-filter input {
  width: auto;
  margin: 0;
}
</style>