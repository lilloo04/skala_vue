<script setup>
defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      :value="searchQuery"
      placeholder="도시 이름을 입력하세요"
      @input="handleInput"
    />

    <p>
      입력한 도시명:
      <strong>{{ searchQuery || '없음' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-bar {
  text-align: center;
}

.search-bar input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
}

.search-bar input:focus {
  border-color: #3b82f6;
}

.search-bar p {
  margin: 10px 0;
}
</style>