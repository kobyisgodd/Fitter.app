<template>
  <div class="page">

    <!-- TOP BAR -->
    <header class="topbar">

      <button class="back" @click="goBack">
        ←
      </button>

      <h1>Add Meal</h1>

      <div></div>
    </header>

    <!-- SEARCH -->
    <div class="search-bar">

      <div class="search-input">
        🔍
        <input
          type="text"
          placeholder="Search Food"
          v-model="search"
        />
      </div>

      <button class="add-btn">+</button>

    </div>

    <!-- CONTENT -->
    <main class="content">

      <!-- FAVORITES -->
      <section class="section" v-if="favorites.length">

        <h2 class="section-title">Favourite</h2>

        <div
          class="food-row"
          v-for="(food, i) in favorites"
          :key="'fav-' + i"
          @click="openFood(food)"
        >

          <div class="left">

            <button
              class="star-btn active"
              @click.stop="removeFromFavorites(food)"
            >
              ★
            </button>

            <div>
              <div class="name">{{ food.name }}</div>
              <div class="cal">{{ food.cals }} cals</div>
            </div>

          </div>

          <div class="arrow">›</div>

        </div>

      </section>

      <!-- ALL -->
      <section class="section">

        <h2 class="section-title">All</h2>

        <div
          class="food-row"
          v-for="(food, i) in filteredFoods"
          :key="'all-' + i"
          @click="openFood(food)"
        >

          <div class="left">

            <button
              class="star-btn"
              :class="{ active: isFavorite(food) }"
              @click.stop="toggleFavorite(food)"
            >
              ★
            </button>

            <div>
              <div class="name">{{ food.name }}</div>
              <div class="cal">{{ food.cals }} cals</div>
            </div>

          </div>

          <div class="arrow">›</div>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/nutrition')
}

/* SEARCH */
const search = ref('')

/* DATA */
const allFoods = ref([
  { name: 'Banana', cals: 122 },
  { name: 'Apple', cals: 95 },
  { name: 'Rice', cals: 200 },
  { name: 'Chicken Breast', cals: 165 },
  { name: 'Eggs', cals: 70 },
  { name: 'Oats', cals: 150 }
])

const favorites = ref([])

/* FILTER */
const filteredFoods = computed(() => {
  return allFoods.value.filter(f =>
    f.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

/* NAVIGATION (NEW - ONLY ADDITION) */
function openFood(food) {
  router.push({
    path: '/nutritionbreakdown',
    query: {
      name: food.name,
      cals: food.cals
    }
  })
}

/* ADD TO FAVORITES (MOVE) */
function toggleFavorite(food) {
  allFoods.value = allFoods.value.filter(f => f.name !== food.name)
  favorites.value.push(food)
}

/* REMOVE FROM FAVORITES (MOVE BACK) */
function removeFromFavorites(food) {
  favorites.value = favorites.value.filter(f => f.name !== food.name)
  allFoods.value.push(food)
}

/* CHECK IF IN FAVORITES */
function isFavorite(food) {
  return favorites.value.some(f => f.name === food.name)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

/* TOP */
.topbar {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.topbar h1 {
  color: #aaa;
  font-size: 20px;
}

.back {
  background: none;
  border: none;
  color: #aaa;
  font-size: 26px;
}

/* SEARCH */
.search-bar {
  display: flex;
  gap: 10px;
  padding: 0 16px 16px;
}

.search-input {
  flex: 1;
  background: #2a2a2a;
  border-radius: 999px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.search-input input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
}

/* CONTENT */
.content {
  padding: 10px 16px 120px;
}

/* SECTION */
.section-title {
  color: #e74c3c;
  font-family: Georgia;
  margin-bottom: 10px;
}

/* ROW */
.food-row {
  background: #2a2a2a;
  padding: 14px;
  border-radius: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

/* LEFT */
.left {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* STAR */
.star-btn {
  border: none;
  background: none;
  color: #666;
  font-size: 20px;
}

.star-btn.active {
  color: gold;
}

/* TEXT */
.name {
  font-weight: 600;
}

.cal {
  font-size: 12px;
  color: #aaa;
}

/* ARROW */
.arrow {
  color: #aaa;
  font-size: 20px;
}
</style>