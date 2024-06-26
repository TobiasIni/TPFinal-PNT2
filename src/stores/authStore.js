import { defineStore } from 'pinia';
import axios from 'axios'
import { Roles } from '../constants/roles.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        mockApiAuth: 'https://666a387b7013419182ce91d4.mockapi.io/users' ,
        sessionDuration: 5 * 60 * 1000, // 5 minutos en milisegundos
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

                if(user) {
                    const currentTime = new Date().getTime();
                    this.isAuthenticated = true;
                    this.user = user;

                    if(user.role.toUpperCase() === Roles.ADMIN){
                        console.log("isEmployee: " + this.isEmployee)
                        console.log("Role Admin validado")
                        this.isAdmin = true;
                    }else if(user.role.toUpperCase() === Roles.EMPLOYEE){
                        console.log("isEmployee: " + this.isEmployee)
                        console.log("Role employee validado")
                        this.isEmployee = true;
                    }
                    
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false')
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('isEmployee', this.isEmployee ? 'true' : 'false')
                    localStorage.setItem('sessionStart', currentTime);
                    localStorage.setItem('sessionDuration', this.sessionDuration);
                }else{
                    alert('Usuario o contraseña no válido')
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

                    const response = await axios.post(this.mockApiAuth, user)
                    const data = await response.data;
                    console.log('Usuario persistido en mockAPI: ', data);

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
            this.isEmployee = false;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('isEmployee');
            localStorage.removeItem('user');
            localStorage.removeItem('sessionStart');
            localStorage.removeItem('sessionDuration');
        },
        checkAuth() {
            const sessionStart = localStorage.getItem('sessionStart');
            const sessionDuration = localStorage.getItem('sessionDuration');
            const currentTime = new Date().getTime();

            if (sessionStart && sessionDuration) {
                const sessionAge = currentTime - sessionStart;
                if (sessionAge > sessionDuration) {
                    this.logout();
                } else {
                    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
                    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
                    this.isEmployee = localStorage.getItem('isEmployee') === 'true';
                    if (this.isAuthenticated) {
                        this.user = JSON.parse(localStorage.getItem('user'));
                    }
                }
            } else {
                this.logout();
            }
        }
    }
})