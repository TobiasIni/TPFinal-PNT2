<template>
    <div class="product-card">
        <img :src="product.image" :alt="product.title" class="product-image"/>
        <div class="product-info">
            <h2>{{ product.title }}</h2>
            <p>${{ product.price }}</p>
        </div>
        <button @click="cambiarCarrito" class="cart-button">
            {{ enCarrito ? 'Sacar del carrito' : 'Agregar al carrito' }}
        </button>
        <h1>Producto</h1>
    </div>
</template>
<script>
import { useProductStore } from '../stores/productStore';

export default {
    props:{
        product: Object
    },
    computed: {
        enCarrito() {
            const productStore = useProductStore();
            console.log('Product Store: ', productStore);
            return productStore.estaEnCarrito(this.product.id)
        }
    },
    methods: {
        cambiarCarrito(){
            console.log('click carrito');
            const productStore = useProductStore();
            if(this.enCarrito) {
                productStore.removerDelCarrito(this.product);
            }else{
              console.log('this producto es: ', this.product);
                productStore.agregarAlCarrito(this.product);
            }
        }
    }
    
}
</script>
<style scoped>
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    position: relative;
    transition: box-shadow 0.3s;
  }
  
  .product-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .product-info {
    margin-top: 8px;
  }
  
  .cart-button {
    background-color: rgba(129, 129, 129, 0);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    transition: background-color 0.3s;
  }
  
  .product-card:hover .cart-button {
    background-color: #0056b3;
  }
  </style>
  