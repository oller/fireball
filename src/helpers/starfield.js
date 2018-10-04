class Starfield {
  constructor(config) {
    this.canvas =
      typeof config.canvas === 'string'
        ? document.querySelector(config.canvas)
        : config.canvas

    this.ctx = this.canvas.getContext('2d')
    this.style = getComputedStyle(this.canvas)

    // Import options or fallback to default
    this.maxRadius = config.maxRadius || 40
    const minInterval = config.minInterval || 1 // Seconds
    const maxInterval = config.maxInterval || 10 // Seconds
    this.shootingStarInterval =
      (Math.floor(Math.random() * maxInterval) + minInterval) * 1000
    this.lastShootingStar = this.shootingStarInterval
      ? performance.now()
      : undefined

    // Set dimensions and watch for resize events to update canvas dimensions
    this.onResize()
    window.addEventListener('resize', this.onResize.bind(this))
  }

  star() {
    return {
      x: Math.round(Math.random() * this.canvas.width),
      y: Math.round(Math.random() * this.canvas.height),
      r: Math.random() * this.maxRadius,
      l: 1, // Random alpha between 90 and 100%
      // l: (Math.random() / 10) * 9, // Random alpha between 90 and 100%
      dl: Math.round(Math.random()) === 1 ? 0.01 : -0.01
    }
  }

  onResize() {
    this.canvas.width = this.style.width.replace('px', '')
    this.canvas.height = this.style.height.replace('px', '')
  }

  draw(star) {
    // console.log('star', star);
    this.ctx.beginPath()
    this.ctx.fillStyle = `rgba(255,255,255,${star.l})`
    this.ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false)
    // Glow
    this.ctx.shadowBlur = 5
    this.ctx.shadowColor = 'blue'
    this.ctx.shadowOffsetX = 0
    this.ctx.shadowOffsetY = 0
    this.ctx.fill()
  }

  start() {
    const tick = timeStamp => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      if (this.shootingStar) {
        const star = this.shootingStar

        this.draw(star)

        // Animate shooting star with changes to coords, alpha and radius
        star.y += 8
        star.x += 20
        star.l += star.dl
        star.r -= 0.1

        if (star.r <= 0) this.shootingStar = undefined
      } else if (this.shootingStarInterval) {
        if (timeStamp - this.lastShootingStar >= this.shootingStarInterval) {
          this.shootingStar = this.star()
          this.lastShootingStar = timeStamp
          // this.shootingStar.r = 3;
        }
      }

      this.frameId = window.requestAnimationFrame(tick)
    }

    this.frameId = window.requestAnimationFrame(tick)
  }
}

export default Starfield
