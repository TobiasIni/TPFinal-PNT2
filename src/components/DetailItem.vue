<template >
    <div class="detail-item">
        <img :src="item.image " :alt="item.title" class="cart-item-image"/>
        <div class="cart-item-info">
            <h3>{{item.title}}</h3>
            <p>${{item.price}}</p>
            </div>
            </div>
</template>
<script>

import { useEventStore } from '../stores/eventStore.js';

export default {
    props: {
        item: Object
    },
    methods:{
        removerDelCarrito(){
            const eventStore = useEventStore()
            eventStore.removerDelCarrito(this.item)
        }
    }
}
</script>
<style >
    .detail-item{
        display: flex;
        align-items: center;
        margin-bottom: 1rem
    }

    .detail-item-image{
        width: 50px;
        height: 50px;
        margin-bottom: 1rem
    }

    .detail-item-info {
        flex-grow: 1
    }
    
</style>