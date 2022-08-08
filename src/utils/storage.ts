/* eslint-disable no-console */
const getItem = (key: string): any => {
  try {
    const serializedLocalStorageItem = localStorage.getItem(key);
    const serializedSessionStorageItem = sessionStorage.getItem(key);

    if (!serializedLocalStorageItem && !serializedSessionStorageItem) {
      return undefined;
    }
    if (serializedSessionStorageItem) return JSON.parse(serializedSessionStorageItem);
    if (serializedLocalStorageItem) return JSON.parse(serializedLocalStorageItem);
  } catch (err) {
    console.warn('Load from localstorage error: ', err);

    return undefined;
  }
};

export const saveItem = (
  key: string,
  item: any,
  saveToLocalStorage: boolean = false,
): void => {
  try {
    const serializedItem = JSON.stringify(item);

    if (!item) {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);

      return;
    }
    if (saveToLocalStorage) localStorage.setItem(key, serializedItem);
    sessionStorage.setItem(key, serializedItem);
  } catch (err) {
    console.warn('Save into storage error: ', err);
  }
};

export const loadState = (): any => {
  try {
    const state = {
      app: {
        colorScheme: 'light',
        language: 'en',
        userData: {
          id: '',
          name: '',
          access: 'basic',
          token: '',
        },
      },
    };

    const colorScheme = getItem('colorScheme');

    if (colorScheme) state.app.colorScheme = colorScheme;

    const language = getItem('language');

    if (language) state.app.language = language;

    const token = getItem('token');

    if (token) state.app.userData.token = token;

    return state;
  } catch (err) {
    console.warn("Can't load state, ", err);

    return undefined;
  }
};
