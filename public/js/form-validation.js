const loginForm = document.querySelector('.login-form');
const error = document.querySelector('.error');

const validateInput = (username, password) => {
  const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!(username && password)) {
    error.innerHTML = `Enter valid login credential`;
    return false;
  }
  if (emailPattern.test(username)) {
    error.innerHTML = 'Invalid Username';
    return false;
  }
  return true;
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = loginForm.email.value;
  const password = loginForm.password.value;
  if (validateInput(username, password)) {
  }
});
