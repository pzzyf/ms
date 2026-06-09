import type NProgress from "nprogress";
import "nprogress/nprogress.css";


let nProgressInstance: null | typeof NProgress = null;

async function loadNprogress() {

  if (nProgressInstance) {
    return nProgressInstance;
  }

  nProgressInstance = await import("nprogress");

  nProgressInstance.configure({
    showSpinner: true,
    speed: 300,
  });

  return nProgressInstance;
}


async function startProgress() {
  const nprogress = await loadNprogress();
  nprogress?.start();
}

async function stopProgress() {
  const nprogress = await loadNprogress();
  nprogress?.done();
}

export { startProgress, stopProgress };
