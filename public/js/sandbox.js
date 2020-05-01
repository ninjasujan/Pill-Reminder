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
