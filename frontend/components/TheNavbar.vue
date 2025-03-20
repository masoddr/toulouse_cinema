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
            class="hover:text-gray-300"
          >
            {{ cinema }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useSeancesStore } from '~/stores/seances'
import { storeToRefs } from 'pinia'

const store = useSeancesStore()
const { cinemas } = storeToRefs(store)
</script> 