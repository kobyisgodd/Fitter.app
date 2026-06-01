<template>
  <div class="app-shell">

    <!-- HEADER -->
    <div class="header">
      <div class="header-left">
        <img
          :src="assets.pfp"
          alt="Profile"
          class="avatar"
          @click="goProfile"
        />

        <div class="streak-badge">
          <span class="streak-number">75</span>
          <img :src="assets.flame" alt="streak" class="flame-icon" />
        </div>
      </div>

      <button class="settings-btn" @click="goSettings">
        <img :src="assets.settings" alt="Settings" class="settings-icon" />
      </button>
    </div>

    <!-- CONTENT (UNCHANGED) -->
    <div class="content">

      <!-- Greeting -->
      <div class="greeting">
        <p class="greeting-name">Hello {{ userName }}!</p>
        <p class="greeting-sub">Ready for your next workout?</p>
      </div>

      <!-- Week calendar -->
      <div class="calendar-section">
        <p class="calendar-date" @click="goStreak" >{{ formattedDate }}</p>
        <div class="calendar-row">
          <button class="nav-arrow" @click="prevWeek">&#8249;</button>

          <div class="days-strip" @click="goStreak">
            <div
              v-for="day in weekDays"
              :key="day.date"
              class="day-cell"
              :class="{
                'day-active': day.isToday,
                'day-completed': day.status === 'done',
                'day-missed': day.status === 'missed',
              }"
              @click="selectDay(day)"
            >
              <span class="day-label">{{ day.dayName }}</span>
              <span class="day-number">{{ day.dayNum }}</span>

              <span class="day-icon"></span>
            </div>
          </div>

          <button class="nav-arrow" @click="nextWeek">&#8250;</button>
        </div>
      </div>

      <!-- Weekly stats -->
      <div class="section-title">Statistics for the week</div>
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in weekStats" :key="stat.label">
          <span class="stat-label">{{ stat.label }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>

      <!-- Muscles -->
      <div class="section-title">Targeted muscle groups</div>
      <div class="muscles-grid">
        <div class="muscle-card" v-for="muscle in muscleGroups" :key="muscle.name" @click = "handleMuscleClick(muscle.name)">
          <span class="muscle-label">{{ muscle.name }}</span>
          <span class="muscle-sets">{{ muscle.sets }} sets</span>
        </div>
      </div>

    </div>

    <!-- BOTTOM NAV (NOW FULLY FUNCTIONAL) -->
    <nav class="bottom-nav">
      <button
        v-for="tab in navTabs"
        :key="tab.name"
        class="nav-tab"
        :class="{ 'nav-tab-active': activeTab === tab.name }"
        @click="handleTabClick(tab.name)"
      >
        <img :src="tab.icon" :alt="tab.name" class="nav-icon" />
      </button>
    </nav>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// assets
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

// state
const userName = ref('Levi')
const activeTab = ref('home')

// NAV BAR
const navTabs = [
  { name: 'workout', icon: workoutImg },
  { name: 'home', icon: homeImg },
  { name: 'nutrition', icon: foodImg },
  { name: 'profile', icon: profileImg },
]

// FIXED NAVIGATION (ALL PAGES)
function handleTabClick(tab) {
  activeTab.value = tab

  if (tab === 'home') router.push('/home')
  if (tab === 'workout') router.push('/workoutpage')
  if (tab === 'nutrition') router.push('/nutrition')
  if (tab === 'profile') router.push('/profile')
}

// HEADER ACTIONS
function goProfile() {
  router.push('/profile')
}

function goSettings() {
  router.push('/settings')
}

function goStreak() {
  router.push('/streak')
}

function handleMuscleClick(name) {
  if (name === 'Legs') {
    router.push('/eastereggs')
  }
}

// calendar (unchanged)
const today = new Date()
today.setHours(0, 0, 0, 0)
const weekOffset = ref(0)

const formattedDate = computed(() => {
  const d = new Date(today)
  d.setDate(d.getDate() + weekOffset.value * 7)

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  })
})

const weekDays = computed(() => {
  const base = new Date(today)
  base.setDate(base.getDate() + weekOffset.value * 7)

  const mon = new Date(base)
  mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7))

  const dayNames = ['MON','TUE','WED','THU','FRI','SAT','SUN']
  const statuses = ['done','missed','done',null,null,null,null]

  return dayNames.map((name, i) => {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)

    return {
      dayName: name,
      dayNum: d.getDate(),
      date: d.toDateString(),
      isToday: d.toDateString() === today.toDateString(),
      status: statuses[i],  
    }
  })
})

function prevWeek(){ weekOffset.value-- }
function nextWeek(){ weekOffset.value++ }
function selectDay(day){ console.log(day) }

// stats (unchanged)
const weekStats = ref([
  { label: 'Duration', value: '275 min' },
  { label: 'Workouts', value: '8' },
  { label: 'Sets', value: '235' },
  { label: 'Lifted', value: '35 kg' },
  { label: 'Burn', value: '9999 kcal' },
  { label: 'Streak', value: '3' },
])

