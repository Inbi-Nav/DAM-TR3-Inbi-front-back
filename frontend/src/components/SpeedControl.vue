<template>
    <div class="speed-control">
      <h2> Control de Velocidad</h2>
      <input type="number" v-model.number="newSpeed" step="0.1" min="1" />
      <button @click="updateSpeed">Actualizar Velocidad</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newSpeed: 5,
        message: ''
      };
    },
    mounted() {
      this.loadCurrentSpeed();
    },
    methods: {
      async loadCurrentSpeed() {
        try {
          const res = await axios.get('http://dam.inspedralbes.cat:27775/game/settings');
          this.newSpeed = res.data.moveSpeed;
        } catch (err) {
          this.message = 'Error al obtener velocidad actual';
        }
      },
      async updateSpeed() {
        try {
          await axios.put('http://dam.inspedralbes.cat:27775/game/settings', {
            moveSpeed: this.newSpeed
          });
          this.message = `Velocidad actualizada a ${this.newSpeed}`;
        } catch (err) {
          this.message = ' Error al actualizar velocidad';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .speed-control {
    background: #000;
    color: #fff;
    padding: 20px;
    border: 2px solid white;
    font-family: 'VT323', monospace;
  }
  input {
    margin: 10px 0;
    padding: 5px;
    font-size: 1rem;
  }
  button {
    padding: 8px 12px;
    font-size: 1rem;
    background: white;
    color: black;
    cursor: pointer;
    font-family: 'VT323', monospace;
  }
  button:hover {
    background: black;
    color: white;
    border: 1px solid white;
  }
  </style>
  