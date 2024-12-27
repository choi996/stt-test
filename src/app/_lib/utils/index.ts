export const clearBlank = (s: string) => s.replace(/ /g, '');

let timer: NodeJS.Timeout | null = null;
export const debounce = (func: () => void, wait = 500) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(func, wait);
};
