<template>
  <div class="wrapper">

    <div class="content">

      <!-- LOGO -->
      <img
        class="logo"
        :src="logo"
        alt="Fiter logo"
      />

      <!-- BACK -->
      <button
        class="btn-back"
        @click="goBack"
      >
        ←
      </button>

      <!-- FORM -->
      <div class="form-card">

        <!-- EMAIL -->
        <label>Email</label>

        <input
          type="email"
          placeholder="Enter email"
          v-model="email"
        />

        <!-- PASSWORD -->
        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          v-model="password"
        />

        <!-- ERROR -->
        <p
          v-if="error"
          class="error"
        >
          {{ error }}
        </p>

        <!-- BUTTON -->
        <button
          class="btn-submit"
          @click="signIn"
        >
          Sign In
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/fiterlogo.png'

const router = useRouter()

// INPUTS
const email = ref('')
const password = ref('')

// ERROR
const error = ref('')

// BACK
function goBack() {
  router.back()
}

// SIGN IN
function signIn() {

  // EMPTY CHECK
  if (
    !email.value ||
    !password.value
  ) {
    error.value = 'Please fill all fields.'
    return
  }

  // GET SAVED USER
  const savedUser = JSON.parse(
    localStorage.getItem('user')
  )

  // CHECK IF USER EXISTS
  if (!savedUser) {
    error.value = 'No registered user found.'
    return
  }

  // CHECK LOGIN
  if (
    email.value === savedUser.email &&
    password.value === savedUser.password
  ) {

    // CLEAR ERROR
    error.value = ''

    // GO HOME
    router.push('/home')

  } else {

    error.value = 'Wrong email or password.'

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}

.wrapper {
  min-height: 100vh;

  background: linear-gradient(
    to bottom,
    #1f1f1f 25%,
    #8b0000 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;
}

.content {
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* LOGO */
.logo {
  width: 220px;
  margin-bottom: -10px;
}

/* BACK */
.btn-back {
  align-self: flex-start;

  margin-bottom: 10px;

  background: none;
  border: none;

  color: black;

  font-size: 42px;

  cursor: pointer;
}

/* CARD */
.form-card {
  width: 100%;

  background: #b30000;

  padding: 22px;

  border-radius: 18px;

  display: flex;
  flex-direction: column;

  gap: 12px;
}

/* LABEL */
.form-card label {
  color: black;
  font-weight: 700;
}

/* INPUT */
.form-card input {
  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 12px;

  background: #e4e4e4;

  color: black;

  font-size: 16px;

  outline: none;
}

/* BUTTON */
.btn-submit {
  margin-top: 8px;

  padding: 14px;

  border: none;

  border-radius: 999px;

  background: black;

  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
}

/* ERROR */
.error {
  background: #5a0000;

  color: white;

  padding: 10px;

  border-radius: 10px;

  text-align: center;

  font-size: 14px;
}
</style>