import { defineRule } from 'vee-validate';

export const generateValidation = () => {
  defineRule('required', (value) => {
    if (!value || !value.length) {
      return 'This field is required';
    }

    return true;
  });
};
