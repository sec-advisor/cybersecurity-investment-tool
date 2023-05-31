export const mapArray = (string: string) => {
  return string
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll(' ', '')
    .replaceAll(`'`, '')
    .split(',');
};
