<template>
  <div class="wrapper">
    <div class="content">
      <img class="logo" :src="logo" alt="Fiter logo" />

      <button class="btn-back" type="button" @click="goBack" aria-label="Go back">←</button>

      <div class="form-card">
        <label for="name">Name</label>
        <input id="name" type="text" placeholder="Value" />

        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Value" />

        <button class="btn-submit">Register</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '../assets/fiterlogo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;

  background: linear-gradient(
    to bottom,
    #1f1f1f 30%,
    #8b0000 100%
  );
}

.wrapper {
  min-height: 100dvh;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 6px 16px;
}

.content {
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100%;
  max-width: 393px;
  height: auto;
  display: block;
}

.btn-back {
  align-self: flex-start;
  margin-top: 0;
  margin-bottom: 4px;
  border: none;
  background: transparent;
  color: #111;
  font-size: 44px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.form-card {
  background: #c40000;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}

.form-card label {
  color: #111;
  font-weight: 600;
}

.form-card input {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #e0e0e0;
  width: 100%;
}

.btn-submit {
  margin-top: 6px;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid black;
  background: red;
  color: white;
  width: 100%;
  cursor: pointer;
  font-weight: 700;
}

</style>