export default {
  readFile (fileElement, resultCallback) {
    if (!resultCallback) return

    if (!fileElement || !fileElement.files || !fileElement.files.length) {
      resultCallback('no file')
      return
    }

    const fileReader = new FileReader()

    fileReader.readAsDataURL(fileElement.files[0])
    fileReader.onload = function() {
      resultCallback(this.result)
    }
  },

  compress (img, width, height, quality) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height

    ctx.drawImage(img, 0, 0, width, height)

    return canvas.toDataURL("image/jpeg", quality || .6)
  },

  compressWithRatio (img, settings) {
    const MAX_WIDTH = settings.maxWidth
    const MAX_HEIGHT = settings.maxHeight
    let w = img.width
    let h = img.height

    if (MAX_WIDTH  > 0 && w > MAX_WIDTH) {
      h = MAX_WIDTH / w * h
      w = MAX_WIDTH
    }

    if (MAX_HEIGHT > 0 && h > MAX_HEIGHT) {
      w = MAX_HEIGHT / h * w
      h = MAX_HEIGHT
    }

    return this.compress(img, w, h, settings.quality)
  }
}





