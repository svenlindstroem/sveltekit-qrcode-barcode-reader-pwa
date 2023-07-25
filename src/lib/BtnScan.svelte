<script lang="ts">
  import { appstate } from '$lib/store'

  let start: string = ''
  $: start = $appstate.isScanning ? 'start' : ''

  function toggle() {
    appstate.set({ ...$appstate, isScanning: $appstate.isScanning ? false : true })
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<svg role="button" on:click={toggle} height="2.5rem" width="2.5rem" class:start>
  <circle cx="1.25rem" cy="1.25rem" r="1.25rem" />
  <rect x="0.625rem" y="0.625rem" width="1.25rem" height="1.25rem" fill="black" />
</svg>

<style>
  .start circle {
    fill: var(--bg-color);
  }

  rect {
    visibility: hidden;
  }

  .start rect {
    visibility: visible;
    fill: var(--schema-orange);
  }

  circle {
    fill: var(--schema-green);
    transition: ease var(--transitiontime);
  }
</style>
