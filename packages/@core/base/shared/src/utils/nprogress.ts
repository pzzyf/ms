import type NProgress from 'nprogress'

const nProgressState: { instance: null | typeof NProgress } = {
  instance: null,
}

async function loadNprogress() {
  if (nProgressState.instance) {
    return nProgressState.instance
  }

  nProgressState.instance = await import('nprogress')

  nProgressState.instance.configure({
    showSpinner: true,
    speed: 300,
  })

  return nProgressState.instance
}

async function startProgress() {
  const nprogress = await loadNprogress()
  nprogress?.start()
}

async function stopProgress() {
  const nprogress = await loadNprogress()
  nprogress?.done()
}

export { startProgress, stopProgress }
