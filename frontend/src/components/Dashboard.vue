<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2 class="logo">👤 </h2> 
      <nav class="nav-buttons">
        <button @click="goToPlayers"> Jugadores</button>
        <button @click="goToStats"> Estadísticas</button>
      </nav>
    </aside>

    <div class="main">
      <header class="topbar">
        <button class="logout-btn" @click="logout"> Cerrar Sesión</button>
      </header>
      <section class="content">
        <h1> 🎮 DUALSPIRIT</h1>
      </section>
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
    goToStats() {
      this.router.push('/stats');
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
  display: flex;
  height: 100vh;
  font-family: 'VT323', monospace;
}

.sidebar {
  width: 250px;
  background-color: black;
  color: white;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.logo {
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
}

.nav-buttons button {
  font-size: 1.3rem;
  background: white;
  color: black;
  border: 2px solid white;
  padding: 12px 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
}

.nav-buttons button:hover {
  background: black;
  color: white;
  border-color: white;
}

.main {
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
  position: relative;
}

.topbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.logout-btn {
  font-size: 1.1rem;
  background: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'VT323', monospace;
  border: 2px solid darkred;
  transition: 0.3s;
}

.logout-btn:hover {
  background: white;
  color: red;
  border-color: red;
}

.content {
  text-align: center;
  color: #333;
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
</style>
