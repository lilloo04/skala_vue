<script setup>
import { storeToRefs } from 'pinia'

import { useConfigStore } from '../../../stores/configStore'

const configStore = useConfigStore()

const {
  temperatureUnit,
  unitChangeCount,
} = storeToRefs(configStore)

const { setTemperatureUnit } = configStore
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">온도 단위</span>

    <div class="unit-buttons">
      <button
        type="button"
        :class="{
          active:
            temperatureUnit === 'celsius',
        }"
        @click="setTemperatureUnit('celsius')"
      >
        ℃
      </button>

      <button
        type="button"
        :class="{
          active:
            temperatureUnit === 'fahrenheit',
        }"
        @click="setTemperatureUnit('fahrenheit')"
      >
        ℉
      </button>
    </div>

    <span class="change-count">
      변경 {{ unitChangeCount }}회
    </span>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 10px;
}

.unit-label {
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
}

.unit-buttons {
  display: flex;
  overflow: hidden;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
}

.unit-buttons button {
  min-width: 42px;
  padding: 7px 10px;
  border: none;
  color: #64748b;
  background-color: white;
  cursor: pointer;
}

.unit-buttons button + button {
  border-left: 1px solid #bfdbfe;
}

.unit-buttons button.active {
  color: white;
  background-color: #2563eb;
}

.change-count {
  color: #94a3b8;
  font-size: 12px;
}
</style>