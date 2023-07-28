<script>
  import * as ZXing from '@zxing/library'
  let codes = ZXing.BarcodeFormat

  let result = Object.keys(codes).reduce((filteredObject, key) => {
    if (Number.isInteger(parseInt(key))) {
      filteredObject[key] = codes[key]
    }
    return filteredObject
  }, {})
  result = Object.values(result)
</script>

<p>This application supports the following QrCodes and Barcodes:</p>

<p>
  {Object.keys(result)
    .map(function (k) {
      return codes[k]
    })
    .join(', ')}
</p>

<style>
  p {
    margin-top: 1rem;
  }
</style>
