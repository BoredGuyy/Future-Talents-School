function isLoggedIn() {
  let users = JSON.parse(localStorage.getItem("users"));

  let check = true;

  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive == true) {
      check = false;
      break;
    }
  }

  if (check) return false;
  else return true;
}

window.onload = function () {
  if (!isLoggedIn()) {
    window.location.href = "Login.html";
  }
};

document.getElementById("add").addEventListener("click", () => {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox");
  overlay.style.display = "block";
  dialog.style.display = "block";
});

function showDialog() {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox-modify");
  overlay.style.display = "block";
  dialog.style.display = "block";
}

// close dialog
function closeDialog() {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox");
  overlay.style.display = "none";
  dialog.style.display = "none";
}

function closeDialogModify() {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox-modify");
  overlay.style.display = "none";
  dialog.style.display = "none";
}

//close difficultes modul
document.getElementById("close-diff").addEventListener("click", () => {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox-difficulte");
  overlay.style.display = "none";
  dialog.style.display = "none";
});

//logout button
document.getElementById("logout").addEventListener("click", () => {
  let users = [];

  users = JSON.parse(localStorage.getItem("users"));

  let user;

  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive == true) {
      users[i].isActive = false;
      user = users[i];
      break;
    }
  }

  if (user) {
    users.push("user");
    localStorage.setItem("users", JSON.stringify(users));
  }
});

//when the page load
//show username
let username = document.getElementById("user-name");

let users = [];
let user = null;

users = JSON.parse(localStorage.getItem("users"));

for (let i = 0; i < users.length; i++) {
  if (users[i].isActive == true) {
    username.textContent = "Bienvenue " + users[i].name;
    user = users[i];
    break;
  }
}

