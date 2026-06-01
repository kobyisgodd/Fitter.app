<template>
  <div class="page">

    <!-- TOP BAR -->
    <header class="topbar">

      <button class="back" @click="goBack">
        ←
      </button>

      <h1>{{ workoutName || 'Workout' }}</h1>

      <div class="spacer"></div>

    </header>

    <!-- SUB HEADER -->
    <div class="subheader">

      <input
        class="routine-name"
        v-model="workoutName"
        placeholder="Workout name..."
      />

      <div class="timer">
        {{ timerDisplay }}
      </div>

    </div>

    <!-- CONTENT -->
    <main class="content">

      <!-- EMPTY STATE -->
      <div v-if="exercises.length === 0" class="empty">
        <h2>No exercises yet</h2>
        <p>Start building your workout below</p>
      </div>

      <!-- EXERCISES -->
      <div
        v-for="(ex, i) in exercises"
        :key="i"
        class="exercise-card"
      >

        <!-- HEADER -->
        <div class="exercise-header">

          <input
            class="exercise-title"
            v-model="ex.name"
          />

          <button
            class="delete-exercise"
            @click="deleteExercise(i)"
          >
            🗑
          </button>

        </div>

        <!-- TABLE HEADER -->
        <div class="grid header">
          <div>SET</div>
          <div>PREV</div>
          <div>KG</div>
          <div>REPS</div>
          <div></div>
        </div>

        <!-- SET ROWS -->
        <div
          v-for="(set, s) in ex.sets"
          :key="s"
          class="grid row"
        >

          <div class="set-num">{{ s + 1 }}</div>

          <div class="locked">{{ set.prev }}</div>

          <input class="cell" type="number" v-model="set.kg" />
          <input class="cell" type="number" v-model="set.reps" />

          <div class="actions">

            <button
              class="check"
              :class="{ done: set.done }"
              @click="set.done = !set.done"
            >
              ✓
            </button>

            <button
              class="delete"
              @click="deleteSet(i, s)"
            >
              🗑
            </button>

          </div>

        </div>

        <button class="add-set" @click="addSet(i)">
          + Add set
        </button>

      </div>

      <!-- ADD EXERCISE -->
      <button class="add-exercise" @click="addExercise">
        + Add exercise
      </button>

      <!-- FINISH WORKOUT -->
      <button class="finish-workout" @click="finishWorkout">
        Finish workout
      </button>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}

/* WORKOUT DATA */
const workoutName = ref('')
const exercises = ref([])

/* =========================
   ⏱ TIMER LOGIC (NEW)
========================= */

const startTime = ref(null)
const elapsed = ref(0)
let interval = null

function startTimer() {
  startTime.value = Date.now()

  interval = setInterval(() => {
    elapsed.value = Date.now() - startTime.value
  }, 1000)
}

const timerDisplay = computed(() => {
  const totalSeconds = Math.floor(elapsed.value / 1000)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

/* =========================
   EXERCISE FUNCTIONS
========================= */

function addExercise() {
  exercises.value.push({
    name: 'New Exercise',
    sets: [{ prev: '-', kg: 0, reps: 0, done: false }]
  })
}

function addSet(i) {
  exercises.value[i].sets.push({
    prev: '-',
    kg: 0,
    reps: 0,
    done: false
  })
}

function deleteSet(ex, s) {
  exercises.value[ex].sets.splice(s, 1)
}

function deleteExercise(i) {
  exercises.value.splice(i, 1)
}

function finishWorkout() {
  console.log('Workout finished')
  router.push('/home')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

/* TOP BAR */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #141414;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.back {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 26px;
  cursor: pointer;
}

.topbar h1 {
  font-size: 18px;
  color: #e74c3c;
}

.spacer {
  width: 30px;
}

/* SUBHEADER */
.subheader {
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  color: #e74c3c;
}

.routine-name {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  outline: none;
}

.timer {
  font-weight: bold;
  color: #aaa;
}

/* CONTENT */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 120px;
}

/* EMPTY */
.empty {
  text-align: center;
  margin-top: 60px;
  color: #777;
}

/* CARD */
.exercise-card {
  background: #222;
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 14px;
}

/* HEADER */
.exercise-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.exercise-title {
  flex: 1;
  background: #333;
  border: none;
  padding: 8px 12px;
  border-radius: 999px;
  color: white;
  outline: none;
}

.delete-exercise {
  margin-left: 8px;
  background: transparent;
  border: none;
  color: #e74c3c;
  font-size: 18px;
  cursor: pointer;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: 40px 1fr 60px 60px 60px;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}

.header {
  color: #888;
  font-weight: bold;
  margin-bottom: 6px;
}

/* ROW */
.row {
  margin-bottom: 6px;
}

.set-num {
  text-align: center;
  color: #aaa;
}

.locked {
  background: #333;
  text-align: center;
  padding: 6px;
  border-radius: 6px;
  color: #ccc;
}

.cell {
  width: 100%;
  text-align: center;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #2c2c2c;
  color: white;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.check {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
}

.check.done {
  background: #27ae60;
}

.delete {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: #333;
  color: #e74c3c;
  cursor: pointer;
}

/* BUTTONS */
.add-set,
.add-exercise {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #8b0000, #c0392b);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

/* FINISH BUTTON */
.finish-workout {
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  border-radius: 999px;
  border: none;

  background: linear-gradient(135deg, #1f8f4a, #2ecc71);
  color: white;

  font-weight: bold;
  cursor: pointer;
}
</style>