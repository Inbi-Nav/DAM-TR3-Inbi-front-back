<template>
  <div class="crt">
    <div class="login-container">
      <h2 class="glitch">DUALSPIRIT</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="USERNAME" required />
        <input type="password" v-model="password" placeholder="PASSWORD" required />
        <button type="submit">ENTER</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password
        });

        alert(response.data.message);
        this.router.push('/dashboard'); 
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'ACCESS DENIED';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.crt {
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.crt::before, .crt::after {
  content: "";
  position: absolute;
  width: 110%;
  height: 100%;
  z-index: 1;
}
.crt::before {
  background: linear-gradient(rgba(0, 0, 0, 0.1) 50%, rgba(255, 255, 255, 0.1) 50%);
  background-size: 100% 4px;
  animation: scanline 5s infinite linear;
}
@keyframes scanline {
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
}
.crt::after {
  background: rgba(0, 0, 0, 0.1);
  animation: flicker 0.2s infinite alternate;
}
@keyframes flicker {
  0% { opacity: 0.1; }
  100% { opacity: 0.3; }
}

.login-container {
  width: 350px;
  padding: 20px;
  text-align: center;
  border: 4px solid white;
  background: black;
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-shadow: 2px 2px 0px black;
  position: relative;
  z-index: 2;
  box-sizing: border-box; 
}



input {
  display: block;
  width: calc(100% - 20px); 
  padding: 12px;
  margin: 10px auto; 
  background: black;
  color: white;
  font-family: 'Press Start 2P', cursive;
  border: 3px solid white;
  text-align: center;
  box-sizing: border-box; 
}
button {
  padding: 12px;
  width: 100%;
  background: white;
  color: black;
  border: 3px solid black;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
}

button:hover {
  background: black;
  color: white;
  border-color: white;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 10px;
  animation: blink 1s infinite;
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
