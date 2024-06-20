<template>
    <div v-if="evento">
      <img :src="evento.imageUrl || 'default-image-url.jpg'" :alt="evento.name || 'No Name Available'" class="event-image" />
      <div class="event-info">
        <h1>{{ evento.name || 'No Name Available' }}</h1>
        <p>{{ evento.description || 'No Description Available' }}</p>
        <p>${{ evento.price || 'N/A' }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import { useEventStore } from '../stores/eventStore.js';
  
  export default {
    data() {
      return {
        evento: null,
      };
    },
    created() {
      this.loadEvent();
    },
    methods: {
      loadEvent() {
        const eventStore = useEventStore();
        this.evento = eventStore.obtenerEvento(this.$route.params.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .event-image {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .event-info {
    margin-top: 8px;
    text-align: center;
  }
  </style>
  