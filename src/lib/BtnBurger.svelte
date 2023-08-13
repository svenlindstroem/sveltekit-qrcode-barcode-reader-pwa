<script lang="ts">
  import { appstate } from '$lib/store'

  let open: string = ''

  $: open = $appstate.isOpenMenu ? 'open' : ''

  function toggle() {
    appstate.set({ ...$appstate, isOpenMenu: !$appstate.isOpenMenu })
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="ignore-clickoutside" class:open on:click={toggle}>
  <span />
  <span />
  <span />
</div>

<style>
  div {
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    cursor: pointer;
    padding-right: 2.5rem;
  }

  span {
    display: block;
    height: 0.33rem;
    width: 2.5rem;
    transition: var(--transitiontime) ease-in-out;
    border-radius: 0.125rem;
    background-color: var(--schema-green);
  }

  span:nth-child(1),
  span:nth-child(2) {
    margin-bottom: 0.75rem;
  }

  .open span {
    transition: var(--transitiontime) ease-in-out;
    background-color: var(--schema-orange);
  }

  .open span:nth-child(1) {
    transform-origin: top left;
    transform: scale(1.25) translate(0.23rem, 0rem) rotate(45deg);
  }

  .open span:nth-child(2) {
    opacity: 0;
  }
  .open span:nth-child(3) {
    transform-origin: bottom left;
    transform: scale(1.25) translate(0.23rem, 0rem) rotate(-45deg);
  }
</style>
