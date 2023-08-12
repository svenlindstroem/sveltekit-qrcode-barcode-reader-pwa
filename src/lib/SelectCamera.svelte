<script lang="ts">
  import { appstate } from './store'

  let selectedDeviceId: string | null

  function handleChange() {
    appstate.set({ ...$appstate, selectedDeviceId: selectedDeviceId })
  }
</script>

{#if $appstate.cameras}
  <div>Select a Camera</div>
  <select bind:value={selectedDeviceId} on:change={handleChange}>
    <option value={null}>-- select --</option>
    {#each $appstate.cameras as camera}
      <option value={camera.deviceId}>{camera.label}</option>
    {/each}
  </select>
{/if}

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  div {
    text-align: center;
  }
  select {
    text-align: center;
    width: 100%;
    min-width: 15ch;
    max-width: 30ch;
    border: 1px solid green;
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    /* font-size: 1.25rem; */
    cursor: pointer;
    line-height: 1.1;
    /* background-color: #fff; */
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  }
</style>
