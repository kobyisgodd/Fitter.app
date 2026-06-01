<template>
  <div class="page">

    <div class="card">
      <h1 class="title">🥚 Easter Egg Unlocked</h1>

      <p class="text">
       koby je uplny neger a nikdy nebude mat jednotku z matiky, protoze je to kurevsky smrad <br>
       tiez ma male nohy preto nikdy toto nenajde :D
      </p>

      <button class="btn" @click="goHome">
        Go Back
      </button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/home')
}
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(circle at top, #2a2a2a, #0f0f0f);
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

.card {
  text-align: center;
  padding: 30px 24px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(231, 76, 60, 0.4);
  backdrop-filter: blur(10px);

  max-width: 320px;
}

.title {
  font-size: 20px;
  color: #e74c3c;
  margin-bottom: 14px;
}

.text {
  font-size: 14px;
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 16px;
}

.hint {
  font-style: italic;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 20px;
}

.btn {
  background: linear-gradient(135deg, #8b0000, #c0392b);
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  opacity: 0.9;
}
</style>