<template>
  <div class="wrapper">
    <img class="logo" :src="logo" alt="Fiter logo" height="478" width="393"/>
    <div class="center-container">
      <button @click="goSignin" class="btn-signin">Sign In</button>
      <button @click="goRegister" class="btn-register">Register</button>
    </div>
  </div>
</template>

<script setup>
import logo from '../assets/fiterlogo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

function goRegister() {
  router.push({ name: 'Register' })
}

function goSignin() {
  router.push({ name: 'Signin' })
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;

  background: linear-gradient(
      to bottom,
      #1f1f1f 40%,
      #8b0000 100%
  );
}

/* FULLSCREEN wrapper */
.wrapper {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

/* buttons container */
.center-container {
  display: flex;
  gap: 16px;
}

/* buttons */
.btn-signin{
  padding: 16px 24px;
  font-size: 18px;
  border: none;
  border-radius: 12px;

  background-color: red;
  color: black;
}
.btn-register {
  padding: 16px 24px;
  font-size: 18px;
  border: none;
  border-radius: 12px;
  background-color: black;
  color: white;
}

.logo {

}

</style>

