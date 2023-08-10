/**
 * Find out if permission to use the camera has been granted
 * navigator.permission.query() is not standarized between browsers
 * we will need instead to start a media stream and listen to errors
 * and then stop all created tracks to turn cameras off again
 */
import { appstate } from '$lib/store'
import { error } from '@sveltejs/kit'
import { get } from 'svelte/store'

export async function checkPermissions() {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true })

    // firefox will get labels on devices only during active stream
    const devices = await navigator.mediaDevices.enumerateDevices()
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    stream.getTracks().forEach((track) => {
      //console.log(track.getCapabilities())
      track.stop()
    })

    appstate.set({
      ...get(appstate),
      cameraPermission: 'granted',
      waitForCameraPermission: false,
      cameras: cameras
    })
  } catch (error) {
    appstate.set({
      ...get(appstate),
      cameraPermission: 'denied',
      waitForCameraPermission: false
    })
    console.log(error)
  }
}
