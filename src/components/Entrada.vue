<template >
    <div class="cart-item">
        <img :src="item.imageUrl || 'default-image-url.jpg'" :alt="item.name || 'No Name Available'" class="cart-item-image" />
        <div class="cart-item-info">
            <h3>{{item.name}}</h3>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        item: Object
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
        width: 70px;
        height: 70px;
        margin: 1rem;
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