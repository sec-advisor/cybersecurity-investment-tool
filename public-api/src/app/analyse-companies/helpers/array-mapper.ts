export const mapArray = (string: string): string[] => {
  return string
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll(' ', '')
    .replaceAll(`'`, '')
    .split(',');
};
