export const validateMinMaxLength = (nameField: string, value: string, maxLength?: number, minLength?: number) => {
  if (maxLength && value.length > maxLength) {
    return `${nameField} should not excced the max length than ${maxLength}`;
  } else if (minLength && value.length < minLength) {
    return `${nameField} should not excced the min length than ${minLength}`;
  }
  return true;
};

export const validRequired = (nameField: string) => {
  return `${nameField} is required`;
};
