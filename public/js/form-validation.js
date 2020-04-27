const loginForm = document.querySelector('.login-form');
const error = document.querySelector('.error');

const validateInput = (username, password) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
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
  const loginFields = {
    username: loginForm.email.value,
    password: loginForm.password.value,
  };
  console.log(loginFields);
  if (validateInput(loginForm.email.value, loginForm.password.value)) {
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFields),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const toggle = document.querySelector('.toggle');
const container = document.querySelectorAll('.container');
toggle.addEventListener('click', () => {
  container.forEach((box) => {
    if (box.classList.contains('hide')) {
      box.classList.remove('hide');
    } else {
      box.classList.add('hide');
    }
  });
});
