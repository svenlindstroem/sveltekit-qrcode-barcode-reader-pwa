<script lang="ts">
  import { onMount } from 'svelte'
  import { appstate } from './store'

  let cameras: InputDeviceInfo[]
  let selectedDeviceId: string | null

  onMount(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    cameras = devices.filter((device) => device.kind === 'videoinput')
    console.log(cameras)
  })

  function handleChange() {
    appstate.set({ ...$appstate, selectedDeviceId: selectedDeviceId })
  }
</script>

<div>Select a Camera</div>
{#if cameras && !$appstate.isScanning}
  <select bind:value={selectedDeviceId} on:change={handleChange}>
    <option>-- select --</option>
    {#each cameras as camera}
      <option value={camera.deviceId}>{camera.label}</option>
    {/each}
  </select>
{/if}
