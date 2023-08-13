<script lang="ts">
  import { appstate } from '$lib/store'
  import type { ScanResultType } from '../types'
  export let scanResult: ScanResultType

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  let date = scanResult.datetime.toLocaleDateString(navigator.language, options)
  let time = scanResult.datetime.toLocaleTimeString()
  let isLink = scanResult.text.startsWith('http')

  let copied = false
  function copy() {
    navigator.clipboard.writeText(scanResult.text)
    copied = true
    setTimeout(() => {
      copied = false
    }, 1000)
  }
</script>

<div>
  <h3>Scan Result</h3>
  <hr />
  <p>
    {date} - {time}
  </p>

  <main>
    {#if isLink}
      <a href={scanResult.text} target="_blank">{scanResult.text}</a>
    {:else}
      {scanResult.text}
    {/if}
    <span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <svg
        on:click={copy}
        width="1rem"
        height="1rem"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill="#000000"
          d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
        /><path
          fill="#000000"
          d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
        /></svg
      >
    </span>
    <span id="copied" class={copied ? 'copied' : ''}>copied!</span>
  </main>

  <footer>
    Code Type: {scanResult.format}
  </footer>
</div>

<style>
  a,
  a:hover,
  a:visited {
    color: var(--text-color);
  }
  #copied {
    display: none;
    color: green;
  }

  .copied {
    display: inline !important;
    color: green;
  }
  svg {
    padding-left: 0.5rem;
  }
  h3,
  main,
  footer {
    text-align: center;
  }
  hr {
    border-top: 1px solid var(--schema-blue);
  }
  div {
    border: 1px solid var(--schema-blue);
    border-radius: 10px;
    padding: 1rem;
  }
  main {
    padding: 1rem;
  }
  p {
    text-align: center;
  }
  footer {
    font-size: 1rem;
  }
</style>
