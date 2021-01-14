export const required = value => {
  return !value && 'field is required';
};

export const minLengthCreator = minLength => value => {
  return value.length < minLength && `min length is ${minLength} symbols`;
};

export const maxLengthCreator = maxLength => value => {
  return value.length > maxLength && `max length is ${maxLength} symbols`;
};

export const email = value => {
  return (
    value &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) &&
    'is invalid'
  );
};

export const minBirthday = value => {
  return (
    new Date(value) < new Date('1900-01-01') &&
    'can not be less than 1900-01-01'
  );
};

export const maxBirthday = value => {
  return new Date(value) > new Date() && 'can not be more than current date';
};

export const passwordsMatch = (value, allValues) => {
  return value !== allValues.password && "doesn't match";
};

export const symbolsName = value => {
  return (
    value && !/^[/a-zA-Zа-яА-Я\-a-zA-Zа-яА-Я]+$/.test(value) && 'is invalid'
  );
};

export const startDate = (value, valueData) => {
  const { endDate } = valueData;

  if (Date.parse(value) >= Date.parse(endDate))
    return `can not be more than ${endDate} or equal`;

  return (
    new Date(value) < new Date('2000-01-01') &&
    'can not be less than 2000-01-01'
  );
};

export const endDate = value => {
  return new Date(value) > new Date() && 'can not be more than current date';
};
