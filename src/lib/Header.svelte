<script>
  import Logo from '$lib/Logo.svelte'
</script>

<Logo />
<div>Code Scanner</div>

<style>
  div {
    font-size: 2rem;
    overflow: hidden;
    white-space: nowrap;
  }
  @media screen and (max-width: 320px) {
    div {
      font-size: 1.5rem;
    }
  }
</style>
