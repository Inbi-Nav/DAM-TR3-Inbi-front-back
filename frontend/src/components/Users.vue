<template>
    <div class="users-table">
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Partidas</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.gamesPlayed }}</td>
            <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: []
      };
    },
    async mounted() {
      const res = await axios.get('http://localhost:3000/users');
      this.users = res.data;
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: monospace;
    background: black;
    color: white;
  }
  th, td {
    padding: 10px;
    border: 1px solid white;
    text-align: center;
  }
  </style>
  