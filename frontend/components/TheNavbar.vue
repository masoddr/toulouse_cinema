<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="font-bold text-xl">
          Cinémas Toulouse
        </NuxtLink>
        
        <div class="flex space-x-4">
          <NuxtLink 
            to="/cinemas"
            class="hover:text-opacity-90 transition-colors"
          >
            Les cinémas
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Les imports ne sont plus nécessaires car nous n'utilisons plus les stores
</script> 