import { writable, derived } from 'svelte/store'

type store = {
  isOpenMenu: boolean
  isScanning: boolean
  isDarkMode: boolean
  selectedDeviceId: string | null
  hasMultipleCameras: boolean
  defaultCamera: boolean
}

const obj: store = {
  isOpenMenu: false,
  isScanning: false,
  isDarkMode: false,
  selectedDeviceId: null,
  hasMultipleCameras: false,
  defaultCamera: false
}

export const appstate = writable(obj)

export const isScanningDerived = derived(appstate, ($appstate) => $appstate.isScanning)
export const selectedDeviceIdDerived = derived(appstate, ($appstate) => $appstate.selectedDeviceId)
