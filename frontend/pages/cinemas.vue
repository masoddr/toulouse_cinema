<template>
  <div class="container mx-auto px-4 py-8">
    <NuxtLink 
      to="/" 
      class="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Retour à l'accueil
    </NuxtLink>

    <h1 class="text-3xl font-bold mb-6">Nos Cinémas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cinema in cinemas" :key="cinema.id" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-2">{{ cinema.nom }}</h2>
        <p class="text-gray-600 mb-2">{{ cinema.adresse }}</p>
        <p class="text-gray-600 mb-4">{{ cinema.ville }}</p>
        <div class="flex items-center space-x-2 mb-3">
          <span class="text-sm text-gray-500">{{ cinema.nombreSalles }} salles</span>
          <span class="text-sm text-gray-500">•</span>
          <span class="text-sm text-gray-500">{{ cinema.telephone }}</span>
        </div>
        <a 
          :href="cinema.siteWeb" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
        >
          Visiter le site web
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const cinemas = ref([
  {
    id: 'ABC',
    nom: 'ABC',
    adresse: '13 Rue Saint-Bernard',
    ville: 'Toulouse',
    nombreSalles: 3,
    telephone: '05 61 21 20 46',
    siteWeb: 'https://abc-toulouse.fr'
  },
  {
    id: 'AMERICAN_COSMOGRAPH', 
    nom: 'American Cosmograph',
    adresse: '24 Rue Montardy',
    ville: 'Toulouse',
    nombreSalles: 3,
    telephone: '05 61 21 22 11',
    siteWeb: 'https://www.american-cosmograph.fr'
  },
  {
    id: 'UTOPIA_BORDEROUGE',
    nom: 'Utopia Borderouge',
    adresse: '59 Avenue Maurice Bourges-Maunoury',
    ville: 'Toulouse',
    nombreSalles: 3,
    telephone: '05 61 50 50 43',
    siteWeb: 'http://www.cinemas-utopia.org/toulouse'
  },
  {
    id: 'CRATERE',
    nom: 'Le cratère',
    adresse: '95 Grande Rue Saint-Michel',
    ville: 'Toulouse',
    nombreSalles: 1,
    telephone: '05 61 53 50 53',
    siteWeb: 'https://www.cinemalecratere.com'
  },
  {
    id: 'PATHE_WILSON',
    nom: 'Pathé Wilson',
    adresse: '3 Place du Président Thomas Wilson',
    ville: 'Toulouse', 
    nombreSalles: 8,
    telephone: '08 92 69 66 96',
    siteWeb: 'https://www.pathe.fr/cinemas/cinema-pathe-wilson'
  },
  {
    id: 'UGC_MONTAUDRAN',
    nom: 'UGC Montaudran',
    adresse: '10 Avenue Didier Daurat',
    ville: 'Toulouse',
    nombreSalles: 7,
    telephone: '05 61 00 85 50',
    siteWeb: 'https://www.ugc.fr/cinema-ugc-montaudran.html'
  }
])
</script> 