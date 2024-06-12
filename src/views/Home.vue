<template>
    <div>
        <h1>¡Estos son las eventos que tenemos para vos!</h1>
        <div class="event-list">
            <Evento v-for="evento in eventos" :key="evento.id" :evento="evento" />
        </div>
    </div>
</template>
<script>

import Evento from '../components/Evento.vue'
import { useEventStore } from '../stores/eventStore.js'

export default {
    components: {
        Evento
    },
    data(){
        return {
            eventStore: useEventStore()
        }
    },
    computed: {
        eventos(){
            return this.eventStore.eventos
        }
    },
    methods: {
        fetchEventos(){
            this.eventStore.fetchEventos()
            console.log("Eventos: " , this.eventos)
        }
    },
    mounted(){
        this.fetchEventos();
    }
    
}
</script>
<style scoped>
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>