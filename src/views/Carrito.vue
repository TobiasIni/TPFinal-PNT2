<template>
    <div class="cart-view">
        <h1>Tu carrito</h1>
        <p>Productos en carrito: {{ cantidadCarrito }}</p>
        <div class="cart-items">
            <CartItem v-for="producto in productosCarrito" :key="producto.id" :item="producto" />
        </div>
    </div>
    <button @click="realizarCompra" class="compra-button">
        Realizar compra
    </button>
</template>
<script>

import { useEventStore } from '../stores/eventStore.js';
import CartItem from '../components/CartItem.vue'

export default {
    props: {
        item: Object
    },
    components: {
        CartItem
    },
    computed: {
        cantidadCarrito() {
            const eventStore = useEventStore();
            return eventStore.cantidadCarrito;
        },
        productosCarrito() {
            const eventStore = useEventStore();
            return eventStore.cart
        },
        realizarCompra() {
            const eventStore = useEventStore();
            eventStore.comprarEntradas();
            this.$router.push({ name: 'Entradas' })
        }
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