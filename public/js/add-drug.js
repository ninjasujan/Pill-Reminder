const addToList = document.querySelector('#add-list');
let medicinList = [];
const registerForm = document.querySelector('.register');
const drugInput = registerForm.drugname;
const daysInput = registerForm.days;
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const error = document.querySelector('.medicin-list .error');
const listTable = document.querySelector('table');
const submit = document.querySelector('.submit');

let id = 1;

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

const validateInput = (drugName, days, shedule) => {
  if (drugName === '') return "Drug name shouldn't be empty";
  if (days == 0) return 'Invalid days';
  if (
    shedule.morning == false &&
    shedule.afternoon == false &&
    shedule.night == false
  ) {
    return 'Please suggest timing of the medicin';
  }
  return 'success';
};

const clearInput = () => {
  registerForm.reset();
};

addToList.addEventListener('click', (e) => {
  const drugName = drugInput.value;
  const days = daysInput.value;
  console.log('Days: ', days, typeof days);
  const shedule = { morning: false, afternoon: false, night: false };
  checkboxes.forEach((time, index) => {
    if (time.checked) {
      shedule[time.value] = true;
    }
  });
  let msg = validateInput(drugName, days, shedule);
  if (msg !== 'success') {
    error.innerHTML = msg;
  } else {
    error.innerHTML = '';
    medicinList.push({
      id: id,
      drugName: drugName,
      days: days,
      shedule: {
        morning: shedule.morning,
        afternoon: shedule.afternoon,
        night: shedule.night,
      },
    });
    id = id + 1;
    drawTable(medicinList);
    clearInput();
  }
});

function deleteMedicin(e) {
  const drugRow = e.target.parentElement.parentElement;
  const id = drugRow.querySelector('td').innerText;
  console.log('medicin ID to delete', id);
  const medicinIndex = medicinList.findIndex((medicin) => {
    return medicin.id == id;
  });
  console.log('Index value in Medicin List', medicinIndex);
  if (medicinList.length == 1) {
    medicinList = [];
    submit.classList.remove('active');
    listTable.style.display = 'none';
  } else {
    medicinList.splice(medicinIndex, 1);
    drawTable(medicinList);
  }
}

const drawTable = (medicinList) => {
  listTable.style.display = 'table';
  submit.classList.add('active');
  const tableBodyStructure = document.querySelector('#table-body');
  let tableBody = '';
  const time = [];
  for (let medicin of medicinList) {
    const time = [];
    if (medicin.shedule.morning == true) time.push('Morning');
    if (medicin.shedule.afternoon == true) time.push('Afternoon');
    if (medicin.shedule.night == true) time.push('Night');
    tableBody += `
        <tr>
            <td>${medicin.id}</td>
            <td>${medicin.drugName}</td>
            <td ">${time.join(', ')}</td>
            <td><button class="delete" onclick="deleteMedicin(event);">Delete</button></td>
        </tr>
      `;
  }
  tableBodyStructure.innerHTML = tableBody;
};
