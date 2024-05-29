<template>
    <div>
        <h1>Crear Producto</h1>
        <form @submit.prevent="crearProducto">
            <div>
                <label for="title">Titulo: </label>
                <input v-model="title" id="title" type="text" required/>
            </div>
            <div>
                <label for="description">Descripcion: </label>
                <textarea v-model="description" id="description" type="text" required></textarea>
            </div>
            <div>
                <label for="category">Categoria: </label>
                <input v-model="category" id="category" type="text" required/>
            </div>
            <div>
                <label for="price">Precio: </label>
                <input v-model="price" id="price" type="number" step="0.01" required/>
            </div>
            <div>
                <label for="image">Link de Imagen</label>
                <input v-model="image" id="image" type="text" required/>
            </div>
            <button type="submit">Crear Producto</button>
        </form>
    </div>
</template>
<script>

import { useProductStore } from '../stores/productStore';

export default {
    data(){
        return{
            title: "",
            description: "",
            category: "",
            price: "",
            image: ""
        }
    },
    methods:{
        crearProducto(){
            const productStore = useProductStore()

            const nuevoProducto = {
                id: productStore.productos.length + 1,
                title: this.title,
                price: this.price,
                description: this.description,
                category: this.category,
                image: this.image
            };

            productStore.agregarProducto(nuevoProducto);
            alert('Producto creado con exito')
            this.$router.push({ name: 'Home' })
        },
        eliminarProducto(){
            const productStore = useProductStore()


            productStore.EliminarProducto(nuevoProducto);
            alert('Producto creado con exito')
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>
<style>
    form {
        display: flex;
        flex-direction: column
    }
    
    div {
        margin-bottom: 1rem
    }

    label{
        font-weight: 'bold'
    }

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
    }
    
</style>