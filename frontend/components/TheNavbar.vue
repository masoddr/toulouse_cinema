<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="font-bold text-xl">
          Cinémas Toulouse
        </NuxtLink>
        
        <div class="flex space-x-4">
          <NuxtLink 
            v-for="cinema in cinemas" 
            :key="cinema"
            :to="`/cinemas/${cinema}`"
            class="hover:text-opacity-90 transition-colors flex items-center gap-2"
            :style="{ color: getCinemaColor(cinema) }"
          >
            <span 
              class="inline-block w-2 h-2 rounded-full"
              :style="{ backgroundColor: getCinemaColor(cinema) }"
            ></span>
            {{ cinema }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useSeancesStore } from '~/stores/seances'
import { useCinemasStore } from '~/stores/cinemas'
import { storeToRefs } from 'pinia'

const store = useSeancesStore()
const cinemaStore = useCinemasStore()
const { cinemas } = storeToRefs(store)

const getCinemaColor = (cinema: string) => cinemaStore.getColor(cinema)
</script> 