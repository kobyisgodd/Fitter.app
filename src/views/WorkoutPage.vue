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
          <span class="streak-number">75</span>

          <img
            :src="assets.flame"
            alt="streak"
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

      <!-- ROUTINES -->
      <section class="section">

        <div class="section-header">
          <h1>My Workout Routines</h1>
          <span class="search-icon">⌕</span>
        </div>
        <input
          v-model="search"
          type="text"
          placeholder="Search workouts..."
          class="workout-search"
        />

        <button class="main-btn" @click="startEmptyWorkout">
          Start Workout
        </button>

      </section>

      <!-- PAST WORKOUTS -->
      <section class="section">

        <h1>Past Workouts</h1>

        <div
          class="workout-card"
          v-for="(workout, index) in filteredWorkouts"
          :key="workout.id"
        >

          <div class="card-header">
            <h2>{{ workout.name }}</h2>

            <div class="menu-wrapper">
              <span class="menu" @click.stop="toggleMenu(index)">⋮</span>

              <div v-if="openMenu === index" class="menu-overlay" @click.self="closeMenu">

                <div class="menu-box">

                  <button class="menu-item" @click="renameWorkout(index)"> Rename </button>

                  <button class="menu-item danger" @click="deleteWorkout(index)"> Delete </button>
                </div>

              </div>
            </div>
          </div>

          <p class="subtitle">
            4 sets • 6 exercises
          </p>

          <div class="exercise-list">
            <div class="exercise-pill">Squat</div>
            <div class="exercise-pill">Leg Press</div>
            <div class="exercise-pill">Lunges</div>
          </div>

          <div class="card-footer">
            <span class="more-text">
              show 3 more exercises...
            </span>

            <button class="start-btn" @click="startWorkout">
              START
            </button>
          </div>

        </div>

      </section>

    </main>

    <!-- FOOTER -->
    <nav class="bottom-nav">

      <button class="nav-tab nav-tab-active" @click="goWorkout">
        <img :src="workoutImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goHome">
        <img :src="homeImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goFood">
        <img :src="foodImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goProfile">
        <img :src="profileImg" class="nav-icon" />
      </button>

    </nav>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const search = ref('')
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

/* NAV */
function goProfile() { router.push('/profile') }
function goSettings() { router.push('/settings') }
function goHome() { router.push('/home') }
function goWorkout() { router.push('/workoutpage') }
function goFood() { router.push('/nutrition') }

/* WORKOUT ACTIONS */
function startEmptyWorkout() {
  router.push({ name: 'StartWorkout', query: { empty: 'true' } })
}

function startWorkout() {
  router.push({ name: 'StartWorkout' })
}

/* WORKOUT DATA */
const workouts = ref([
  { id: 1, name: 'Lower Body Routine' },
  { id: 2, name: 'Push Day' },
  { id: 3, name: 'Full Body' }
])

