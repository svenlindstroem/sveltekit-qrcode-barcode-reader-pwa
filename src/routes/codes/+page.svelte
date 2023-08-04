<script lang="ts">
  import * as ZXing from '@zxing/library'
  let codes = ZXing.BarcodeFormat

  let result = Object.values(codes)
    .filter((v) => typeof v === 'string')
    .join(', ')
</script>

<p>This application supports the following QrCodes and Barcodes:</p>

<p>
  {result}
</p>

<style>
  p {
    margin-top: 1rem;
  }
</style>
