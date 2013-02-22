module.exports = {
  variants: {
    product: {
      resizeAndCrop: {
        mini: {resize: "63504@", crop: "80x60"}
      }
    }
  },
  storage: {
  
    S3: {
        key: "AKIAJRGFTOGM4PFIP54A",
        secret: "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",
        bucket: "streetzest",
        region: 'Ireland'
    }
  },
  debug: true
}
