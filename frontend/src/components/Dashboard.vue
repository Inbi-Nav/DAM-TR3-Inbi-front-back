<template>
  <div class="dashboard">
    <div class="header">
      <h1>🎮 DUALSPIRIT</h1>
    </div>

    <div class="actions">
      <button @click="goToPlayers">👥Jugadores</button>
      <button @click="logout">🚪 Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    goToPlayers() {
      this.router.push('/players');
    },
    logout() {
      this.router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.dashboard {
  background: #fff;
  color: #000;
  font-family: 'VT323', monospace;
  min-height: 100vh;
  padding: 60px 20px;
  box-sizing: border-box;
  text-align: center;
}

.header h1 {
  font-size: 3.5rem;
  margin-bottom: 10px;
}



.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

button {
  font-family: 'VT323', monospace;
  font-size: 1.4rem;
  background: black;
  color: white;
  border: 3px solid black;
  padding: 15px 30px;
  cursor: pointer;
  transition: 0.3s;
  min-width: 200px;
}

button:hover {
  background: white;
  color: black;
}
</style>
