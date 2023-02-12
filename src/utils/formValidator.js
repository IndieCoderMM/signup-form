const emailValidator = (email) => {
  // eslint-disable-next-line
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(emailFormat);
};

const passwordValidator = (password) => {
  // should contains at least 6 char, must include uppercase, lowercase, 123
  // eslint-disable-next-line

  const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return password.match(pwFormat);
};

export class Validator {
  constructor(
    firstname = '',
    lastname = '',
    email = '',
    password = '',
    status = 'idle',
  ) {
    this.password = {};
    this.email = {};
    this.firstname = firstname;
    this.lastname = lastname;
    this.password.empty = password.length ? false : true;
    this.password.valid = passwordValidator(password);
    this.password.value = password;
    this.email.empty = email.length ? false : true;
    this.email.valid = emailValidator(email);
    this.email.value = email;
    this.status = this.isValid()
      ? 'success'
      : status === 'idle'
      ? 'idle'
      : 'invalid';
  }
  isValid() {
    return (
      this.firstname &&
      this.lastname &&
      !this.password.empty &&
      this.password.valid &&
      !this.email.empty &&
      this.email.valid
    );
  }
}
