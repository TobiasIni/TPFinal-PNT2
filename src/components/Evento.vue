<template>
  <div class="event-card" v-if="evento">
      <img :src="evento.imageUrl || 'default-image-url.jpg'" :alt="evento.name || 'No Name Available'" class="event-image" />
      <div class="event-info">
          <h2>{{ evento.name || 'No Name Available' }}</h2>
          <p>${{ evento.price || 'N/A' }}</p>
      </div>
      <button @click="cambiarCarrito" class="cart-button">
          {{ enCarrito ? 'Sacar del carrito' : 'Agregar al carrito' }}
      </button>
      <button @click="$router.push({name: 'Detalles', state:{evento: evento}})" class="detail-button">
        Ver Detalles
      </button>
  </div>
  <div v-else>
      <p>Loading...</p>
  </div>
</template>
<script>
import { useEventStore } from '../stores/eventStore.js';

export default {
    props:{
        evento: Object
    },
    computed: {
        enCarrito() {
            const eventStore = useEventStore();
            return eventStore.estaEnCarrito(this.evento.id)
        }
    },
    methods: {
        cambiarCarrito(){
            const eventStore = useEventStore();
            if(this.enCarrito) {
                eventStore.removerDelCarrito(this.evento);
            }else{
                eventStore.agregarAlCarrito(this.evento);
            }
        },
        obtenerDetalles(){
          const eventStore = useEventStore()
          eventStore.obtenerDetalles(this.evento)
        }
    }
}
</script>
<style scoped>
.event-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  position: relative;
  transition: box-shadow 0.3s;
}

.event-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-image {
  max-width: 100%;
  border-radius: 8px;
}

.event-info {
  margin-top: 8px;
}

button {
  background-color: rgba(129, 129, 129, 0);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
}

.cart-button {
  margin-top: 8px;
}

.detail-button {
  margin-top: 16px;
}

.event-card:hover .cart-button, .event-card:hover .detail-button {
  background-color: #0056b3;
}
</style>

  