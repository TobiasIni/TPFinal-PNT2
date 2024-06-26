<template>
  <div>
    <h1>Detalles del Evento</h1>
    <div v-if="evento">
      <img :src="evento.imageUrl" :alt="evento.name" />
      <h2>{{ evento.name }}</h2>
      <p>{{ evento.description }}</p>
      <p>${{ evento.price }}</p>
      <div class="review">
        <h3>Review</h3>
        <p>{{ review }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useEventStore } from '../stores/eventStore.js';
import detailItem from '../components/DetailItem.vue'

export default {
  components:{
  detailItem
  } ,
    computed:{
      fetchEvento() {
      const eventStore = useEventStore();
      this.evento = eventStore.obtenerEventoPorId(Number(this.id));
      console.log(this.evento)
    },
    generateReview() {
      const reviews = [
        "This event was fantastic! Highly recommend it.",
        "Had an amazing time at the event, well organized.",
        "It was an unforgettable experience, will definitely go again.",
        "The event exceeded all my expectations.",
        "Great event with lots of fun activities.",
      ];
      this.review = reviews[Math.floor(Math.random() * reviews.length)];
    }
  }
    }


</script>

<style scoped>
img {
  max-width: 100%;
  border-radius: 8px;
}

.review {
  margin-top: 20px;
}

.review h3 {
  margin-bottom: 10px;
}
</style>
