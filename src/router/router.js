import { createRouter, createWebHistory } from 'vue-router'

// Simple inline Home component
const Home = {
  template: `<div style="padding:24px; text-align:center"><h2>Welcome</h2><p>This is the home page.</p></div>`
}

// Lazy-load the Register and Intro pages
const Register = () => import('../views/RegisterView.vue')
const Intropage = () => import('../views/Intropage.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/intropage', name: 'Intropage', component: Intropage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
