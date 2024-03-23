/**
 * Checks whether the file is too large or not, size value is validated based on megabytes, returns a boolean value
 * @param {File} file - Target file
 * @param {number} max - Maximum megabyte value
 * @returns {boolean}
 */
export function validateMaxFile(file, max) {
  const _MAX_BYTES_TO_MEGABYTES = 1024 ** 2 * max
  return file.size <= _MAX_BYTES_TO_MEGABYTES
}

/**
 * FileReader but specializes in reading URL data and converting it to promise
 * @param {Blob} file
 * @returns {Promise<string | ArrayBuffer | null>}
 */
export function readBlobUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)

    if (reader.error) {
      reject(new Error(reader.error))
    }
  })
}
