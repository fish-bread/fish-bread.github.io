<template>
  <div ref="container" class="particle-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 新增配置常量（放在顶部）
const MAX_PARTICLES = 1500 // 🧪可修改参数：粒子最大存在量
const container = ref(null)
const canvas = ref(null)
const ctx = ref(null)
// 修改点1：仅降低帧率（原60 → 现30）
const fps = ref(60) // 🚀可修改帧率（建议30-60）
const msPerFrame = ref(1000 / fps.value)
const timePrevious = ref(0)
const particles = ref([])
const hue = ref(0)

const pointer = ref({
  x: 0,
  y: 0,
  mx: 0,
  my: 0
})

class PointerParticle {
  constructor(spread, speed, context) {
    this.ctx = context.ctx
    this.x = context.pointer.x
    this.y = context.pointer.y
    // 🎨可修改参数：鼠标移动对粒子的影响系数（当前0.1）
    this.mx = context.pointer.mx * 0.1
    this.my = context.pointer.my * 0.1
    // 🌟可修改参数：粒子初始大小范围（当前1-2）
    this.size = Math.random() + 1
    // ⏳可修改参数：粒子消失速度（当前0.01/帧）
    this.decay = 0.01
    // 🚀可修改参数：粒子基础速度系数（当前0.08）
    this.speed = speed * 0.08
    this.spread = spread * this.speed
    // 🌪️可修改参数：粒子扩散随机范围系数（当前0.5）
    this.spreadX = (Math.random() - 0.5) * this.spread - this.mx
    this.spreadY = (Math.random() - 0.5) * this.spread - this.my
    // 🌈可修改参数：粒子颜色（HSL格式）
    this.color = `hsl(${context.hue}deg 90% 60%)`
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.fill()
  }

  collapse() {
    this.size -= this.decay
  }

  trail() {
    this.x += this.spreadX * this.size
    this.y += this.spreadY * this.size
  }

  update() {
    this.draw()
    this.trail()
    this.collapse()
  }
}

const setCanvasDimensions = () => {
  if (!container.value || !canvas.value) return
  canvas.value.width = container.value.clientWidth
  canvas.value.height = container.value.clientHeight
}

const setPointerValues = (event) => {
  if (!container.value) return; // 添加空检查
  const rect = container.value.getBoundingClientRect()
  pointer.value.x = event.clientX - rect.left
  pointer.value.y = event.clientY - rect.top
  pointer.value.mx = event.movementX
  pointer.value.my = event.movementY
}

const getPointerVelocity = (event) => {
  const a = event.movementX
  const b = event.movementY
  return Math.floor(Math.sqrt(a * a + b * b))
}
//兴建粒子
const createParticles = (event, { count, speed, spread }) => {
  // 新增粒子数量限制检查
  if (particles.value.length >= MAX_PARTICLES) {
    // 方案1：直接拒绝新增（严格限制）
    // return; 

    // 方案2：清理最早20%的粒子（推荐）
    particles.value.splice(0, Math.floor(MAX_PARTICLES * 0.2))
  }

  setPointerValues(event)
  for (let i = 0; i < count; i++) {
    particles.value.push(
        new PointerParticle(spread, speed, {
          ctx: ctx.value,
          pointer: pointer.value,
          hue: hue.value
        })
    )
  }
}
const handleParticles = () => {
  for (let i = 0; i < particles.value.length; i++) {
    particles.value[i].update()
    // 💨可修改参数：粒子消失阈值（当前0.1）
    if (particles.value[i].size <= 0.1) {
      particles.value.splice(i, 1)
      i--
    }
  }
}

const animateParticles = () => {
  requestAnimationFrame(animateParticles)
  const timeNow = performance.now()
  const timePassed = timeNow - timePrevious.value

  if (timePassed < msPerFrame.value) return

  const excessTime = timePassed % msPerFrame.value
  timePrevious.value = timeNow - excessTime

  if (!canvas.value || !ctx.value) return

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  // 🌈可修改参数：色相变化速度（当前每帧+3）
  hue.value = hue.value > 360 ? 0 : (hue.value += 3)
  handleParticles()
}

const setupEvents = () => {
  if (!container.value) return

  document.addEventListener('click', (event) => {
    // 🎇可修改参数：点击产生的粒子数量/速度/扩散范围
    createParticles(event, {
      count: 100,    // ✨粒子数量
      speed: Math.random() + 1,  // 💫速度基数
      spread: Math.random() + 50 // 🌐扩散范围
    })
  })

  document.addEventListener('pointermove', (event) => {
    // 🖱️可修改参数：移动产生的粒子数量/速度
    createParticles(event, {
      count: 20,     // ✨跟随粒子数量
      speed: getPointerVelocity(event), // 🏎️基于鼠标速度
      spread: 1      // 🔮扩散范围
    })
  })
}

onMounted(() => {
  if (!canvas.value) return

  ctx.value = canvas.value.getContext('2d')
  setCanvasDimensions()
  setupEvents()
  timePrevious.value = performance.now()
  animateParticles()

  window.addEventListener('resize', setCanvasDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', setCanvasDimensions)
  document.removeEventListener('click', createParticles)
  document.removeEventListener('pointermove', createParticles)
})
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 9999;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>