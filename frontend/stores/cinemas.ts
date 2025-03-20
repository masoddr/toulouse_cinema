import { defineStore } from 'pinia'

const CINEMA_COLORS = {
  'ABC': 'rgb(59, 130, 246)', // blue-500
  'UGC Montaudran': 'rgb(220, 38, 38)', // red-600
  // Ajoutez d'autres cinémas si nécessaire
}

export const useCinemasStore = defineStore('cinemas', {
  state: () => ({
    colors: CINEMA_COLORS
  }),

  getters: {
    getColor: (state) => {
      return (cinema: string) => state.colors[cinema] || 'rgb(75, 85, 99)' // gray-600 par défaut
    },
    
    getLightColor: (state) => {
      return (cinema: string) => {
        const color = state.colors[cinema]
        if (!color) return 'rgb(243, 244, 246)' // gray-100 par défaut
        return `${color.replace('rgb', 'rgba').replace(')', ', 0.1)')}`
      }
    }
  }
}) 