//add difficulty
document.getElementById("ajouter").addEventListener("click", () => {
  //get formateur value
  var selectFormateurElement = document.getElementById("formateurs");
  var selectedFormateurOption =
    selectFormateurElement.options[selectFormateurElement.selectedIndex];
  var selectedFormateurValue = selectedFormateurOption.value;

  //get bootcamp value
  var selectBootcampElement = document.getElementById("bootcamps");
  var selectedBootcampOption =
    selectBootcampElement.options[selectBootcampElement.selectedIndex];
  var selectedBootcampValue = selectedBootcampOption.value;

  var titre = document.getElementById("titre").value;
  var brief = document.getElementById("brief").value;
  var txt = document.getElementById("difficulte").value;

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var date = day + "/" + month + "/" + year;

  //check if input fields are empty
  if (titre == "") {
    document.getElementById("titre-error").innerHTML = "* Champ obligatoire";
    return;
  }
  if (brief == "") {
    document.getElementById("brief-error").innerHTML = "* Champ obligatoire";
    return;
  }
  if (txt == "") {
    document.getElementById("msg-error").innerHTML = "* Champ obligatoire";
    return;
  }

  let difficultes = JSON.parse(localStorage.getItem("difficultes")) || [];

  difficulte = {
    id: difficultes.length,
    nom: user.name,
    creation: date,
    formateur: selectedFormateurValue,
    bootcamp: selectedBootcampValue,
    titre: titre,
    brief: brief,
    msg: txt,
    adminProc: false,
    adminResponse: "",
  };

  difficultes.push(difficulte);

  localStorage.setItem("difficultes", JSON.stringify(difficultes));

  document.getElementById("titre").value = "";
  document.getElementById("brief").value = "";
  document.getElementById("difficulte").value = "";

  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  let difficultes = JSON.parse(localStorage.getItem("difficultes")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];

  
    if (!user.isActive) {
      window.location.href = "Login.html";
    }else if (user.isActive && user.isAdmin)
      window.location.href = "Admin-Dashboard.html"

  const table = document.getElementById("data");

  difficultes.sort((a, b) => (new Date(b.creation) - new Date(a.creation)));
  
  difficultes.forEach((diff, index) => {
    if (user.name == difficultes[index].nom){
      const row = table.insertRow();
      row.insertCell(0).textContent = diff.titre;
      row.insertCell(1).textContent = diff.creation;
  
      const showDiff = row.insertCell(2);
      showDiff.innerHTML = `<i class="fa-solid fa-eye" style="color: #000000; cursor: pointer;" data-index="${index}"></i>`;
  
      const valide = row.insertCell(3);
      valide.innerHTML = !difficultes[index].adminProc
        ? `<i class="fa-solid fa-square-xmark" style="color: #ff0000;" data-index="${index}"></i>`
        : `<i class="fa-solid fa-square-check" style="color: #008000;" data-index="${index}"></i>`;
  
      const modify = row.insertCell(4);
      modify.innerHTML = !difficultes[index].adminProc
        ? `<i class="fa-solid fa-pen-to-square" style="color: #3f74fd; cursor: pointer;" data-index="${index}"></i>`
        : `<img src="../Resources/pen-to-square-solid.svg">`;
  
      const deleteButton = row.insertCell(5);
      deleteButton.innerHTML = !difficultes[index].adminProc
        ? `<i class="fa-solid fa-trash-can" style="color: #ff0000; cursor: pointer;" data-index="${index}"></i>`
        : `<img src="../Resources/trash-can-solid.svg">`;
  
    }
  });

  table.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("fa-eye")) {
      const index = target.getAttribute("data-index");
      showMessage(index);
    }
  });

  function showMessage(index) {
    var overlay = document.getElementById("dialogOverlay");
    var dialog = document.getElementById("dialogBox-difficulte");
    overlay.style.display = "block";
    dialog.style.display = "block";

    let name = document.getElementById("formateur-name");
    let bootcamp = document.getElementById("bootcamp-name");
    let title = document.getElementById("title-answer");
    let brief = document.getElementById("brief-name");
    let diff = document.getElementById("diff-answer");
    let solution = document.getElementById("admin-answer");

    let data = JSON.parse(localStorage.getItem("difficultes"));

    for (let i = 0; i < data.length; i++) {
      if (i == index) {
        name.innerHTML = data[i].formateur;
        bootcamp.innerHTML = data[i].bootcamp.toUpperCase();
        title.innerHTML = data[i].titre;
        brief.innerHTML = data[i].brief;
        diff.innerHTML = data[i].msg;
        solution.innerHTML = data[i].adminResponse;
        break;
      }
    }
  }

  table.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("fa-pen-to-square")) {
      const index = target.getAttribute("data-index");
      modfiyDifficulty(index);
    }
  });

  //modification
  function modfiyDifficulty(index) {
    var overlay = document.getElementById("dialogOverlay");
    var dialog = document.getElementById("dialogBox-modify");
    overlay.style.display = "block";
    dialog.style.display = "block";

    let data = JSON.parse(localStorage.getItem("difficultes")) || [];
    
    for (let i = 0; i < data.length; i++) {
      if (i == index) {
        var titre = document.getElementById("titre-modification").value = data[i].titre;
      var brief = document.getElementById("brief-modification").value = data[i].brief;
      var difficulte = document.getElementById("difficulte-modification").value = data[i].msg;
        data[i].titre = titre;
        data[i].brief = brief;
        data[i].msg = difficulte;
        break;
      }
    }

    document.getElementById("modifier").addEventListener("click", () => {
      var titre = document.getElementById("titre-modification").value;
      var brief = document.getElementById("brief-modification").value;
      var difficulte = document.getElementById("difficulte-modification").value;
      

      if (titre == "") {
        document.getElementById("titre-modif-error").innerHTML =
          "* Champ obligatoire";
        return;
      }
      if (brief == "") {
        document.getElementById("brief-modif-error").innerHTML =
          "* Champ obligatoire";
        return;
      }
      if (difficulte == "") {
        document.getElementById("msg-modif-error").innerHTML =
          "* Champ obligatoire";
        return;
      }

      for (let i = 0; i < data.length; i++) {
        if (i == index) {
          data[i].titre = titre;
          data[i].brief = brief;
          data[i].msg = difficulte;
          break;
        }
      }
      localStorage.setItem("difficultes", JSON.stringify(data));
      location.reload();
    });
  }

  //delete icon
  table.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("fa-trash-can")) {
      const index = target.getAttribute("data-index");
      deleteDifficulty(index);
    }
  });

  function deleteDifficulty(index) {
    var overlay = document.getElementById("dialogOverlay");
    var dialog = document.getElementById("dialogBox-confirmation");
    overlay.style.display = "block";
    dialog.style.display = "block";

    document.getElementById("true").addEventListener("click", () => {
      let data = JSON.parse(localStorage.getItem("difficultes")) || [];
      data.splice(index, 1);

      localStorage.setItem("difficultes", JSON.stringify(data));
      location.reload();
    });
  }
});

document.getElementById("false").addEventListener("click", () => {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox-confirmation");
  overlay.style.display = "none";
  dialog.style.display = "none";
});
