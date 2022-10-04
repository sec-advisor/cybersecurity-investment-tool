// https://stackoverflow.com/questions/63009983/javascript-balancing-parentheses
export const validateParenthesis = (value: string): boolean => {
  const brackets = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '(') {
      brackets.push(value[i]);
    } else if (value[i] === ')') {
      if (brackets[brackets.length - 1] === '(') brackets.pop();
      else brackets.push('#');
    }
  }
  return brackets.length === 0;
};
