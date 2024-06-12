import { defineStore } from 'pinia';
import axios from 'axios';

export const useEventStore = defineStore('eventStore', {
    state: () => ({
        eventos: [],
        mockApiEventsUrl:'https://665f8ef85425580055b01bf5.mockapi.io/events/events/',
        eventsProviderUrl: 'https://api.seatgeek.com/2/events?client_id=NDE4ODk4ODJ8MTcxNzAyNDc0MS44MjkzMjcz',
        cart: JSON.parse(localStorage.getItem('cart')) || [] // Obtener del local Storage 
    }),
    getters: {
        cantidadCarrito: (state) => {
            return state.cart.reduce((total, item) => total + item.quantity, 0)
        },
        estaEnCarrito: (state) => (eventId) => {
            return !!state.cart.find(item => item.id === eventId);
        }
    },
    actions: {
        async fetchEventos(){
            try {
                const response = await axios.get(this.mockApiEventsUrl)
                this.eventos = response.data;
            } catch (error) {
                console.error('El error es: ', error)
            }
        },
        async inicializarBaseDatos(){
            try {
                //Verifico si la base de datos ya fue inicializada para evitar que el proceso se repita cada vez
                //que se refresca el navegados
                const estaInicualizada = localStorage.getItem('dbIncializada');
                if (estaInicualizada) {
                    console.log('Base de datos INICIALIZADA.');
                    return;
                }
                // Hago un get para chequear si la BD este vacia
                const checkResponse = await axios.get(this.mockApiEventsUrl);
                if (checkResponse.data.length > 0){
                    // Si no esta vacia, borro todo
                    for (const evento of checkResponse.data) {
                        await axios.delete(this.mockApiEventsUrl + evento.id);
                    }
                }

                //Hago el get para traerme los eventos de la API
                const response = await axios.get(this.eventsProviderUrl);
                const data = response.data.events;
                
                //Filtro los eventos para quedarme solo con la data que necesito
                const eventosFiltrados = data.map(event => {
                    var precioRandom = (Math.random() * 100).toFixed(2);
                    var stockRandom = Math.floor(Math.random() * 100);
                    
                    return {
                        name: event.title || 'No Name Available',
                        description: event.description || 'No Description Available',
                        location: event.venue.display_location || 'No Location Available',
                        imageUrl: event.performers[0].images?.huge || 'No Image Available',
                        price: precioRandom,
                        currency: "U$D",
                        stockCant: stockRandom
                    };
                });

                //Mando los eventos a mockApi para persistirlos junto con los precios y stock
                for (const evento of eventosFiltrados){
                    await this.agregarEvento(evento);
                }

                // Marcar como inicializada en localStorage
                localStorage.setItem('dbIncializada', 'true');
                console.log('Base de datos inicializada y marcada en localStorage.');
            } catch (error) {
                console.error('Error inicializando Base de Datos: ', error);
            }
        },
        agregarAlCarrito(evento){
            const eventoEnCarrito = this.cart.find( item => item.id === evento.id);
            if(!eventoEnCarrito) {
                this.cart.push({ ...evento, quantity: 1})
            } else {
                eventoEnCarrito.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
        removerDelCarrito(evento){
            const eventoEnCarrito = this.cart.find(item => item.id === evento.id)
            if(eventoEnCarrito) {
                // evento quantity=0
                if(eventoEnCarrito.quantity > 1){
                    eventoEnCarrito.quantity -= 1;
                } else {
                    this.cart = this.cart.filter(item => item.id !== evento.id)
                }
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }
        },
        async agregarEvento(nuevoEvento) {
            try {
                await axios.post(this.mockApiEventsUrl, nuevoEvento);
            } catch (error) {
                console.error('Error agregando un nuevo evento: ', error)
            }
        },
        // editarProducto(nuevoProducto) {
        //     this.productos = // TOdos los productos, salvo el que tiene el mismo id, y el que tiene el mismo id, se reemplaza por el otro
        // }
    }

})