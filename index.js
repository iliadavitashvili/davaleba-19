// დავალება 1
// მოცემულია მასივი
const table = document.getElementById("table");
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const closeButton = document.getElementById("close-button");
const modal = document.getElementById("modal");
const usIdLabel = document.getElementById("user-id-label");
const usEmailLabel = document.getElementById("user-email-label");
const usFirstName = document.getElementById("user-first-name-label");
const usLastNamee = document.getElementById("user-last-name-label");

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
const users = [
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
  },
  {
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
  },
];
function closeModal() {
  addButton.style.display = "block";
  modal.style.display = "none";
  inputField["user-id"].value = "";
  inputField["user-email"].value = "";
  inputField["user-first-name"].value = "";
  inputField["user-last-name"].value = "";
}
addButton.addEventListener("click", function () {
  addButton.style.display = "none";
  modal.style.display = "block";
});
closeButton.addEventListener("click", closeModal);

function deleteUser(id) {
  const newArray = users.filter((user) => user.id !== parseInt(id));
  users.length = 0;
  console.log(users);
  users.push(...newArray);
  addingUsers();
}
function addingUsers() {
  table.innerHTML = "";
  users.map((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML += `
        <td>${user.id}</td> 
        <td>${user.email}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        
        `;
    const trButton = document.createElement("button");
    trButton.textContent = "DeleteUser";
    trButton.classList.add("del-button");
    trButton.dataset.id = user.id;
    tr.appendChild(trButton);
    table.appendChild(tr);
  });

  const delButtons = document.querySelectorAll(".del-button");

  delButtons.forEach((button) => {
    return button.addEventListener("click", (e) =>
      deleteUser(e.target.dataset.id)
    );
  });
}

inputField.addEventListener("submit", function (e) {
  e.preventDefault();
  const idExists = users.find(
    (user) => user.id === parseInt(inputField["user-id"].value)
  );
  const emailExists = users.find(
    (user) => user.email === inputField["user-email"].value
  );
  try {
    if (!idExists && parseInt(inputField["user-id"].value)) {
      usIdLabel.style.border = "unset";
      usIdLabel.style.color = "black";
      usIdLabel.textContent = "Enter ID";
    } else {
      throw new Error("Please Enter unused and valid ID");
    }
    if (!emailExists && validateEmail(inputField["user-email"].value)) {
      usEmailLabel.style.border = "unset";
      usEmailLabel.style.color = "black";
      usEmailLabel.textContent = "Enter Email";
    } else {
      throw new Error("Enter Valid and unused Email");
    }
    if (inputField["user-first-name"].value.length < 1) {
      throw new Error("first name should be more than 1 character length");
    } else {
      usFirstName.style.border = "unset";
      usFirstName.style.color = "black";
      usFirstName.textContent = "Enter First Name";
    }
    if (inputField["user-last-name"].value.length < 1) {
      throw new Error("last name should be more than 1 character length");
    } else {
      usLastNamee.style.border = "unset";
      usLastNamee.style.color = "black";
      usLastNamee.textContent = "Enter Last Name";
    }
  } catch (err) {
    if (err.message === "Please Enter unused and valid ID") {
      // console.log("exsisaaa");

      usIdLabel.style.color = "red";
      usIdLabel.style.border = "1px solid red";
      usIdLabel.textContent = err.message;
    }
    if (err.message === "Enter Valid and unused Email") {
      usEmailLabel.style.color = "red";
      usEmailLabel.style.border = "1px solid red";
      usEmailLabel.textContent = err.message;
    }
    if (err.message === "first name should be more than 1 character length") {
      usFirstName.style.color = "red";
      usFirstName.style.border = "1px solid red";
      usFirstName.textContent = err.message;
    }
    if (err.message === "last name should be more than 1 character length") {
      usLastNamee.style.color = "red";
      usLastNamee.style.border = "1px solid red";
      usLastNamee.textContent = err.message;
    }
  }
  const newUser = {
    id: parseInt(inputField["user-id"].value),
    email: inputField["user-email"].value,
    first_name: inputField["user-first-name"].value,
    last_name: inputField["user-last-name"].value,
  };

  if (
    !idExists &&
    parseInt(inputField["user-id"].value) &&
    !emailExists &&
    validateEmail(inputField["user-email"].value) &&
    inputField["user-first-name"].value.length > 1 &&
    inputField["user-last-name"].value.length > 1
  ) {
    const newUsers = [...users, newUser];
    users.length = 0;
    users.push(...newUsers);
    closeModal();
  }

  addingUsers();
});
addingUsers();
