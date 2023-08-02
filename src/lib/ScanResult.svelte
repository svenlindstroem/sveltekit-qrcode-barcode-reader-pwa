<script lang="ts">
  import { appstate } from '$lib/store'
  export let scanResult: any
</script>

<content>
  {scanResult.datetime}
  {scanResult.text}
  {scanResult.format}
  {scanResult}</content
>

<style>
</style>
