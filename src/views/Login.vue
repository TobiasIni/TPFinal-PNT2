<template>
    <div class="form-switch-container">
        <div class="form-container" style="background-color: white;">
            <component :is="currentForm" />
        </div>
        <div class="switch-container">
            <span v-if="currentForm === 'LoginForm'">No tenes cuenta? <a @click="cambiarForm">Registrate</a></span>
            <span v-else>Ya tenes cuenta? <a @click="cambiarForm">Inicia Sesion</a></span>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from "@/stores/authStore";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from '../components/RegisterForm.vue'

export default {
    components: {
        LoginForm,
        RegisterForm
    },
    data(){
        return{
            currentForm: 'LoginForm'
        }
    },
    methods:{
        cambiarForm(){
            this.currentForm = this.currentForm === 'LoginForm' ? 'RegisterForm' : 'LoginForm'
        },
        checkAuthorization(){
          const authStore = useAuthStore();
          authStore.checkAuth();
          if(authStore.isAuthenticated){
            this.$router.push({ name: 'Home'})
          }
        }
    },
    mounted(){
      this.checkAuthorization();
    }

}
</script>

<style scoped>
.form-switch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-container {
  margin-bottom: 1rem;
}

.switch-container {
  font-size: 1rem;
  color: #333;
}

.switch-container a {
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.switch-container a:hover {
  text-decoration: underline;
}
</style>