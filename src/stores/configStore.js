import { defineStore } from 'pinia'

export const useConfigStore = defineStore(
  'config',
  {
    state: () => ({
      temperatureUnit: 'celsius',
      unitChangeCount: 0,
    }),

    getters: {
      unitSymbol: (state) => {
        return state.temperatureUnit === 'celsius'
          ? '℃'
          : '℉'
      },

      unitName: (state) => {
        return state.temperatureUnit === 'celsius'
          ? '섭씨'
          : '화씨'
      },

      convertTemperature: (state) => {
        return (celsius) => {
          if (state.temperatureUnit === 'celsius') {
            return celsius
          }

          return Math.round(
            (celsius * 9) / 5 + 32,
          )
        }
      },
    },

    actions: {
      setTemperatureUnit(unit) {
        if (
          unit !== 'celsius' &&
          unit !== 'fahrenheit'
        ) {
          return
        }

        if (this.temperatureUnit !== unit) {
          this.temperatureUnit = unit
          this.unitChangeCount++
        }
      },

      toggleTemperatureUnit() {
        this.temperatureUnit =
          this.temperatureUnit === 'celsius'
            ? 'fahrenheit'
            : 'celsius'

        this.unitChangeCount++
      },
    },
  },
)