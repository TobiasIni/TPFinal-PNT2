<template>
    <div class="profile-container">
      <h2>Perfil</h2>
      <ul>
        <li><strong>Nombre: </strong>{{user.Nombre}}</li>
        <li><strong>Materia: </strong>{{user.Materia}}</li>
        <li><strong>Instituto: </strong>{{user.Academia}}</li>  
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return{
        user:{
          "Nombre":'Matias',
          "Materia":"PNT2",
          "Academia":"ORT"
        }
      }
    },
    mounted(){
      if(!localStorage.getItem('isAuthenticated')){
        this.$router.push({ name: 'Login'})
      }
    }
  }
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 700px; /* Aumentar el tamaño máximo del contenedor */
    margin: 40px auto;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .profile-container h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .profile-container ul {
    list-style: none;
    padding: 0;
  }
  
  .profile-container li {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  </style>
  