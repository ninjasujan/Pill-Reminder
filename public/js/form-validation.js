const loginForm = document.querySelector('.login-form');
const error = document.querySelector('.error');

const validateInput = (username, password) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
  // if (!(username && password)) {
  //   error.innerHTML = `Enter valid login credential`;
  //   return false;
  // }
  // if (emailPattern.test(username) == false) {
  //   console.log('Invalid emial id');
  //   error.innerHTML = 'Enter valid username';
  //   return false;
  // }
  // console.log('valid emial');
  return true;
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginFields = {
    username: loginForm.email.value,
    password: loginForm.password.value,
  };
  if (validateInput(loginForm.email.value, loginForm.password.value)) {
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFields),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error.status == true) {
          error.innerHTML = data.error.errorMessage;
        } else {
          location.replace('/register');
        }
      })
      .catch((err) => {
        console.log('[Frnt-end]', err);
      });
  }
});
