<template>
  <div>
    <TheNavbar />
    
    <div v-if="film" class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row gap-8">
        <img :src="film.poster" :alt="film.titre" 
             class="w-64 h-96 object-cover rounded-lg shadow-lg">
        
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-4">{{ film.titre }}</h1>
          
          <div class="mb-6">
            <p class="text-gray-600">Durée : {{ film.duree }} minutes</p>
            <p class="text-gray-600">Date de sortie : {{ formatDate(film.date_sortie) }}</p>
            <div v-if="film.note" class="flex items-center mt-2">
              <span class="text-yellow-500 text-2xl">★</span>
              <span class="ml-2 text-xl">{{ film.note.toFixed(1) }}/10</span>
            </div>
          </div>

          <div v-if="film.trailer_url" class="mb-6">
            <a :href="film.trailer_url" target="_blank" 
               class="bg-red-600 text-white px-4 py-2 rounded-lg inline-flex items-center">
              <span>Voir la bande annonce</span>
            </a>
          </div>

          <h2 class="text-2xl font-semibold mb-4">Séances</h2>
          <div class="grid gap-4">
            <div v-for="seance in filmSeances" :key="`${seance.jour}-${seance.heure}`"
                 class="bg-white p-4 rounded-lg shadow">
              <p class="font-semibold">{{ formatDate(seance.jour) }}</p>
              <p>{{ seance.cinema }} - {{ seance.heure }} ({{ seance.version }})</p>
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
import TheNavbar from '~/components/TheNavbar.vue'

const route = useRoute()
const store = useSeancesStore()
const { seances } = storeToRefs(store)

// Charger les données au montage
onMounted(() => {
  if (seances.value.length === 0) {
    store.fetchSeances()
  }
})

// Obtenir le film et ses séances
const filmId = Number(route.params.id)
const film = computed(() => seances.value.find(s => s.tmdb_id === filmId))
const filmSeances = computed(() => 
  seances.value.filter(s => s.tmdb_id === filmId)
)

// Formater la date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script> 