<template>
  <div class="page">

    <!-- TOPBAR -->
    <header class="topbar">

      <button class="back-btn" @click="goBack">
        ←
      </button>

      <h1>Food Item</h1>

      <div class="empty"></div>

    </header>

    <!-- CONTENT -->
    <main class="content">

      <!-- FOOD HEADER -->
      <section class="food-header">

        <div>
          <h2 class="food-name">Banana</h2>

          <p class="food-sub">
            122 calories per base serving
          </p>
        </div>

        <div class="food-actions">

          <button class="log-btn" @click="logFood">
            + Log
          </button>

        </div>

      </section>

      <!-- SERVING UNIT -->
      <section class="section">

        <h3 class="section-title">Serving Unit</h3>

        <div class="chips">

          <button
            v-for="unit in units"
            :key="unit.type"
            class="chip"
            :class="{ active: selectedUnit.type === unit.type }"
            @click="selectUnit(unit)"
          >
            {{ unit.label }}
          </button>

        </div>

      </section>

      <!-- SERVING SIZE -->
      <section class="section">

        <div class="size-row">

          <h3 class="section-title">Serving Size</h3>

          <input
            type="number"
            step="0.1"
            v-model="servingSize"
            class="size-input"
          />

        </div>

      </section>

      <!-- MAIN MACROS -->
      <section class="section">

        <h3 class="section-title">Main Macros</h3>

        <div class="macro-layout">

          <div class="calorie-card">
            <div class="calories">{{ calories }}</div>
            <div class="calories-label">Calories</div>
          </div>

          <div class="macro-card">
            <div class="macro-row">
              <span>Protein</span>
              <strong>{{ protein }}g</strong>
            </div>

            <div class="macro-row">
              <span>Carbs</span>
              <strong>{{ carbs }}g</strong>
            </div>

            <div class="macro-row">
              <span>Fat</span>
              <strong>{{ fat }}g</strong>
            </div>
          </div>

        </div>

      </section>

      <!-- OTHER MACROS (RESTORED) -->
      <section class="section">

        <h3 class="section-title">Other Macros</h3>

        <div class="placeholder-card">

          <div class="placeholder-row">
            Fiber <strong>3.1g</strong>
          </div>

          <div class="placeholder-row">
            Sugar <strong>15g</strong>
          </div>

          <div class="placeholder-row">
            Sodium <strong>1mg</strong>
          </div>

        </div>

      </section>

      <!-- MICRONUTRIENTS (RESTORED) -->
      <section class="section">

        <h3 class="section-title">Micronutrients</h3>

        <div class="micro-card">

          <div class="micro-item">Vitamin B1 (thiamine)</div>
          <div class="micro-item">Vitamin B2 (riboflavin)</div>
          <div class="micro-item">Vitamin B3 (niacin)</div>
          <div class="micro-item">Vitamin B6</div>
          <div class="micro-item">Vitamin C</div>
          <div class="micro-item">Potassium</div>
          <div class="micro-item">Magnesium</div>

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
  router.push('/mealsselection')
}

/* UNITS */
const units = [
  { type: 'piece', label: 'piece' },
  { type: 'g', label: 'g' },
  { type: 'ml', label: 'ml' }
]

const selectedUnit = ref(units[0])
const servingSize = ref(1)

/* BASE VALUES */
const baseCalories = 122
const baseProtein = 0.93
const baseCarbs = 28.61
const baseFat = 0.35

/* UNIT LOGIC */
const unitMultiplier = computed(() => {
  if (selectedUnit.value.type === 'piece') return 1
  if (selectedUnit.value.type === 'g') return 0.8
  if (selectedUnit.value.type === 'ml') return 0.8
  return 1
})

const totalMultiplier = computed(() => {
  return servingSize.value * unitMultiplier.value
})

/* MACROS */
const calories = computed(() =>
  Math.round(baseCalories * totalMultiplier.value)
)

const protein = computed(() =>
  (baseProtein * totalMultiplier.value).toFixed(2)
)

const carbs = computed(() =>
  (baseCarbs * totalMultiplier.value).toFixed(2)
)

const fat = computed(() =>
  (baseFat * totalMultiplier.value).toFixed(2)
)

/* UNIT SELECT */
function selectUnit(unit) {
  selectedUnit.value = unit
}

/* LOG BUTTON */
function logFood() {
  const payload = {
    food: 'Banana',
    unit: selectedUnit.value.type,
    size: servingSize.value,
    calories: calories.value
  }

  console.log('LOG:', payload)

  router.push('/nutrition')
}
</script>

<style scoped>
/* SAME STYLE (UNCHANGED) — only kept minimal safe structure */

.page {
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: space-between;
  padding: 18px 16px;
}

.topbar h1 {
  color: #9f9f9f;
  font-size: 20px;
}

.back-btn {
  background: none;
  border: none;
  color: #9f9f9f;
  font-size: 28px;
  cursor: pointer;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 120px;
}

.food-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
}

.food-name {
  font-size: 32px;
  font-weight: 700;
}

.food-sub {
  color: #999;
  font-size: 14px;
}

.log-btn {
  background: #a72828;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 700;
}

.section {
  margin-bottom: 28px;
}

.section-title {
  color: #e74c3c;
  font-family: Georgia;
  font-size: 22px;
  margin-bottom: 14px;
}

.chips {
  display: flex;
  gap: 10px;
}

.chip {
  background: #d8d8d8;
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
}

.chip.active {
  background: #efb8c8;
}

.size-input {
  width: 100px;
  background: #d8d8d8;
  border: none;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
  font-weight: 700;
}

.macro-layout {
  display: flex;
  gap: 14px;
}

.calorie-card,
.macro-card,
.placeholder-card,
.micro-card {
  background: #d8d8d8;
  color: #111;
  border-radius: 22px;
}

.calorie-card {
  width: 130px;
  padding: 20px;
  text-align: center;
}

.calories {
  font-size: 34px;
  font-weight: 800;
}

.macro-card {
  flex: 1;
  padding: 18px;
}

.macro-row,
.placeholder-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.micro-card {
  padding: 20px;
}

.micro-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.placeholder-card {
  background: #d8d8d8;
  color: #111;
  border-radius: 22px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* FIX: makes text more readable */
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
}

.placeholder-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 12px;
  border-radius: 14px;

  background: rgba(0, 0, 0, 0.04); /* subtle row separation */
}

.placeholder-row span {
  font-size: 14px;
  font-weight: 600;
  color: #222; /* stronger readability */
}

.placeholder-row strong {
  font-size: 14px;
  font-weight: 800;
  color: #000; /* makes values clearly visible */
}
</style>