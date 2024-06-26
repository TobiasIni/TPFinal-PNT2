import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Perfil from '../views/Perfil.vue'
import NotFound from '../views/NotFound.vue'
import Carrito from '@/views/Carrito.vue';
import CrearEvento from '@/views/CrearEvento.vue';
import Detalles from '@/views/Detalles.vue';
import Entradas from '@/views/Entradas.vue'


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
            requireAuth: true
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
        path: '/detalles',
        name: 'Detalles',
        component: Detalles,
        meta: {
            requiereAuth: false
        }
    },
    {
        path: '/carrito',
        name: 'Carrito',
        component: Carrito,
        meta: {
            requiereAuth: true
        }
    },
    {
        path: '/entradas',
        name: 'Entradas',
        component: Entradas,
        meta: {
            requiereAuth: true
        }
    },
    {
        path: '/crear-evento',
        name: 'CrearEvento',
        component: CrearEvento,
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
    useAuthStore().checkAuth();
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (to.meta.requiereAuth && !isAuthenticated) {
        next({ name: 'Login' })
    }
    else {
        next();
    }
})

export default router