/**
 * Unmount the global loading element from the DOM.
 */

function unmountGlobalLoading() {
  const loadingElement = document.querySelector('#__app-loading__');

  if (loadingElement) {
    loadingElement.classList.add('hidden');

    const injectLoadingElements = document.querySelectorAll(
      '[data-app-loading^="inject"]',
    );

    loadingElement.addEventListener(
      'transitionend',
      () => {
        loadingElement.remove();
        for (const element of injectLoadingElements) {
          element.remove();
        }
      },
      {
        once: true,
      },
    );
  }
}

export { unmountGlobalLoading };
