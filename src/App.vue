<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app" class="app-container">
    <Navbar />
    <div class="content">
      <router-view />
    </div>
    <footer class="footer">
      <h1>Footer</h1>
    </footer>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  background-color: #f5f5f5; 
  font-family: Arial, sans-serif;
}

#app {
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  align-items: center;
}

.content {
  flex-grow: 1; 
  background-color: #ffffff; 
  padding: 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
  width: 100%;
  max-width: 900px; /* Aumentar el tamaño máximo del contenedor */
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  border-top: 2px solid #444;
  width: 100%;
}

@media (min-width: 768px) {
  .content {
    padding: 40px;
    margin: 40px;
  }
}
</style>
