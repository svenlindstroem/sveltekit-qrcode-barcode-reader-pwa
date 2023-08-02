import { writable, derived } from 'svelte/store'

const obj = {
  isOpenMenu: false,
  isScanning: false,
  isDarkMode: false,
  hasMultipleCameras: false,
  defaultCamera: false
}

export const appstate = writable(obj)

export const isScanningDerived = derived(appstate, ($appstate) => $appstate.isScanning)
