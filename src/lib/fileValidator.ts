/**
 * Checks whether the file is too large or not, size value is validated based on megabytes, returns a boolean value
 * @param {File} file - Target file
 * @param {number} max - Maximum megabyte value
 */
export function validateMaxFile (file: File, max: number) {
    const _MAX_BYTES_TO_MEGABYTES = (1024 ** 2) * max;
    return file.size <= _MAX_BYTES_TO_MEGABYTES;
}