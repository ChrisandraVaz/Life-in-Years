export const getFormattedNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};
