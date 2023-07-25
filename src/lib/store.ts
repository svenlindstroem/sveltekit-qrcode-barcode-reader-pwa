import { writable } from 'svelte/store'

const obj = {
  isOpenMenu: false,
  isScanning: false,
  isDarkMode: false
}

export const appstate = writable(obj)
