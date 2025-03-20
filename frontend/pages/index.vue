<template>
  <div>
    <TheNavbar />
    <DaySelector @update:day="updateSelectedDay" />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Programme des séances</h1>
      
      <div v-if="loading">Chargement...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="selectedDayFilms" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="film in selectedDayFilms"
            :key="film.tmdb_id"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div class="flex">
              <!-- Image du film -->
              <img :src="film.poster" :alt="film.titre" 
                   class="w-48 h-72 object-cover">
              
              <!-- Informations du film -->
              <div class="flex-1 p-4">
                <div class="mb-4">
                  <h3 class="font-bold text-xl mb-2">{{ film.titre }}</h3>
                  <div class="flex items-center gap-4 text-sm text-gray-600">
                    <span>{{ film.duree }} min</span>
                    <span v-if="film.note" class="flex items-center">
                      <span class="text-yellow-500">★</span>
                      <span class="ml-1">{{ film.note.toFixed(1) }}/10</span>
                    </span>
                  </div>
                </div>

                <!-- Séances par cinéma -->
                <div class="space-y-4">
                  <div 
                    v-for="(seances, cinema) in filmSeancesByCinema(film.tmdb_id)" 
                    :key="cinema"
                    class="border-t pt-2"
                  >
                    <h4 class="font-semibold text-gray-700 mb-2">{{ cinema }}</h4>
                    <div class="flex flex-wrap gap-2">
                      <div
                        v-for="seance in seances"
                        :key="seance.heure"
                        class="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        <span class="font-medium">{{ seance.heure }}</span>
                        <span class="text-xs text-gray-500">{{ seance.version }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Lien vers la page du film -->
                <div class="mt-4 flex justify-end">
                  <NuxtLink 
                    :to="`/films/${film.tmdb_id}`"
                    class="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Plus d'informations →
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeancesStore } from '~/stores/seances'
import { storeToRefs } from 'pinia'

const store = useSeancesStore()
const { seancesByDay, loading, error } = storeToRefs(store)

// Charger les données au montage
onMounted(() => {
  store.fetchSeances()
})

const selectedDay = ref('')
const selectedDaySeances = computed(() => 
  selectedDay.value ? seancesByDay.value[selectedDay.value] : []
)

// Obtenir les films uniques pour le jour sélectionné
const selectedDayFilms = computed(() => {
  if (!selectedDaySeances.value) return []
  
  const uniqueFilms = new Map()
  selectedDaySeances.value.forEach(seance => {
    if (!uniqueFilms.has(seance.tmdb_id)) {
      uniqueFilms.set(seance.tmdb_id, seance)
    }
  })
  return Array.from(uniqueFilms.values())
})

// Grouper les séances par cinéma pour un film donné
function filmSeancesByCinema(filmId: number) {
  if (!selectedDaySeances.value) return {}
  
  const filmSeances = selectedDaySeances.value.filter(s => s.tmdb_id === filmId)
  return filmSeances.reduce((acc, seance) => {
    if (!acc[seance.cinema]) {
      acc[seance.cinema] = []
    }
    acc[seance.cinema].push(seance)
    return acc
  }, {} as Record<string, typeof selectedDaySeances.value>)
}

function updateSelectedDay(day: string) {
  selectedDay.value = day
}

// Sélectionner automatiquement le premier jour disponible
watch(seancesByDay, (newValue) => {
  if (!selectedDay.value && Object.keys(newValue).length > 0) {
    selectedDay.value = Object.keys(newValue).sort()[0]
  }
}, { immediate: true })
</script>

<style scoped>
/* Pour assurer que les séances s'affichent correctement sur mobile */
.flex-wrap {
  margin: -0.25rem;
}
.flex-wrap > * {
  margin: 0.25rem;
}
</style> 