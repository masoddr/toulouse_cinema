import { defineStore } from 'pinia'

// Définir un type pour les cinémas connus
type CinemaName = 'ABC' | 'UGC Montaudran' | 'American Cosmograph' | 'Le cratère' | 'Pathé Wilson' | 'Utopia Borderouge'

const CINEMA_COLORS: Record<CinemaName, string> = {
  'ABC': 'rgb(59, 130, 246)', // blue-500
  'UGC Montaudran': 'rgb(220, 38, 38)', // red-600
  'American Cosmograph': 'rgb(220, 38, 38)', // red-600
  'Le cratère': 'rgb(220, 38, 38)', // red-600
  'Pathé Wilson': 'rgb(220, 38, 38)', // red-600
  'Utopia Borderouge': 'rgb(220, 38, 38)', // red-600
}

export const useCinemasStore = defineStore('cinemas', {
  state: () => ({
    colors: CINEMA_COLORS
  }),

  getters: {
    getColor: () => {
      return (_cinema: string) => 'rgb(75, 85, 99)' // gray-600 par défaut pour tous
    },
    
    getLightColor: () => {
      return (_cinema: string) => 'rgb(243, 244, 246)' // gray-100 par défaut pour tous
    }
  }
}) 