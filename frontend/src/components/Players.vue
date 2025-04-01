<template>
  <div class="players-page">
    <div class="header">
      <h1>🎮 Lista de Jugadores</h1>
      <button class="back-btn" @click="volver">← Volver</button>
    </div>

    <div class="players-list">
      <div v-for="player in players" :key="player.id" class="player-card">
        <h3>{{ player.username }}</h3>
        <p>🎯 Partidas jugadas: {{ player.gamesPlayed }}</p>
        <p>📅 Registro: {{ formatDate(player.createdAt) }}</p>
        <p :class="{ active: player.isActive, inactive: !player.isActive }">
          {{ player.isActive ? '🟢 Activo' : '🔴 Inactivo' }}
        </p>

        <div class="buttons">
          <button class="toggle-btn" @click="toggleActive(player.id)">
            {{ player.isActive ? 'Desactivar' : 'Activar' }}
          </button>
          <button class="delete-btn" @click="deleteUser(player.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      players: []
    };
  },
  async mounted() {
    await this.loadPlayers();
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async loadPlayers() {
      try {
        const res = await axios.get('http://dam.inspedralbes.cat:27775/users');
        this.players = res.data;
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
      }
    },
    volver() {
      this.router.push('/dashboard');
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    async toggleActive(id) {
      try {
        await axios.put(`http://dam.inspedralbes.cat:27775/users/${id}/toggle-active`);
        await this.loadPlayers();
      } catch (err) {
        alert('Error al cambiar estado del usuario');
      }
    },
    async deleteUser(id) {
      if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
      try {
        await axios.delete(`http://dam.inspedralbes.cat:27775/users/${id}`);
        await this.loadPlayers();
      } catch (err) {
        alert('Error al eliminar el usuario');
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.players-page {
  background: #fff;
  color: #000;
  font-family: 'VT323', monospace;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid black;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

h1 {
  font-size: 3rem;
  margin: 0;
}

.back-btn {
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  background: black;
  color: white;
  border: 2px solid black;
  padding: 8px 16px;
  cursor: pointer;
  transition: 0.2s;
}
.back-btn:hover {
  background: white;
  color: black;
}

.players-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.player-card {
  border: 3px solid black;
  background: #000;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.2s;
}

.player-card:hover {
  transform: scale(1.03);
  background: #111;
}

.player-card h3 {
  font-size: 1.6rem;
  margin-bottom: 10px;
}
.player-card p {
  font-size: 1rem;
  margin: 5px 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.toggle-btn {
  background: orange;
  color: black;
  border: 2px solid black;
  padding: 8px 14px;
  cursor: pointer;
  font-family: 'VT323', monospace;
}

.delete-btn {
  background: red;
  color: white;
  border: 2px solid black;
  padding: 8px 14px;
  cursor: pointer;
  font-family: 'VT323', monospace;
}

.active {
  color: #4caf50;
}

.inactive {
  color: #f44336;
}
</style>
