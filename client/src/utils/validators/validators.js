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
  const { endDate, step } = valueData;

  if (
    step === 'month' &&
    new Date(value).getUTCFullYear() === new Date(endDate).getUTCFullYear() &&
    new Date(value).getUTCMonth() === new Date(endDate).getUTCMonth()
  )
    return 'can not be with the same month of the year end date';

  if (new Date(value) < new Date('2018-01-01'))
    return 'can not be less than 2018-01-01';

  return (
    new Date(value) > new Date(endDate) &&
    `can not be more than ${endDate} or equal`
  );
};

export const endDate = (value, valueData) => {
  const { startDate, step } = valueData;

  if (step === 'day' && new Date(value) <= new Date(startDate))
    return `can not be less than ${startDate} or equal`;

  return new Date(value) > new Date() && 'can not be more than current date';
};
