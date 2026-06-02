<template>
  <div class="page">

    <!-- HEADER -->
    <header class="topbar">

      <div class="header-left">
        <img
            :src="assets.pfp"
            alt="Profile"
            class="avatar"
        />

        <div class="streak-badge">
          <span class="streak-number">75</span>

          <img
              :src="assets.flame"
              alt="Flame"
              class="flame-icon"
          />
        </div>
      </div>

      <button class="settings-btn" @click = "goSettings">
        <img
            :src="assets.settings"
            alt="Settings"
            class="settings-icon"
        />
      </button>

    </header>

    <!-- CONTENT -->
    <main class="content">

      <section class="profile-card">

        <img
            :src="assets.pfp"
            class="profile-avatar"
            alt="Profile"
        />

        <h1 class="username">
          Levi Ackerman
        </h1>

        <p class="profile-subtitle">
          Fitness Enthusiast
        </p>

      </section>

      <section class="stats">

        <div class="stat-box">
          <h2>75</h2>
          <span>Day Streak</span>
        </div>

        <div class="stat-box">
          <h2>124</h2>
          <span>Workouts</span>
        </div>

        <div class="stat-box">
          <h2>82kg</h2>
          <span>Weight</span>
        </div>

      </section>

      <section class="card">

        <h2>Personal Info</h2>

        <div class="info-row">
          <span>Age</span>
          <span>20</span>
        </div>

        <div class="info-row">
          <span>Height</span>
          <span>185 cm</span>
        </div>

        <div class="info-row">
          <span>Goal</span>
          <span>Build Muscle</span>
        </div>

      </section>

      <section class="card">

        <h2>Achievements</h2>

        <div class="achievement">
          🔥 75 Day Streak
        </div>

        <div class="achievement">
          💪 100+ Workouts Completed
        </div>

        <div class="achievement">
          🥗 Nutrition Tracking Active
        </div>

      </section>

    </main>

    <!-- BOTTOM NAV -->
    <nav class="bottom-nav">

      <button class="nav-tab" @click="goWorkout">
        <img :src="workoutImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goHome">
        <img :src="homeImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goFood">
        <img :src="foodImg" class="nav-icon" />
      </button>

      <button class="nav-tab active">
        <img :src="profileImg" class="nav-icon" />
      </button>

    </nav>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import pfpImg from '@/assets/pfp.png'
import flameImg from '@/assets/flame.png'
import settingsImg from '@/assets/settings.png'

import workoutImg from '@/assets/workout.png'
import homeImg from '@/assets/home.png'
import foodImg from '@/assets/food.png'
import profileImg from '@/assets/profile.png'

const router = useRouter()

const assets = {
  pfp: pfpImg,
  flame: flameImg,
  settings: settingsImg,
}
function goSettings() {
  router.push('/settings')
}

/* NAV */
function goWorkout() {
  router.push('/workoutpage')
}

function goHome() {
  router.push('/home')
}

function goFood() {
  router.push('/nutrition')
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
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

/* HEADER */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid #e74c3c;
}

.streak-badge {
  display: flex;
  align-items: center;
  gap: 5px;
}

.streak-number {
  font-size: 24px;
  font-weight: bold;
}

.flame-icon {
  width: 20px;
  height: 20px;
}

.settings-btn {
  background: transparent;
  border: none;
}

.settings-icon {
  width: 24px;
  filter: invert(1);
}

/* CONTENT */
.content {
  flex: 1;
  padding: 0 20px 120px;
}

/* PROFILE */
.profile-card {
  background: #2a2a2a;
  border-radius: 28px;
  padding: 30px;
  text-align: center;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #e74c3c;
  object-fit: cover;
  margin-bottom: 15px;
}

.username {
  color: #e74c3c;
  font-size: 32px;
  margin-bottom: 5px;
}

.profile-subtitle {
  color: #bdbdbd;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.stat-box {
  background: #2a2a2a;
  border-radius: 20px;
  padding: 20px 10px;
  text-align: center;
}

.stat-box h2 {
  color: #e74c3c;
  margin-bottom: 6px;
}

.stat-box span {
  color: #cfcfcf;
  font-size: 13px;
}

/* CARDS */
.card {
  background: #2a2a2a;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 20px;
}

.card h2 {
  color: #e74c3c;
  margin-bottom: 15px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #3c3c3c;
}

.info-row:last-child {
  border-bottom: none;
}

.achievement {
  padding: 12px 0;
  border-bottom: 1px solid #3c3c3c;
}

.achievement:last-child {
  border-bottom: none;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 12px 0 20px;

  background: linear-gradient(180deg, #1a1a1a 0%, #e74c3c 100%);
  border-top: 1px solid rgba(255,255,255,0.08);
}

.nav-tab {
  background: none;
  border: none;
  cursor: pointer;
}

.nav-icon {
  width: 28px;
  height: 28px;
  filter: invert(1) brightness(0.6);
}

.active .nav-icon {
  filter:
      invert(30%)
      sepia(90%)
      saturate(500%)
      hue-rotate(330deg)
      brightness(1.3);
}
</style>