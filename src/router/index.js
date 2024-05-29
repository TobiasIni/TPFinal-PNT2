import { createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Perfil from '../views/Perfil.vue'
import NotFound from '../views/NotFound.vue'
import Carrito from '@/views/Carrito.vue';
import CrearProducto from '@/views/CrearProducto.vue';


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiereAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiereAuth: false
        }
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil,
        meta: {
            requiereAuth: true
        }
    },
    {
        path: '/carrito',
        name: 'Carrito',
        component: Carrito,
        meta:{
            requiereAuth: true
        }
    },
    {
        path: '/crear-producto',
        name: 'CrearProducto',
        component: CrearProducto,
        meta: {
            requiereAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    console.log('EL TO', to);
    if(to.meta.requiereAuth && !isAuthenticated){
        next({name:'Login'})
    }
    else{
        next();
    }
 })

export default router