export const convertedDateToSlash = (date) => {
  return `${new Date(date).toLocaleDateString().replace(/\./g, '/')} ${new Date(date).toTimeString().split(' ')[0]}`;
};
