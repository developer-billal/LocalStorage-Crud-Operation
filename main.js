let selectedRow = null;
let contactArr;
$("document").ready(function () {
  $("#addBtn").click(function () {
    if (
      $("#name").val() == "" ||
      $("#email").val() == "" ||
      $("#phone").val() == "" ||
      $("#address").val() == ""
    ) {
      alert();
      return;
    }
    let formInputData = inputData();
    if (selectedRow) {
      updateData();
    } else {
      displayData(formInputData);
      saveToLocalStorage(formInputData);
    }
    clearFields();
    reseRowtoNull();
  });
});

//Get data from input fields
let inputData = () => {
  let formData = {
    name: short("#name").value,
    email: short("#email").value,
    phone: short("#phone").value,
    address: short("#address").value,
  };
  return formData;
};

//Display form data to the table
let displayData = ({ name, email, phone, address }) => {
  let tbody = short("tbody");
  let newRow = tbody.insertRow();

  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = name;

  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = email;

  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = phone;

  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = address;

  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = `
                    <button onClick = 'deleteRecord(this)' class = 'btn btn-danger'>
                    Delete
                    </button>
                    <button onClick = 'editTableData(this)' class = 'btn btn-success'>
                        Edit
                    </button>
                `;
};

//creating element selector
function short(selector) {
  if (selector.match(/[#/.]/)) {
    return document.querySelector(selector);
  } else {
    return document.querySelector(selector);
  }
}

//Clear all input fields
let clearFields = () => {
  short("#name").value = "";
  short("#email").value = "";
  short("#phone").value = "";
  short("#address").value = "";
};

//Delete a row from table
let deleteRecord = (deleteBtn) => {
  let tr = deleteBtn.parentElement.parentElement;
  //Delete from local storage
  let localDataArr = JSON.parse(localStorage.getItem("contact"));
  localDataArr.splice(tr.rowIndex - 1, 1);
  localStorage.setItem("contact", JSON.stringify(localDataArr));

  let table = document.querySelector("table");
  table.deleteRow(tr.rowIndex);
  clearFields();
};

//Edit data and display to the input fields
let editTableData = (editBtnElem) => {
  selectedRow = editBtnElem.parentElement.parentElement;
  short("#name").value = selectedRow.cells[0].innerHTML;
  short("#email").value = selectedRow.cells[1].innerHTML;
  short("#phone").value = selectedRow.cells[2].innerHTML;
  short("#address").value = selectedRow.cells[3].innerHTML;
};

//Update data from input fields
let updateData = () => {
  selectedRow.cells[0].innerHTML = short("#name").value;
  selectedRow.cells[1].innerHTML = short("#email").value;
  selectedRow.cells[2].innerHTML = short("#phone").value;
  selectedRow.cells[3].innerHTML = short("#address").value;
  //update data in local storage
  let localDataArr = JSON.parse(localStorage.getItem("contact"));
  let currentIndex = selectedRow.rowIndex - 1;
  let updated = {
    name: short("#name").value,
    email: short("#email").value,
    phone: short("#phone").value,
    address: short("#address").value,
  };
  localDataArr[currentIndex] = updated;
  localStorage.setItem("contact", JSON.stringify(localDataArr));
};

//Reset selectedRow to null
let reseRowtoNull = () => {
  selectedRow = null;
};

//Save form data to local storage
let saveToLocalStorage = (formDataObj) => {
  if (localStorage.getItem("contact")) {
    contactArr = JSON.parse(localStorage.getItem("contact"));
  } else {
    contactArr = [];
  }
  contactArr.push(formDataObj);
  contactArr = localStorage.setItem("contact", JSON.stringify(contactArr));
};

//Make data permanent to the table
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("contact")) {
    contactArr = JSON.parse(localStorage.getItem("contact"));
    contactArr.forEach(function (elem) {
      displayData(elem);
    });
  } else {
    contactArr = [];
  }
});
