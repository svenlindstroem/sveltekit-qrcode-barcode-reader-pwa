<script lang="ts">
  import { clickOutside } from './clickOutside'
  import { appstate } from '$lib/store'
  import { fade } from 'svelte/transition'

  let open: string = ''

  $: open = $appstate.isOpenMenu ? 'open' : ''
</script>

<content
  in:fade
  out:fade
  class:open
  use:clickOutside
  on:clickedOutside={() => appstate.set({ ...$appstate, isOpenMenu: false })}
>
  <a href="/">Scan</a>
  <a href="/about">About</a>
  <a href="/history">History</a>
  <a href="/codes">Supported Codes</a>
</content>

<style>
  content {
    position: absolute;
    bottom: 3.5rem;
    padding: 1rem;
    background-color: var(--schema-blue-light);
    height: calc(100% - 9rem);
  }

  a {
    display: block;
    text-decoration: none;
  }

  a,
  a:hover,
  a:visited {
    color: var(--text-color);
    display: block;
    text-decoration: none;
  }
</style>
