import { writable, derived } from 'svelte/store'

type store = {
  isOpenMenu: boolean
  isScanning: boolean
  isDarkMode: boolean
  waitForCameraPermission: boolean
  cameraPermission: PermissionState
  selectedDeviceId: string | null
  cameras: MediaDeviceInfo[]
  defaultCamera: boolean
}

const obj: store = {
  isOpenMenu: false,
  isScanning: false,
  isDarkMode: false,
  waitForCameraPermission: true,
  cameraPermission: 'prompt',
  selectedDeviceId: null,
  cameras: [],
  defaultCamera: false
}

export const appstate = writable(obj)
export const isScanningDerived = derived(appstate, ($appstate) => $appstate.isScanning)
export const selectedDeviceIdDerived = derived(appstate, ($appstate) => $appstate.selectedDeviceId)
