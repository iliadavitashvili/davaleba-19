// დავალება 1
// მოცემულია მასივი
const table = document.getElementById("table");
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button")
const closeButton = document.getElementById("close-button")
const modal = document.getElementById("modal")

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
function closeModal(){
    addButton.style.display = "block"
    modal.style.display = "none";
    inputField["user-id"].value = "";
    inputField["user-email"].value ="";
    inputField["user-first-name"].value="";
    inputField["user-last-name"].value=""
}
addButton.addEventListener("click",function(){
    addButton.style.display = "none"
    modal.style.display = "block"
})
closeButton.addEventListener("click",closeModal)

function deleteUser(id) {
  const newArray = users.filter((user) => user.id !== parseInt(id));
  users.length = 0;
  console.log(users)
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
  const newUser = {
    id: parseInt(inputField["user-id"].value),
    email: inputField["user-email"].value,
    first_name: inputField["user-first-name"].value,
    last_name: inputField["user-last-name"].value,
  };
  const newUsers = [...users,newUser]
    users.length = 0;
  users.push(...newUsers)
  closeModal()

  addingUsers()

});
addingUsers();
