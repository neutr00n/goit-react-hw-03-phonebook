export function setLocalStorage(key, value) {
  try {
    const stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
  } catch (error) {
    throw new Error('Set state error: ', error.message);
  }
}

export function getLocalStorage(key) {
  try {
    const storageValue = localStorage.getItem(key);

    if (!storageValue) {
      return;
    }

    return JSON.parse(storageValue);
  } catch (error) {
    throw new Error('Get state error: ', error.message);
  }
}
