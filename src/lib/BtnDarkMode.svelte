<script lang="ts">
  let lightmode: boolean = true

  function toggle() {
    window.document.body.classList.toggle('dark')
  }
</script>

<div class="toggle-switch">
  <label>
    <input type="checkbox" bind:checked={lightmode} on:change={toggle} />
    <span class="slider" />
  </label>
</div>

<style>
  /* element 5rem wide, 2.5rem high */
  :root {
    --light: white;
    --dark: black;
  }

  .toggle-switch {
    position: relative;
    width: 5rem;
    height: 2.5rem;
    overflow: hidden;
  }

  label {
    position: absolute;
    width: 5rem;
    height: 2.5rem;
    background-color: var(--dark);
    border-radius: 1.25rem;
    cursor: pointer;
  }

  input {
    position: absolute;
    display: none;
  }

  .slider {
    position: absolute;
    width: 5rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    transition: 1s;
  }

  input:checked ~ .slider {
    background-color: var(--light);
  }

  .slider::before {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    box-shadow: inset 0.6rem 0px 0px 0px var(--schema-orange);
    background-color: var(--dark);
    transition: ease var(--transitiontime);
  }

  input:checked ~ .slider::before {
    transform: translateX(2.55rem);
    background-color: var(--schema-green);
    box-shadow: none;
  }
</style>
