
const validate = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) return { isValid, message: 'Поле не должно быть пустым' };
  }
  if (rules.notEqualList) {
    isValid = !rules.notEqualList.includes(value.toUpperCase()) && isValid;
    if (!isValid)
      return { isValid, message: 'Поле дублирует значение другого поля' };
  }

  if (rules.number) {
    isValid = !Number.isNaN(value) && isValid;
    if (!isValid) return { isValid, message: 'Допускаются только числа' };
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid)
      return {
        isValid,
        message: `Минимальная длина значения ${rules.minLength}`,
      };
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (!isValid)
      return {
        isValid,
        message: `Максимальная длина значения ${rules.maxLength}`,
      };
  }
  if (rules.min) {
    isValid = value >= rules.min && isValid;
    if (!isValid)
      return {
        isValid,
        message: `Минимальная значение вводимого числа ${rules.min}`,
      };
  }
  if (rules.max) {
    isValid = value <= rules.max && isValid;
    if (!isValid)
      return {
        isValid,
        message: `Максимальное значение вводимого числа ${rules.max}`,
      };
  }
  if (rules.regexp && value.toString().length > 0) {
    const [{ regexp, message }] = rules.regexp.filter(
      (item) =>
        value.toString().length >= item.minmax[0] &&
        value.toString().length <= item.minmax[1]
    );
    const match = !!value.match(regexp);
    isValid = match && isValid;
    if (!isValid) return { isValid, message };
  }

  return { isValid, message: null };
};

export default validate;
