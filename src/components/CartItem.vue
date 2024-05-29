<template >
    <div class="cart-item">
        <img :src="item.image " :alt="item.title" class="cart-item-image"/>
        <div class="cart-item-info">
            <h3>{{item.title}}</h3>
            <p>${{item.price}}</p>
        </div>
        <button @click="removerDelCarrito" class="remove-button">X</button>
    </div>
</template>
<script>

import { useProductStore } from '../stores/productStore';

export default {
    props: {
        item: Object
    },
    methods:{
        removerDelCarrito(){
            const productStore = useProductStore()
            productStore.removerDelCarrito(this.item)
        }
    }
}
</script>
<style >
    .cart-item{
        display: flex;
        align-items: center;
        margin-bottom: 1rem
    }

    .cart-item-image{
        width: 50px;
        height: 50px;
        margin-bottom: 1rem
    }

    .cart-item-info {
        flex-grow: 1
    }

    .remove-button {
        background-color: #ff6b6b;
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer
    }

    .remove-button:hover {
        background-color: '#ff4c4c';
    }
    
</style>