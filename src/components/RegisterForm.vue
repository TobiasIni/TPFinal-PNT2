<template>
  <div class="register-form-container">
    <h1>Registro</h1>
    <form @submit.prevent="register" class="register-form">
      <input v-model="username" type="text" placeholder="Username" class="register-input" required/>
      <input v-model="email" type="email" placeholder="Email" class="register-input" required/>
      <input v-model="password" type="password" placeholder="Password" class="register-input" required/>
      <input ref="addressInput" v-model="address" type="text" placeholder="Address" class="register-input" required/>
      <select v-model="role" class="register-input" required>
        <option disabled value="">Seleccione un rol</option>
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
      <button type="submit" class="register-button">Registro</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'
import { Roles } from '../constants/roles.js'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      address: '',
      location: null,
      role: Roles.USER,
      roles: Object.values(Roles)
    };
  },
  mounted() {
    window.initAutocomplete = this.initAutocomplete;
    this.loadGoogleMapsScript();
  },
  methods: {
    async register() {
      if (this.location && this.address) {
        const authStore = useAuthStore();
        await authStore.register(this.username, this.email, this.password, this.location, this.address, this.role);
        if (authStore.isAuthenticated) {
          this.$router.push({ name: 'Home' });
        }
      } else {
        alert('Completá todos los datos');
      }
    },
    loadGoogleMapsScript() {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUXnmpUG_EiV6dVHBrilwxQDeGhZnVO4k&libraries=places&callback=initAutocomplete`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    },
    initAutocomplete() {
      const addressInput = this.$refs.addressInput;
      const autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['geocode']
      });
      autocomplete.addListener('place_changed', async () => {
        const place = autocomplete.getPlace();
        this.location = await this.getCoordinates(place.formatted_address);
        this.address = place.formatted_address;
      });
    },
    getCoordinates(address) {
      return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            resolve([lat, lng]);
          } else {
            reject('La obtencion de las coordenadas para la direccion dada falló: ' + status);
          }
        });
      });
    }
  }
}
</script>

<style scoped>
.register-form-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.register-button {
  padding: 0.75rem;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

.register-button:hover {
  background-color: #555;
}
</style>
