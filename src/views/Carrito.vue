<template>
    <div class="cart-view">
        <h1>Tu carrito</h1>
        <p>Productos en carrito: {{ cantidadCarrito }}</p>
        <div class="cart-items">
            <CartItem v-for="producto in productosCarrito" :key="producto.id" :item="producto"/>
        </div>
    </div>
</template>
<script>
import { useEventStore } from '../stores/eventStore.js';
import CartItem from '../components/CartItem.vue'

export default {
    components:{
        CartItem
    },
    computed:{
        cantidadCarrito(){
            const eventStore = useEventStore();
            return eventStore.cantidadCarrito;
        },
        productosCarrito(){
            const eventStore = useEventStore();
            return eventStore.cart
        }
    }
    
}
</script>
<style>
    .cart-view{
        padding: 1rem
    }
    .cart-items{
        margin-top: 1rem
    }
</style>