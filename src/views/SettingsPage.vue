<template>
  <div class="page">

    <!-- TOP BAR -->
    <header class="topbar">

      <button class="back-btn" @click="goHome">
        ←
      </button>

      <div class="title">
        Settings
      </div>

      <div class="spacer"></div>

    </header>

    <!-- MAIN CONTENT -->
    <main class="content">

      <h1 class="section-title">
        Settings
      </h1>

      <div class="menu">

        <button class="menu-item">Profile</button>
        <button class="menu-item">Account</button>
        <button class="menu-item">Statistics</button>
        <button class="menu-item">Calendar</button>
        <button class="menu-item">Nutrition settings</button>

      </div>

    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/home')
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  min-height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

/* TOP BAR */
.topbar {
  display: flex;
  align-items: center;
  padding: 16px 18px;
  background: #1a1a1a;
}

.back-btn {
  background: none;
  border: none;
  color: #aaa;
  font-size: 26px;
  cursor: pointer;
}

.title {
  flex: 1;
  text-align: center;
  color: #aaa;
  font-size: 18px;
  font-weight: 600;
}

/* CONTENT */
.content {
  flex: 1;
  padding: 20px;
}

.section-title {
  font-size: 28px;
  font-family: Georgia, serif;
  color: #e74c3c;
  margin-bottom: 20px;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  width: 100%;
  padding: 16px;
  border-radius: 999px;
  border: none;
  background: #d9d9d9;
  color: #222;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background: #cfcfcf;
}
</style>