const filteredWorkouts = computed(() => {
  if (!search.value) return workouts.value

  return workouts.value.filter(w =>
    w.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const openMenu = ref(null)

function toggleMenu(index) {
  openMenu.value = openMenu.value === index ? null : index
}

function closeMenu() {
  openMenu.value = null
}

function renameWorkout(index) {
  const newName = prompt('Rename workout:')
  if (newName && newName.trim()) {
    workouts.value[index].name = newName.trim()
  }
  closeMenu()
}

function deleteWorkout(index) {
  workouts.value.splice(index, 1)
  closeMenu()
}


</script>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  display: flex;
  flex-direction: column;

  height: 100dvh;
  width: 100%;

  background: #1a1a1a;

  color: white;

  font-family: 'Segoe UI', sans-serif;

  overflow: hidden;
}

/* HEADER */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px 20px 8px;

  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;

  gap: 10px;
}

.avatar {
  width: 42px;
  height: 42px;

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
  font-size: 22px;
  font-weight: 700;

  color: #fff;
}

.flame-icon {
  width: 20px;
  height: 20px;

  object-fit: contain;
}

.settings-btn {
  background: none;
  border: none;

  cursor: pointer;

  padding: 4px;
}

.settings-icon {
  width: 24px;
  height: 24px;

  object-fit: contain;

  filter: invert(1) brightness(0.7);
}

/* CONTENT */
.content {
  flex: 1;

  overflow-y: auto;

  padding: 0 16px 120px;

  scrollbar-width: none;
}

.content::-webkit-scrollbar {
  display: none;
}

/* SECTION */
.section {
  margin-bottom: 34px;
}

/* SECTION HEADER */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* TITLES */
.section h1 {
  color: #e74c3c;

  font-size: 30px;

  margin-bottom: 18px;

  font-family: Georgia, serif;
}

/* SEARCH */
.search-icon {
  font-size: 28px;

  color: #e74c3c;
}

/* BUTTONS */
.main-btn {
  width: 100%;

  border: none;

  background: linear-gradient(
    135deg,
    #8b0000 0%,
    #c0392b 100%
  );

  color: white;

  padding: 18px;

  border-radius: 999px;

  margin-bottom: 16px;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
}

/* WORKOUT CARD */
.workout-card {
  background: #2a2a2a;

  border-radius: 28px;

  padding: 20px;

  margin-bottom: 24px;

  color: #f5dede;
}

/* CARD HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 22px;
}

/* MENU */
.menu {
  font-size: 24px;
}

/* SUBTITLE */
.subtitle {
  margin-top: 8px;
  margin-bottom: 18px;

  color: #aaa;
}

/* EXERCISE LIST */
.exercise-list {
  display: flex;
  flex-direction: column;

  gap: 12px;
}

.exercise-pill {
  background: #1d1d1d;

  padding: 14px 18px;

  border-radius: 999px;

  color: #f0dada;
}

/* FOOTER */
.card-footer {
  margin-top: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* TEXT */
.more-text {
  color: #aaa;
}

/* START BTN */
.start-btn {
  border: none;

  background: linear-gradient(
    135deg,
    #8b0000 0%,
    #c0392b 100%
  );

  color: white;

  width: 76px;
  height: 76px;

  border-radius: 50%;

  font-weight: 700;

  cursor: pointer;
}

/* BOTTOM NAV */
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 10px 0 20px;

  background: linear-gradient(
    180deg,
    #1a1a1a 0%,
    #e74c3c 100%
  );

  flex-shrink: 0;

  border-top: 1px solid rgba(255,255,255,0.07);

  position: fixed;
  bottom: 0;

  width: 100%;
}

/* NAV BTN */
.nav-tab {
  background: none;
  border: none;

  cursor: pointer;

  padding: 8px 16px;

  border-radius: 10px;

  transition: background 0.15s;
}

.nav-tab:hover {
  background: rgba(255,255,255,0.08);
}

/* NAV ICON */
.nav-icon {
  width: 26px;
  height: 26px;

  object-fit: contain;

  filter: invert(1) brightness(0.6);
}

/* ACTIVE */
.nav-tab-active .nav-icon {
  filter: invert(30%)
  sepia(90%)
  saturate(500%)
  hue-rotate(330deg)
  brightness(1.2);
}

.dropdown-menu {
  position: absolute;
  top: 45px;
  right: 10px;

  width: 140px;

  background: #2b2b2b;
  border: 1px solid rgba(255,255,255,0.08);

  border-radius: 14px;

  padding: 6px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  box-shadow: 0 10px 25px rgba(0,0,0,0.4);

  z-index: 50;
}

/* ITEMS */
.dropdown-item {
  background: none;
  border: none;

  color: #eaeaea;

  padding: 10px 10px;

  text-align: left;

  font-size: 14px;

  border-radius: 10px;

  cursor: pointer;

  transition: 0.15s ease;
}

.dropdown-item:hover {
  background: rgba(255,255,255,0.06);
}

/* DELETE STYLE */
.dropdown-item.danger {
  color: #ff4d4d;
}

.dropdown-item.danger:hover {
  background: rgba(255, 77, 77, 0.12);
}

.menu-overlay {
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 999;
}

.menu-box {
  position: absolute;
  right: 30px;
  top: 140px;

  width: 140px;
  background: #2b2b2b;

  border-radius: 12px;
  padding: 6px;

  display: flex;
  flex-direction: column;
}

.menu-item {
  background: none;
  border: none;

  color: white;
  padding: 10px;

  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background: rgba(255,255,255,0.08);
}

.menu-item.danger {
  color: #ff4d4d;
}

.workout-search {
  width: 100%;
  margin: 10px 0 18px;
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  background: #2a2a2a;
  color: white;
  outline: none;
}
</style>