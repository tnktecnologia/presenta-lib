const autoplay = function (rootElement, router, config) {
  let timer = null
  const loop = !config.noloop
  const defdelay = config.delay || 2000
  let lastdelay = 0

  const runTime = (delay) => {
    lastdelay = delay
    clearTimeout(timer)
    timer = setTimeout(() => {
      router.next()
    }, delay)
  }

  runTime(defdelay)

  router.on('end', evt => {
    if (loop) {
      router.goto(0)
      router.notify('nextIndex')
    }
  })

  router.on('indexChanged', evt => {
    const cScene = router.projectConfig.scenes[evt.currentIndex]
    const delay = cScene.duration || defdelay
    runTime(delay)
  })

  this.pause = () => {
    clearTimeout(timer)
  }
  this.resume = () => {
    runTime(lastdelay)
  }
}

export { autoplay }