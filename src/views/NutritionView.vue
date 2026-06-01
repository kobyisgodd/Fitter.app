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

    <!-- MAIN -->
    <main class="content">

      <!-- DASHBOARD -->
      <section class="card">

        <!-- DATE SWITCH -->
        <div class="date-switch">

          <button class="switch-btn" @click="prevDay">
            ‹
          </button>

          <div class="date-text">
            {{ currentDate }}
          </div>

          <button class="switch-btn" @click="nextDay">
            ›
          </button>

        </div>

        <!-- MAIN INFO -->
        <div class="dashboard">

          <div class="circle">
            <div class="circle-inner">
              <span class="circle-number">{{ kcal }}</span>
              <span class="circle-text">kcal</span>
            </div>
          </div>

          <div class="info">
            <p><strong>goal:</strong> 2000 kcal</p>
            <p><strong>gained:</strong> 1800 kcal</p>
            <p><strong>burn:</strong> 1300 kcal</p>

            <div class="small">
              <span>2 meals</span>
              <span>1 exercise</span>
            </div>
          </div>

        </div>

        <!-- MACROS -->
        <div class="macros">

          <div class="macro">
            <div class="macro-circle blue">
              <span>0g</span>
            </div>
            <p>Protein</p>
          </div>

          <div class="macro">
            <div class="macro-circle green">
              <span>0g</span>
            </div>
            <p>Carbs</p>
          </div>

          <div class="macro">
            <div class="macro-circle yellow">
              <span>0g</span>
            </div>
            <p>Fat</p>
          </div>

        </div>

      </section>

      <!-- MEALS -->
      <section class="meals">

        <div
          class="meal"
          v-for="meal in meals"
          :key="meal.name"
        >

          <div class="meal-header">
            <h3>{{ meal.name }}</h3>

            <button class="plus" @click="addMealItem(meal)">
              +
            </button>
          </div>

          <div v-if="meal.items.length === 0" class="empty" @click="goMealsSelection">
          + Add Meal
          </div>
          <div
            v-for="(item, i) in meal.items"
            :key="i"
            class="food"
          >
            <div class="food-info">
              <strong>{{ item.name }}</strong>
              <small>{{ item.kcal }} Calories</small>
            </div>

            <button class="remove" @click="removeMealItem(meal, i)">
              −
            </button>
          </div>

        </div>

      </section>

      <!-- CTA -->
      <section class="cta">

        <h2>Personalise plan</h2>

        <button>
          Start questionnaire
        </button>

      </section>

    </main>

    <!-- FOOTER (RESTORED) -->
    <nav class="bottom-nav">

      <button class="nav-tab" @click="goWorkout">
        <img :src="workoutImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goHome">
        <img :src="homeImg" class="nav-icon" />
      </button>

      <button class="nav-tab active">
        <img :src="foodImg" class="nav-icon" />
      </button>

      <button class="nav-tab" @click="goProfile">
        <img :src="profileImg" class="nav-icon" />
      </button>

    </nav>

  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const kcal = ref(1200)
const currentDate = ref('Today 24 Mar')

const meals = ref([
  { name: 'Breakfast', items: [] },
  { name: 'Snack', items: [] },
  { name: 'Lunch', items: [{ name: 'Banana', kcal: 122 }] },
  { name: 'Dinner', items: [] }
])

function addMealItem(meal) {
  meal.items.push({ name: 'New Food', kcal: 100 })
}

function removeMealItem(meal, index) {
  meal.items.splice(index, 1)
}

/* NAVIGATION */
function goProfile() {
  router.push('/profile')
}

function goSettings() {
  router.push('/settings')
}

function goHome() {
  router.push('/home')
}

function goWorkout() {
  router.push('/workoutpage')
}

function goMealsSelection() {
  router.push('/mealsselection')
}

function prevDay() {}
function nextDay() {}
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
  overflow-y: auto;
  padding: 0 16px 120px;
}

/* DASHBOARD */
.card {
  background: #2b2b2b;
  border-radius: 28px;
  padding: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
}

/* DATE SWITCH */
.date-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.switch-btn {
  background: #3b3b3b;
  border: none;
  color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 22px;
}

.date-text {
  font-weight: 700;
  font-size: 15px;
}

/* DASHBOARD */
.dashboard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 8px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-inner {
  text-align: center;
}

.circle-number {
  display: block;
  font-size: 26px;
  font-weight: 700;
}

.circle-text {
  font-size: 15px;
  opacity: 0.8;
}

.info {
  flex: 1;
}

.info p {
  margin-bottom: 8px;
  font-size: 14px;
}

.small {
  margin-top: 12px;
  display: flex;
  gap: 14px;
  font-size: 12px;
  opacity: 0.7;
}

/* MACROS */
.macros {
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
}

.macro {
  text-align: center;
}

.macro p {
  margin-top: 8px;
  font-size: 13px;
}

.macro-circle {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 6px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.blue {
  border-color: #4d9fff;
}

.green {
  border-color: #3ddc84;
}

.yellow {
  border-color: #ffd447;
}

/* MEALS */
.meals {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.meal {
  background: #2a2a2a;
  border-radius: 22px;
  padding: 16px;
}

.meal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meal-header h3 {
  font-size: 20px;
  color: #e74c3c;
  font-family: Georgia, serif;
}

.plus {
  background: none;
  border: none;
  color: #ff4b4b;
  font-size: 28px;
  cursor: pointer;
}

/* EMPTY */
.empty {
  margin-top: 12px;
  background: #451717;
  padding: 14px;
  border-radius: 16px;
  text-align: center;
  color: #f1dede;
}

/* FOOD */
.food {
  margin-top: 12px;
  background: #f0b8b8;
  color: black;
  border-radius: 18px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.food-info {
  display: flex;
  flex-direction: column;
}

.food small {
  margin-top: 4px;
  font-size: 12px;
}

.remove {
  background: none;
  border: none;
  color: #c0392b;
  font-size: 28px;
  cursor: pointer;
}

/* CTA */
.cta {
  margin-top: 26px;
  margin-bottom: 20px;
}

.cta h2 {
  color: #e74c3c;
  margin-bottom: 14px;
  font-size: 24px;
  font-family: Georgia, serif;
}

.cta button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 999px;
  background: #d9d9d9;
  color: black;
  font-weight: 700;
  font-size: 16px;
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