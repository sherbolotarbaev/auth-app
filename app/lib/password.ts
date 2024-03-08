enum PasswordCheckStrength {
  Short = 'Password: Too short 😢',
  Common = 'Password: Common ☹️',
  Weak = 'Password: Weak 😕',
  Ok = 'Password: Acceptable 🙂',
  Strong = 'Password: Strong 🦾',
  Long = 'Password: Too long 😭',
}

const MinimumLength = 8;
const MaximumLength = 16;

const commonPasswordPatterns =
  /^(?=.*passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*)/i;

const isPasswordCommon = (password: string): boolean => {
  return commonPasswordPatterns.test(password);
};

export const checkPasswordStrength = (password: string): PasswordCheckStrength => {
  if (!password || password.length < MinimumLength) {
    return PasswordCheckStrength.Short;
  }

  if (password.length > MaximumLength) {
    return PasswordCheckStrength.Long;
  }

  let numberOfElements = 0;
  if (/[a-z]/.test(password)) numberOfElements++;
  if (/[A-Z]/.test(password)) numberOfElements++;
  if (/[0-9]/.test(password)) numberOfElements++;
  if (/[^a-zA-Z0-9]/.test(password)) numberOfElements++;

  if (isPasswordCommon(password)) {
    return PasswordCheckStrength.Common;
  } else if (numberOfElements <= 2) {
    return PasswordCheckStrength.Weak;
  } else if (numberOfElements === 3) {
    return PasswordCheckStrength.Ok;
  } else {
    return PasswordCheckStrength.Strong;
  }
};
