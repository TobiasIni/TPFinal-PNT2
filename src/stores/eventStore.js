import { defineStore } from 'pinia';
import axios from 'axios';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    eventos: [],
    mockApiEventsUrl: 'https://665f8ef85425580055b01bf5.mockapi.io/events/events/',
    eventsProviderUrl: 'https://api.seatgeek.com/2/events?client_id=NDE4ODk4ODJ8MTcxNzAyNDc0MS44MjkzMjcz',
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Obtener del local Storage 
    misEntradas: JSON.parse(localStorage.getItem('misEntradas')) || [],
    detail: JSON.parse(localStorage.getItem('event')) || []
  }),
  getters: {
    cantidadCarrito: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    estaEnCarrito: (state) => (eventId) => {
      return !!state.cart.find(item => item.id === eventId);
    }
  },
  actions: {
    async fetchEventos() {
      try {
        const response = await axios.get(this.mockApiEventsUrl);
        this.eventos = response.data;
      } catch (error) {
        console.error('El error es: ', error);
      }
    },
    async inicializarBaseDatos() {
      try {
        // Verifico si la base de datos ya fue inicializada para evitar que el proceso se repita cada vez
        // que se refresca el navegador
        const estaInicializada = localStorage.getItem('dbInicializada');
        if (estaInicializada) {
          return;
        }
        // Hago un get para chequear si la BD está vacía
        const checkResponse = await axios.get(this.mockApiEventsUrl);
        if (checkResponse.data.length > 0) {
          // Si no está vacía, borro todo
          for (const evento of checkResponse.data) {
            await axios.delete(this.mockApiEventsUrl + evento.id);
          }
        }

        // Hago el get para traerme los eventos de la API
        const response = await axios.get(this.eventsProviderUrl);
        const data = response.data.events;

        // Filtro los eventos para quedarme solo con la data que necesito
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

        // Mando los eventos a mockApi para persistirlos junto con los precios y stock
        for (const evento of eventosFiltrados) {
          await this.agregarEvento(evento);
        }

        // Marcar como inicializada en localStorage
        localStorage.setItem('dbInicializada', 'true');
        console.log('Base de datos inicializada y marcada en localStorage.');
      } catch (error) {
        console.error('Error inicializando Base de Datos: ', error);
      }
    },
    agregarAlCarrito(evento) {
      const eventoEnCarrito = this.cart.find(item => item.id === evento.id);
      if (!eventoEnCarrito) {
        this.cart.push({ ...evento, quantity: 1 });
      } else {
        eventoEnCarrito.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    removerDelCarrito(evento) {
      const eventoEnCarrito = this.cart.find(item => item.id === evento.id);
      if (eventoEnCarrito) {
        if (eventoEnCarrito.quantity > 1) {
          eventoEnCarrito.quantity -= 1;
        } else {
          this.cart = this.cart.filter(item => item.id !== evento.id);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    vistaDetalles(evento) {
      this.detail = evento;
      localStorage.setItem('detail', JSON.stringify(this.detail))
    },
    comprarEntradas() {
      const productos = this.cart;
      let misEntradas = this.misEntradas

      if (misEntradas.length > 0) {
        misEntradas.push(...productos);
      } else {
        misEntradas = productos;
      }

      localStorage.setItem('misEntradas', JSON.stringify(misEntradas));

      localStorage.setItem('cart', JSON.stringify([]));

    },
    async agregarEvento(nuevoEvento) {
      try {
        await axios.post(this.mockApiEventsUrl, nuevoEvento);
      } catch (error) {
        console.error('Error agregando un nuevo evento: ', error);
      }
    },
    obtenerEventoPorId(eventoId) {
      const eventoDetalle = this.eventos.find(item => item.id === eventoId);
      if (eventoDetalle) {
        this.detail.push(eventoDetalle);
        localStorage.setItem('detail', JSON.stringify(this.detail));
        return eventoDetalle;
      }
      return eventoDetalle;
    }
  }
});
