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
import { useProductStore } from '../stores/productStore';
import CartItem from '../components/CartItem.vue'

export default {
    components:{
        CartItem
    },
    computed:{
        cantidadCarrito(){
            const productStore = useProductStore();
            return productStore.cantidadCarrito;
        },
        productosCarrito(){
            const productStore = useProductStore();
            return productStore.cart
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