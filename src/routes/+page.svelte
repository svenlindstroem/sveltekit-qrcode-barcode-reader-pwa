<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import * as ZXing from '@zxing/library'
  import { appstate, isScanningDerived, selectedDeviceIdDerived } from '$lib/store'
  import ScanResult from '$lib/ScanResult.svelte'
  import SelectCamera from '$lib/SelectCamera.svelte'

  type ScanResult = {
    text: string | null | undefined
    format: string | void
    datetime: Date
  }

  let videoElement: HTMLVideoElement
  let devices: MediaDeviceInfo[] = []
  let selectedDeviceId: MediaDeviceInfo | string | undefined
  let scanResult: ScanResult | false = false
  let errorMsg: string | unknown
  let playBeep: boolean = true
  let hasMultipleCameras = false
  let resultIsLink: boolean = false

  let cameras: InputDeviceInfo[]

  const codeReader = new ZXing.BrowserMultiFormatReader()

  // listen to state changes
  // use a derived store to only listen to changes to isScanning
  $: if ($isScanningDerived) {
    initializeCodeReader().then(() => start())
  } else {
    stop()
  }

  $: if ($selectedDeviceIdDerived) {
    stop()
    initializeCodeReader().then(() => start())
  }

  async function initializeCodeReader() {
    try {
      // requires ssl if not on localhost
      devices = await codeReader.listVideoInputDevices()

      if (devices.length > 1) {
        selectedDeviceId = devices.find((device) => device.label.toLowerCase().includes('back'))
      }
      if (!selectedDeviceId) selectedDeviceId = undefined
      // hasMultipleCameras = true
      if (devices.length === 1) {
        selectedDeviceId = devices[0].deviceId
      }
    } catch (error) {
      errorMsg = error
      console.log(error)
    }
  }

  /*   onMount(async () => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      cameras = devices.filter((device) => device.kind === 'videoinput')
    })
  }) */

  async function start() {
    scanResult = false
    await codeReader.decodeFromVideoDevice(
      $selectedDeviceIdDerived,
      videoElement,
      scanResultCallback
    )

    // get the active track and trun on torch
    /* navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
      //videoElement.srcObject = mediaStream
      const track = mediaStream.getVideoTracks()[0]
      //trackCapabilities = track.getCapabilities()
      console.log(track.getCapabilities(), 12345)
    }) */
  }

  function stop() {
    codeReader.reset()
    errorMsg = ''
    appstate.set({ ...$appstate, isScanning: false })
  }

  function scanResultCallback(result: ScanResult, error: any) {
    if (result) {
      scanResult = {
        text: result.text,
        format: Object.keys(ZXing.BarcodeFormat).find(
          (key) => ZXing.BarcodeFormat[key] === result.format
        ),
        datetime: new Date()
      }

      if (result.text?.includes('http://') || result.text?.includes('https://')) {
        resultIsLink = true
      }

      if (playBeep) beep() // play sound
      codeReader.reset() // stop video
      appstate.set({ ...$appstate, isScanning: false })
    }
    if (error && !(error instanceof ZXing.NotFoundException)) {
      console.error(error)
      errorMsg = error
    }
  }

  function beep() {
    const snd = new Audio(
      'data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='
    )
    snd.play()
  }
</script>

<svelte:head>
  <title>Code Scanner</title>
  <meta name="description" content="QRcode and Barcode Scanner" />
</svelte:head>
<content>
  <section>
    <SelectCamera />
    {#if $isScanningDerived}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video bind:this={videoElement} />
    {/if}
    {#if scanResult}
      <ScanResult {scanResult} />
      {#if resultIsLink}
        <pre><code><a href={scanResult.text}>{scanResult.text}</a> {scanResult.format}</code></pre>
      {:else}
        <pre><code>{scanResult.text} {scanResult.format}</code></pre>
      {/if}
    {/if}
    {#if errorMsg}
      <pre><code>{errorMsg}</code></pre>
    {/if}
  </section>
</content>

<style>
  content {
    display: flex;
    height: calc(100vh - 8.5rem);
    overflow: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 	
	justify-content: center;
	align-items: center; 
	*/
  }
  section {
    justify-content: center;
    align-items: center;
  }
  video {
    /* outline: 1px solid green; */
    /* display: none; */
    /* height: 100%;
    width: 100%; */
  }
</style>
