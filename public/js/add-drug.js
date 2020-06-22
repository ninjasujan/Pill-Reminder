const addToList = document.querySelector("#add-list");
let medicinList = [];
let person = {};
const registerForm = document.querySelector(".register");
const drugInput = registerForm.drugname;
const daysInput = registerForm.days;
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const error = document.querySelector(".medicin-list .error");
const listTable = document.querySelector("table");
const submit = document.querySelector(".submit");

let id = 1;

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

const resetForm = () => {
  registerForm.reset();
  console.log("Form reset");
};

const clearInput = () => {
  registerForm.drugname.value = "";
  registerForm.days.value = "";
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const validateMedicineInput = (drugName, days, shedule) => {
  if (drugName === "") return "Drug name shouldn't be empty";
  if (days == 0) return "Invalid days";
  if (
    shedule.morning == false &&
    shedule.afternoon == false &&
    shedule.night == false
  ) {
    return "Please suggest timing of the medicine";
  }
  return "success";
};

const validatePersonInput = (id, name, contact, location) => {
  const person_error = document.querySelector("#person-error");
  if (id == "") {
    person_error.innerHTML = `ID field should not be empty.!`;
    return false;
  }
  if (name == "" || /^[a-zA-Z ]{2, }$/.test(name)) {
    person_error.innerHTML = "Please enter valid name..";
    return false;
  }
  if (location == "") {
    person_error.innerHTML = "Please enter Location field";
    return false;
  }
  if (contact.length != 10) {
    person_error.innerHTML = "Please enter valid Phone number";
    return false;
  }
  return true;
};

addToList.addEventListener("click", (e) => {
  const drugName = drugInput.value;
  const days = daysInput.value;
  const shedule = { morning: false, afternoon: false, night: false };
  checkboxes.forEach((time, index) => {
    if (time.checked) {
      shedule[time.value] = true;
    }
  });
  let msg = validateMedicineInput(drugName, days, shedule);
  if (msg !== "success") {
    error.innerHTML = msg;
  } else {
    error.innerHTML = "";
    medicinList.push({
      id: id,
      name: drugName,
      days: days,
      schedule: {
        morning: shedule.morning,
        afternoon: shedule.afternoon,
        night: shedule.night,
      },
    });
    id = id + 1;
    drawTable(medicinList);
    clearInput();
  }
  console.log("[Add-Drug.js]", medicinList);
});

function deleteMedicine(e) {
  const drugRow = e.target.parentElement.parentElement;
  const id = drugRow.querySelector("td").innerText;
  console.log("medicin ID to delete", id);
  const medicinIndex = medicinList.findIndex((medicin) => {
    return medicin.id == id;
  });
  console.log("Index value in Medicin List", medicinIndex);
  if (medicinList.length == 1) {
    medicinList = [];
    submit.classList.remove("active");
    listTable.style.display = "none";
  } else {
    medicinList.splice(medicinIndex, 1);
    drawTable(medicinList);
  }
}

const drawTable = (medicinList) => {
  console.log("[Add-drug.js] Draw Table", medicinList);
  listTable.style.display = "table";
  submit.classList.add("active");
  const tableBodyStructure = document.querySelector("#table-body");
  let tableBody = "";
  const time = [];
  for (let medicin of medicinList) {
    const time = [];
    if (medicin.schedule.morning == true) time.push("Morning");
    if (medicin.schedule.afternoon == true) time.push("Afternoon");
    if (medicin.schedule.night == true) time.push("Night");
    tableBody += `
        <tr>
            <td>${medicin.id}</td>
            <td>${medicin.name}</td>
            <td>${medicin.days}</td>
            <td>${time.join(", ")}</td>
            <td><button class="delete" onclick="deleteMedicine(event);">Delete</button></td>
        </tr>
      `;
  }
  tableBodyStructure.innerHTML = tableBody;
};

submit.addEventListener("click", (e) => {
  console.log("Register action initiated.!");
  const id = registerForm.id.value;
  const name = registerForm.name.value;
  const contact = registerForm.contact.value;
  const location = registerForm.location.value;
  const address = registerForm.address.value;
  console.log(id, name, contact, location);
  if (validatePersonInput(id, name, contact, location)) {
    const patientInfo = {
      id: id,
      name: name,
      contact: contact,
      location: location,
      address: address,
      medicine: medicinList,
    };
    console.log("Making server request to the database", patientInfo);
    fetch("/post-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientInfo),
    })
      .then((response) => {
        console.log("[Patient Registration]", response);
        window.location = "/register";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Error in fileds.!");
  }
});
