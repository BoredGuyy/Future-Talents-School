// Stop user from coming to the index page without signing in
function isLoggedIn() {
  let users = JSON.parse(localStorage.getItem("users"));

  let check = true;

  for (let i = 0; i < users.length; i++)
  {
    if (users[i].isActive == true)
    {
      check = false;
      break;
    }
  }

  if (check)
    return true;
  else
    return false;
}

window.onload = function() {
  if (!isLoggedIn()) {
    window.location.href = "Student-Dashboard.html";
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function togglePassword() {
  var x = document.getElementById("form-input-password");
  const passwordToggle = document.querySelector(".password-toggle");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

document.getElementById("form-btn").addEventListener("click", (e) => {

  e.preventDefault();

  const name = document.getElementById("form-input").value;
  const email = document.getElementById("form-email").value;
  const password = document.getElementById("form-input-password").value;

  if (name.trim() === '') {
    let errorMessage = document.getElementById("nom-error");
    errorMessage.textContent = "*Champ obligatoire";
    return false;
  }

  if (email.trim() === '') {
    let errorMessage = document.getElementById("email-error");
    errorMessage.textContent = "*Champ obligatoire";
    return false;
  } else if (!emailPattern.test(email)) {
    let errorMessage = document.getElementById("email-error");
    errorMessage.textContent = "*invalid email syntax";
    return false;
  }

  if (password.trim() === '') {
    let errorMessage = document.getElementById("password-error");
    errorMessage.textContent = "*Champ obligatoire";
    return false;
  }

  let users = [];

  users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++)
  {
    if (users[i].email === email)
    {
      alert("Email already used!");
      document.getElementById("form-email").value = "";
      return;
    }
  }

  let newUser = {
    id: users.length,
    name: name,
    email: email,
    password: password,
    isActive: false,
    isAdmin: false
  }

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signed up successfuly Please Login");

  window.location.href = "Login.html";
})