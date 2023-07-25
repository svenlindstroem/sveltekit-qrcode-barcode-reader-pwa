<script lang="ts">
  import { navigating } from '$app/stores'
  import { appstate } from '$lib/store'
  import Header from '$lib/Header.svelte'
  import Menu from '$lib/Menu.svelte'
  import BtnDarkMode from '$lib/BtnDarkMode.svelte'
  import BtnBurger from '$lib/BtnBurger.svelte'
  import BtnScan from '$lib/BtnScan.svelte'
  import './styles.css'

  $: if ($navigating) closeMenu()

  function closeMenu() {
    const newState = { ...$appstate }
    newState.isOpenMenu = $appstate.isOpenMenu = false
    appstate.set(newState)
  }
</script>

<div class="app">
  <header>
    <Header />
  </header>
  <main>
    <slot />
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
