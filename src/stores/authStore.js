import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({

        sessionDuration: 1 * 1 * 1000, // 30 minutos en milisegundos
        isAuthenticated: false,
        user: null,
        isAdmin: false
    }),
    actions: {
        async login(username, password) {

            try {
                const response = await fetch('https://664e8e3ffafad45dfae065a1.mockapi.io/api/v1/usuarios')
                const users = await response.json()

                const user = users.find(user => user.username === username && user.password === password)

                if(user) {
                    const currentTime = new Date().getTime();

                    //cambiar la logica booleana para decidir si es admin por una logica con roles "ADMIN", "EMPLEADO", "USUARIO"
                    this.isAuthenticated = true;
                    this.user = user;
                    this.isAdmin = user.admin;
                    
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.setItem('isAdmin', user.admin ? 'true' : 'false')
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('sessionStart', currentTime);
                    localStorage.setItem('sessionDuration', this.sessionDuration);
                }else{
                    alert('Usuario o Contrasena no valido')
                }

            } catch (error) {
                console.error('Error en Login: ', error)
            }
        },
        async register(username, email, password) {
            if (username && email && password) {
                try {
                    const user = {
                        username,
                        email,
                        password,
                        location
                    }

                    console.log('usuario : ', user);

                    const response = await axios.post('https://664e8e3ffafad45dfae065a1.mockapi.io/api/v1/usuarios', user)

                    console.log('RESPONSE: ', response);
                    const data = await response.data;

                    console.log('LA DATA: ', data);

                    this.isAuthenticated = true;
                    this.user = response.data;
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.setItem('user', JSON.stringify(user))
                } catch (error) {
                    console.log('ERROR: ', error);

                }
            } else {
                alert('Completá todos los datos')
            }
        },
        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.isAdmin = false;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('user');
            localStorage.removeItem('sessionStart');
            localStorage.removeItem('sessionDuration');
        },
        checkAuth() {
            const sessionStart = localStorage.getItem('sessionStart');
            const sessionDuration = localStorage.getItem('sessionDuration');
            const currentTime = new Date().getTime();

            console.log('estoy en checkAuth')

            if (sessionStart && sessionDuration) {
                console.log('estoy en primer if')
                const sessionAge = currentTime - sessionStart;
                if (sessionAge > sessionDuration) {
                    console.log('estoy en logout')
                    this.logout();
                } else {
                    console.log('estoy en else ')
                    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
                    // cambiarlo justo con la logica de roles
                    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
                    if (this.isAuthenticated) {
                        this.user = JSON.parse(localStorage.getItem('user'));
                    }
                }
            } else {
                console.log('estoy en else grande')
                this.logout();
            }
        }
    }
})



