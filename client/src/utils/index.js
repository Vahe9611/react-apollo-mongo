export const devLog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args);
  }
};
