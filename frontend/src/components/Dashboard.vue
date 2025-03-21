<template>
    <div class="dashboard">
      <h1>Bienvenido, Admin</h1>
      <p>Panel de control</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      return {
        router
      };
    },
    methods: {
      logout() {
        this.router.push('/login'); 
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    background: black;
    color: white;
    font-family: 'Press Start 2P', cursive;
    padding: 50px;
    border: 4px solid white;
  }
  
  button {
    background: white;
    color: black;
    border: 4px solid black;
    font-family: 'Press Start 2P', cursive;
    padding: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background: black;
    color: white;
  }
  </style>
  