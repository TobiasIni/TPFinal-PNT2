<template>
    <div class="cart-view">
        <h1>Tus eventos</h1>
        <p>Entradas adquiridas</p>
        <div class="cart-items">
            <Entrada v-for="item in misEntradas" :key="item.id" :item="item" />
        </div>
    </div>
</template>
<script>


import { useEventStore } from '../stores/eventStore.js';import Evento from '@/components/Evento.vue';
import Entrada from '../components/Entrada.vue'

export default {
    props: {
        item: Object
    },
    components: {
        Entrada
    },
    computed: {
        misEntradas() {
            const eventStore = useEventStore();
            return eventStore.misEntradas
        },
    }

}
</script>
<style>
.cart-view {
    padding: 1rem
}

.cart-items {
    margin-top: 1rem
}

button {
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s;
}

.compra-button {
    font-weight: 600;
    display: flex
}
</style>