import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        mockApiAuth: 'https://666a387b7013419182ce91d4.mockapi.io/users' ,
        isAuthenticated: false,
        user: null,
        isAdmin: false,
        isEmployee: false
    }),
    actions: {
        async login(username, password) {

            try {
                const response = await axios.get(this.mockApiAuth)
                const users = response.data
                const user = users.find(user => user.username === username && user.password === password)
                console.log('usuario: ' , user)

                if(user) {
                    
                    const currentTime = new Date().getTime();

                    //cambiar la logica booleana para decidir si es admin por una logica con roles "ADMIN", "EMPLEADO", "USUARIO"
                    this.isAuthenticated = true;
                    this.user = user;
                    if(user.role.toLowerCase === 'admin'.toLowerCase){
                        this.isAdmin = true;
                    }else if(user.role.toLowerCase === 'employee'.toLowerCase){
                        this.isEmployee=true;
                    }
                    
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.setItem('isAdmin', user.admin ? 'true' : 'false')
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('isEmployee', this.isEmployee ? 'true' : 'false')
                    localStorage.setItem('sessionStart', currentTime);
                    localStorage.setItem('sessionDuration', this.sessionDuration);
                }else{
                    alert('Usuario o Contrasena no valido')
                }

            } catch (error) {
                console.error('Error en Login: ', error)
            }
        },
        async register(username, email, password, location, role) {
            if (username && email && password && location && role) {
                try {
                    const user = {
                        username,
                        email,
                        password,
                        location,
                        role
                    }

                    console.log('usuario : ', user);

                    const response = await axios.post(this.mockApiAuth, user)

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
            localStorage.removeItem('isEmployee');
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