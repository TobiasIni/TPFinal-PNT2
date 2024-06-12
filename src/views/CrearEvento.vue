<template>
    <div>
        <h1>Crear Evento</h1>
        <form @submit.prevent="crearEvento">
            <div>
                <label for="name">Nombre: </label>
                <input v-model="name" id="name" type="text" required/>
            </div>
            <div>
                <label for="description">Descripcion: </label>
                <textarea v-model="description" id="description" type="text" required></textarea>
            </div>
            <div>
                <label for="location">Direccion: </label>
                <input v-model="location" id="location" type="text" required/>
            </div>
            <div>
                <label for="imageUrl">Link de Imagen</label>
                <input v-model="imageUrl" id="imageUrl" type="text" required/>
            </div>
            <div>
                <label for="price">Precio: </label>
                <input v-model="price" id="price" type="number" step="0.01" required/>
            </div>
            <div>
                <label for="currency">Moneda:</label>
                <input v-model="currency" id="currency" type="text" readonly class="readonly-input"/>
            </div>
            <div>
                <label for="stockCant">Stock de entradas:</label>
                <input v-model="stockCant" id="stockCant" type="text" required/>
            </div>
            <button type="submit">Crear Evento</button>
        </form>
    </div>
</template>
<script>

import { useEventStore } from '../stores/eventStore.js';

export default {
    data(){
        return{
            name: "",
            description: "",
            //location lo dejo en texto plano solo para probar. Debería ser '[lat,long]' tomando la direccion del evento y
            // consultando a google maps la coordenadas en formato [lat,long] y enviar eso
            location: "",
            imageUrl: "",
            price: "",
            currency:"U$D",
            stockCant: 0
        }
    },
    methods:{
        crearEvento(){
            const eventStore = useEventStore()

            const nuevoEvento = {
                name: this.title,
                description: this.description,
                location: this.location,
                imageUrl: this.imageUrl,
                price: this.price,
                currency: this.currency,
                stockCant: this.stockCant
            };

            eventStore.agregarEvento(nuevoEvento);
            alert('Evento creado con exito!')
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