<script lang="ts">
  /* import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png'; */
</script>

<svelte:head>
  <title>Code Scanner</title>
  <meta name="description" content="QRcode and Barcode Scanner" />
</svelte:head>
<content> scan </content>

<style>
  content {
    display: flex;
    height: calc(100vh - 8.5rem);
    overflow: auto;
    flex-direction: column;
    /* 	
	justify-content: center;
	align-items: center; 
	*/
  }
</style>
