<script lang="ts">
  import { appstate } from '$lib/store'
  import { page } from '$app/stores'
  import { goto, beforeNavigate } from '$app/navigation'
  import type { NavigationType } from '@sveltejs/kit'

  let start: string = ''
  $: start = $appstate.isScanning ? 'start' : ''
  let nav: NavigationType

  // when moving away from the scan page, stop scanning
  beforeNavigate((nav) => {
    if (nav.from?.route.id === '/' && nav.to?.route.id !== '/' && nav.to?.route.id !== undefined) {
      if ($appstate.isScanning) {
        appstate.set({ ...$appstate, isScanning: false })
      }
    }
  })

  function toggle() {
    // goto scan page when button is pressed
    if ($page.route.id !== '/') {
      goto('/')
    }
    appstate.set({ ...$appstate, isScanning: !$appstate.isScanning })
  }
</script>

{#if $appstate.cameraPermission === 'granted'}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <svg role="button" on:click={toggle} height="2.5rem" width="2.5rem" class:start>
    <circle cx="1.25rem" cy="1.25rem" r="1.25rem" />
    <rect x="0.625rem" y="0.625rem" width="1.25rem" height="1.25rem" fill="black" />
  </svg>
{/if}

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
