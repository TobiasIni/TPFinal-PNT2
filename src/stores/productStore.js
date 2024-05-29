import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        productos: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [] // Obtener del local Storage 
    }),
    getters: {
        cantidadCarrito: (state) => {
            return state.cart.reduce((total, item) => total + item.quantity, 0)
        },
        estaEnCarrito: (state) => (productId) => {
            return !!state.cart.find(item => item.id === productId);
        }
    },
    actions: {
        async fetchProductos(){
            try {
                
                const response = await axios.get('https://664e8e3ffafad45dfae065a1.mockapi.io/api/v1/productos')
                this.productos = response.data;

            } catch (error) {
                console.error('El error es: ', error)
            }
        },
        agregarAlCarrito(producto){
            const productoEnCarrito = this.cart.find( item => item.id === producto.id);
            if(!productoEnCarrito) {
                this.cart.push({ ...producto, quantity: 1})
            } else {
                productoEnCarrito.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
        removerDelCarrito(producto){
            const productoEnCarrito = this.cart.find(item => item.id === producto.id)
            if(productoEnCarrito) {
    
                
    
                // Producto quantity=0
                if(productoEnCarrito.quantity > 1){
                    productoEnCarrito.quantity -= 1;
                } else {
                    this.cart = this.cart.filter(item => item.id !== producto.id)
                }
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }
        },
        async agregarProducto(nuevoProducto) {
            try {
                
                const response = await axios.post('https://664e8e3ffafad45dfae065a1.mockapi.io/api/v1/productos', nuevoProducto);
                

            } catch (error) {
                console.error('Error agregando producto')
            }
        },
        // editarProducto(nuevoProducto) {
        //     this.productos = // TOdos los productos, salvo el que tiene el mismo id, y el que tiene el mismo id, se reemplaza por el otro
        // }
    }

})