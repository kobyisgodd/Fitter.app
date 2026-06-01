import { createRouter, createWebHistory } from 'vue-router'

// Simple inline Home component
const Home = {
  template: `<div style="padding:24px; text-align:center"><h2>Welcome</h2><p>This is the home page.</p></div>`
}

// Lazy-load the Register and Intro pages
const Register = () => import('../views/RegisterView.vue')
const Intropage = () => import('../views/Intropage.vue')
const Signin = () => import('../views/SignInPage.vue')
const Workoutpage = () => import('../views/WorkoutPage.vue')
const StartWorkout = () => import('../views/StartWorkoutView.vue')
const Homepage = () => import('../views/Homepage.vue')
const NutritionView = () => import('../views/NutritionView.vue')
const ProfilePage = () => import('../views/ProfilePage.vue')
const SettingsPage = () => import('../views/SettingsPage.vue')
const MealsSelection = () => import('../views/MealsSelection.vue')
const StreakPage = () => import('../views/StreakPage.vue')
const NutritionBreakdown = () => import('../views/NutritionBreakdown.vue')
const EasterEgg = () => import('../views/EasterEgg.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/intropage', name: 'Intropage', component: Intropage },
  { path: '/signin', name: 'Signin', component: Signin },
  { path: '/workoutpage', name: 'Workoutpage', component: Workoutpage },
  { path: '/startworkout', name: 'StartWorkout', component: StartWorkout },
  { path: '/home', name: 'Homepage', component: Homepage },
  { path: '/nutrition', name: 'NutritionPage', component: NutritionView },
  { path: '/profile', name: 'Profile', component: ProfilePage},
  { path: '/settings', name: 'Settings', component: SettingsPage},
  { path: '/mealsselection', name: 'MealsSelection', component: MealsSelection },
  { path: '/streak', name: 'Streak', component: StreakPage },
  { path: '/nutritionbreakdown', name: 'NutritionBreakdown', component: NutritionBreakdown },
  { path: '/eastereggs', name: 'EasterEgg', component: EasterEgg }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
