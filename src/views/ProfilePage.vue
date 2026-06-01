<template>
  <div class="page">

    <!-- HEADER -->
    <header class="topbar">

      <div class="header-left">

        <img
          :src="assets.pfp"
          alt="Profile"
          class="avatar"
          @click="goProfile"
        />

        <div class="streak-badge">

          <span class="streak-number">
            75
          </span>

          <img
            :src="assets.flame"
            alt="Flame"
            class="flame-icon"
          />

        </div>

      </div>

      <button class="settings-btn" @click="goSettings">

        <img
          :src="assets.settings"
          alt="Settings"
          class="settings-icon"
        />

      </button>

    </header>

    <!-- CONTENT -->
    <main class="content">

      <div class="empty-box">

        <h1>Profile</h1>

        <p>
          Profile page is empty for now.
        </p>
        <p>
            lebo koby je nigger :/
        </p>

      </div>

    </main>

    <!-- BOTTOM NAV -->
    <nav class="bottom-nav">

      <!-- WORKOUT -->
      <button
        class="nav-tab"
        @click="goWorkout"
      >
        <img
          :src="workoutImg"
          class="nav-icon"
        />
      </button>

      <!-- HOME -->
      <button
        class="nav-tab"
        @click="goHome"
      >
        <img
          :src="homeImg"
          class="nav-icon"
        />
      </button>

      <!-- FOOD -->
      <button
        class="nav-tab"
        @click="goFood"
      >
        <img
          :src="foodImg"
          class="nav-icon"
        />
      </button>

      <!-- PROFILE -->
      <button class="nav-tab active">
        <img
          :src="profileImg"
          class="nav-icon"
        />
      </button>

    </nav>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// ASSETS
import pfpImg from '@/assets/pfp.png'
import flameImg from '@/assets/flame.png'
import settingsImg from '@/assets/settings.png'

import workoutImg from '@/assets/workout.png'
import homeImg from '@/assets/home.png'
import foodImg from '@/assets/food.png'
import profileImg from '@/assets/profile.png'

const assets = {
  pfp: pfpImg,
  flame: flameImg,
  settings: settingsImg,
}

/* HEADER NAV */
function goProfile() {
  router.push('/profile')
}

function goSettings() {
  router.push('/settings')
}

/* FOOTER NAV */
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
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

/* HEADER */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 10px;
  background: #1a1a1a;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #c0392b;
}

.streak-badge {
  display: flex;
  align-items: center;
  gap: 4px;
}

.streak-number {
  font-size: 24px;
  font-weight: 700;
}

.flame-icon {
  width: 20px;
  height: 20px;
}

.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.settings-icon {
  width: 24px;
  height: 24px;
  filter: invert(1) brightness(0.7);
}

/* CONTENT */
.content {
  flex: 1;
  padding: 24px 20px 120px;
}

.empty-box {
  width: 100%;
  min-height: 300px;
  border-radius: 28px;
  background: #2a2a2a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-box h1 {
  font-size: 34px;
  color: #e74c3c;
  margin-bottom: 12px;
  font-family: Georgia, serif;
}

.empty-box p {
  color: #cfcfcf;
  font-size: 15px;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 0 20px;
  background: linear-gradient(
    180deg,
    #1a1a1a 0%,
    #e74c3c 100%
  );
}

.nav-tab {
  background: none;
  border: none;
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