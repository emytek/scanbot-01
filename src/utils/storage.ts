export const saveToStorage = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  };
  
  export const getFromStorage = (key: string): string | null => {
    return sessionStorage.getItem(key);
  };
  
  export const removeFromStorage = (key: string) => {
    sessionStorage.removeItem(key);
  };
  