import { countriesList } from './Countries';

export const ValidationMessages = {
  email: {
    required: 'Enter your email!',
    error:
      'An incorrect email was entered. It must start from letter/number and contain only Latin letters, numbers, underscores, dots and minus signs.',
    notExist: 'This e-mail was not found in the system',
  },
  password: {
    required: 'Enter your password!',
    error:
      'English only. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    wrongPassword: 'You entered the wrong password',
  },
  passwordConfirm: {
    required: 'Confirm your password!',
    error: 'Must match the password.',
  },
  username: {
    required: "Don't forget your name!",
    error:
      'Must contain at least one character and no special characters or numbers',
  },
  surname: {
    required: "Don't forget your surname!",
    error:
      'Must contain at least one character and no special characters or numbers',
  },
  birthDate: {
    required: 'Are you 13+?',
    tooOld: 'You are too old!',
    tooYoung: 'You must be at least 13!',
    futureAge: 'You live in the future!',
  },
  shipping: {
    city: {
      required: 'Please enter your city!',
      error:
        'Cant start and end with whitespace. Must contain only Latin letters!',
    },
    street: {
      required: 'Please enter your street!',
      error: 'Cant start with whitespace!',
    },
    postal: {
      required: 'Please enter your postal code!',
      error: 'Must use pattern',
    },
  },
  alreadyExist: {
    error: 'A user with this email already exists',
  },
  serverError: {
    error: 'The server is thinking, try again later',
  },
  login: {
    success: 'You have successfully logged in!',
  },
};

const validateBirthDate = (date: string) => {
  const currentDate = new Date();
  const birthdate = new Date(date);
  if (birthdate > currentDate) {
    return ValidationMessages.birthDate.futureAge;
  }
  const difference = new Date(currentDate.valueOf() - birthdate.valueOf());
  const age = Math.abs(difference.getUTCFullYear() - 1970);
  if (age > 120) {
    return ValidationMessages.birthDate.tooOld;
  }
  return age >= 13 ? true : ValidationMessages.birthDate.tooYoung;
};

const validationConfirmPassword = (
  confirmPassword: string,
  realPassword: string,
) => {
  return (
    realPassword === confirmPassword || ValidationMessages.passwordConfirm.error
  );
};

const validationPostalCode = (postalCode: string, country: string) => {
  const currentCountry = countriesList.find(({ name }) => name === country);
  return (
    currentCountry?.regularForIndex?.test(postalCode) ||
    `${currentCountry?.indexError}`
  );
};

export const Validation = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S+]{8,}$/,
  username: /^[a-zA-Z]+$/,
  surname: /^[a-zA-Z]+$/,
  email: /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9-]{1,}\.[a-zA-Z0-9]{2,4}$/,
  city: /^[a-zA-Z]+ *[a-zA-Z]*$/,
  street: /^\S/,
  birthDate: validateBirthDate,
  confirmPassword: validationConfirmPassword,
  postalCode: validationPostalCode,
};