const muscleGroups = ref([
  { name: 'Legs', sets: 3 },
  { name: 'Shoulders', sets: 5 },
  { name: 'Arms', sets: 19 },
  { name: 'Back', sets: 17 },
  { name: 'Chest', sets: 12 },
  { name: 'Core', sets: 0 },
])
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.app-shell {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  background: #1a1a1a;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 8px;
  flex-shrink: 0;
}
.header-left { display: flex; align-items: center; gap: 10px; }
.avatar {
  width: 42px; height: 42px;
  border-radius: 50%; object-fit: cover;
  border: 2px solid #c0392b;
}
.streak-badge { display: flex; align-items: center; gap: 4px; }
.streak-number { font-size: 22px; font-weight: 700; color: #fff; }
.flame-icon { width: 20px; height: 20px; object-fit: contain; }
.settings-btn { background: none; border: none; cursor: pointer; padding: 4px; }
.settings-icon { width: 24px; height: 24px; object-fit: contain; filter: invert(1) brightness(0.7); }

/* Content */
.content {
  flex: 1; overflow: hidden;
  padding: 0 16px 16px;
  scrollbar-width: none;
}
.content::-webkit-scrollbar { display: none; }

/* Greeting */
.greeting { padding: 12px 4px 20px; }
.greeting-name { font-size: 20px; font-weight: 700; color: #e74c3c; line-height: 1.3; }
.greeting-sub   { font-size: 15px; color: #e74c3c; opacity: 0.85; margin-top: 2px; }

/* Calendar */
.calendar-section {
  background: linear-gradient(135deg, #8b0000 0%, #c0392b 60%, #e74c3c 100%);
  border-radius: 18px;
  padding: 14px 10px 16px;
  margin-bottom: 24px;
}
.calendar-date {
  text-align: center; font-size: 13px;
  color: rgba(255,255,255,0.85); margin-bottom: 12px; font-weight: 500;
}
.calendar-row { display: flex; align-items: center; gap: 4px; }
.nav-arrow {
  background: none; border: none;
  color: rgba(255,255,255,0.7); font-size: 26px;
  cursor: pointer; padding: 0 2px; line-height: 1; flex-shrink: 0;
}
.nav-arrow:hover { color: #fff; }
.days-strip {
  display: flex; flex: 1; gap: 4px; justify-content: space-between;
}
.day-cell {
  display: flex; flex-direction: column; align-items: center;
  gap: 2px; flex: 1; padding: 8px 2px 6px;
  border-radius: 12px; cursor: pointer; transition: background 0.15s; min-width: 0;
}
.day-label  { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.75); letter-spacing: 0.3px; }
.day-number { font-size: 14px; font-weight: 700; color: #fff; }
.day-icon   { height: 16px; display: flex; align-items: center; justify-content: center; }
.day-status-icon { width: 14px; height: 14px; object-fit: contain; }
.miss-x { font-size: 13px; color: #ff6b6b; font-weight: 700; }
.day-active {
  background: rgba(255,255,255,0.18);
  outline: 2px solid rgba(255,255,255,0.5);
}

/* Section title */
.section-title {
  font-size: 14px; font-weight: 700; color: #e74c3c; margin-bottom: 12px;
}

/* Stats */
.stats-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 10px; margin-bottom: 24px;
}
.stat-card {
  background: #2a2a2a; border-radius: 12px;
  padding: 12px 10px; display: flex; flex-direction: column; gap: 4px;
}
.stat-label { font-size: 10px; color: #888; font-weight: 500; }
.stat-value { font-size: 15px; font-weight: 700; color: #fff; }

/* Muscles */
.muscles-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 10px; margin-bottom: 16px;
}
.muscle-card {
  background: #2a2a2a; border-radius: 12px;
  padding: 12px 14px; display: flex; flex-direction: column; gap: 2px;
}
.muscle-label { font-size: 10px; color: #888; font-weight: 500; }
.muscle-sets  { font-size: 15px; font-weight: 700; color: #fff; }

/* Bottom nav */
.bottom-nav {
  display: flex; justify-content: space-around; align-items: center;
  padding: 10px 0 20px;
  background: linear-gradient(180deg, #1a1a1a 0%, #e74c3c 100%);
  flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,0.07);
}
.nav-tab {
  background: none; border: none; cursor: pointer;
  padding: 8px 16px; border-radius: 10px; transition: background 0.15s;
}
.nav-tab:hover { background: rgba(255,255,255,0.08); }
.nav-icon { width: 26px; height: 26px; object-fit: contain; filter: invert(1) brightness(0.6); }
.nav-tab-active .nav-icon {
  filter: invert(30%) sepia(90%) saturate(500%) hue-rotate(330deg) brightness(1.2);
}
</style>
