//show username
let username = document.getElementById("user-name");

let users = [];

users = JSON.parse(localStorage.getItem("users"));
let user = null;

for (let i = 0; i < users.length; i++) {
  if (users[i].isActive == true) {
    username.textContent = "Bienvenue " + users[i].name;
    user = users[i];
    break;
  }
}

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

document.addEventListener("DOMContentLoaded", () => {
  let difficultes = JSON.parse(localStorage.getItem("difficultes")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];


    if (user.isActive && !user.isAdmin) {
      window.location.href = "Student-Dashboard.html";
    }else if (!user.isActive)
     window.location.href = "Login.html"




  const table = document.getElementById("data");

  difficultes.sort((a, b) => (new Date(b.creation) - new Date(a.creation)));

  difficultes.forEach((diff, index) => {
      if (user.name == diff.formateur) {
        const row = table.insertRow();
        row.insertCell(0).textContent = diff.nom;
        row.insertCell(1).textContent = diff.creation;
        const showDiff = row.insertCell(2);
        showDiff.innerHTML = `<i class="fa-solid fa-eye" style="color: #000000; cursor: pointer;" data-index="${index}" disabled></i>`;
        const valide = row.insertCell(3);
        valide.innerHTML = !difficultes[index].adminProc
          ? `<i class="fa-solid fa-square-xmark" style="color: #ff0000;" data-index="${index}"></i>`
          : `<i class="fa-solid fa-square-check" style="color: #008000;" data-index="${index}"></i>`;
        const answer = row.insertCell(4);
        answer.innerHTML = `<span class="material-symbols-outlined" style="cursor: pointer;" id="check" data-index="${index}">forum</span>`;
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
    let adminAnswer = document.getElementById("admin-answer");

    let data = JSON.parse(localStorage.getItem("difficultes"));

    for (let i = 0; i < data.length; i++) {
      if (i == index) {
        name.innerHTML = data[i].formateur;
        bootcamp.innerHTML = data[i].bootcamp.toUpperCase();
        title.innerHTML = data[i].titre;
        brief.innerHTML = data[i].brief;
        diff.innerHTML = data[i].msg;
        adminAnswer.innerHTML = data[i].adminResponse;
        break;
      }
    }
  }

  table.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("material-symbols-outlined")) {
      const index = target.getAttribute("data-index");
      adminAnswer(index);
    }
  });

  function adminAnswer(index) {
    var overlay = document.getElementById("dialogOverlay");
    var dialog = document.getElementById("dialogBox");
    overlay.style.display = "block";
    dialog.style.display = "block";

    let difficultes = JSON.parse(localStorage.getItem("difficultes")) || [];

    document.getElementById("valide-btn").addEventListener("click", (e) => {
      e.preventDefault();

      let answers = document.getElementsByName("answers");
      let message = document.getElementById("encadre-message").value;

      for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
          if (
            answers[i].value == "Encadré dans leurs recherches de solutions"
          ) {
            if (message == "") {
              document.getElementById("msg-error").textContent =
                "*Champ obligatoire";
              return;
            }
            difficultes[index].adminProc = true;
            difficultes[index].adminResponse = message;

            localStorage.setItem("difficultes", JSON.stringify(difficultes));
            location.reload();
          }
          if (answers[i].value == "Aidé par leurs pairs") {
            difficultes[index].adminProc = true;
            difficultes[index].adminResponse = "Aidé par leurs pairs";

            localStorage.setItem("difficultes", JSON.stringify(difficultes));
            location.reload();
          }
          if (answers[i].value == "intervenetion derecte de formateur") {
            difficultes[index].adminProc = true;
            difficultes[index].adminResponse =
              "intervenetion derecte de formateur";

            localStorage.setItem("difficultes", JSON.stringify(difficultes));
            location.reload();
          }
        }
      }
    });
  }
});

//close modal
function closeDialog() {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox");
  overlay.style.display = "none";
  dialog.style.display = "none";
}

function closeDiff() {
  var overlay = document.getElementById("dialogOverlay");
  var dialog = document.getElementById("dialogBox-difficulte");
  overlay.style.display = "none";
  dialog.style.display = "none";
}
