<template>
    <div class="stats">
      <div class="header">
        <h2>📊 Jugadores por Rango</h2>
        <button class="back-btn" @click="volver">← Volver</button>
      </div>
  
      <img
        v-if="imageUrl"
        :src="imageUrl + '?' + timestamp"
        alt="Estadística por rango"
      />
      <p v-else>Cargando gráfica...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        imageUrl: null,
        timestamp: Date.now()
      };
    },
    async mounted() {
      await this.loadLatestImage();
  
      setInterval(async () => {
        await this.loadLatestImage();
      }, 60000);
    },
    methods: {
      volver() {
        this.$router.push('/dashboard');
      },
      async loadLatestImage() {
        try {
          const res = await axios.get('http://dam.inspedralbes.cat:27775/latest-stats');
          this.imageUrl = `http://dam.inspedralbes.cat:27775/stats-imgs/${res.data.filename}`;
          this.timestamp = Date.now();
        } catch (err) {
          console.error('Error cargando imagen:', err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .stats {
    text-align: center;
    font-family: 'VT323', monospace;
    margin-top: 40px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid black;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  img {
    max-width: 100%;
    border: 3px solid black;
    margin-top: 20px;
  }
  .back-btn {
    font-family: 'VT323', monospace;
    font-size: 1.2rem;
    background: black;
    color: white;
    border: 2px solid black;
    padding: 8px 16px;
    cursor: pointer;
    transition: 0.3s;
  }
  .back-btn:hover {
    background: white;
    color: black;
  }
  </style>
  