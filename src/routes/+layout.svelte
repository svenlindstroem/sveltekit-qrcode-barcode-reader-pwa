<script lang="ts">
  import { onMount } from 'svelte'
  import { navigating } from '$app/stores'
  import { appstate } from '$lib/store'
  import { checkPermissions } from '$lib/checkCameraPermissions'
  import Header from '$lib/Header.svelte'
  import Menu from '$lib/Menu.svelte'
  import BtnDarkMode from '$lib/BtnDarkMode.svelte'
  import BtnBurger from '$lib/BtnBurger.svelte'
  import BtnScan from '$lib/BtnScan.svelte'
  import Spinner from '$lib/Spinner.svelte'
  import './styles.css'

  let cameras: MediaDeviceInfo[]
  let showPromptNotice: boolean = false
  $: if ($navigating) closeMenu()

  onMount(async () => {
    checkPermissions()
    // wait to seconds, then show accept prompt notice
    setTimeout(() => (showPromptNotice = true), 2000)
  })

  function closeMenu() {
    appstate.set({ ...$appstate, isOpenMenu: false })
  }
</script>

<div class="app">
  <header>
    <Header />
  </header>
  <main>
    {#if $appstate.waitForCameraPermission}
      <p>Checking camera permissions ...</p>
      {#if showPromptNotice}
        <p>Are you prompted to allow acces to the camera?</p>
      {/if}
      <Spinner />
    {:else}
      <slot />
    {/if}
  </main>
  {#if $appstate.isOpenMenu}
    <Menu />
  {/if}
  <footer>
    <BtnBurger />
    <BtnScan />
    <BtnDarkMode />
  </footer>
</div>

<style>
  .app {
    margin: 0;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  header,
  footer,
  main {
    padding: 0.5rem 1rem;
  }
  header {
    margin: 0;
    display: flex;
    align-items: center;
    /*
	flex-shrink: 0;
	min-height: 3rem;
	max-height: 3rem; 
	flex-basis: 50px;
	*/
    background-color: var(--schema-orange);
    overflow: hidden;
  }

  main {
    overflow: auto;
    height: 100vh;
    padding: 1rem;
  }

  footer {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    /* flex-basis: 50px; */
    background: var(--schema-blue);
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
