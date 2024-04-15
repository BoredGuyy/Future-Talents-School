// Stop user from coming to the index page without signing in
function isLoggedIn() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

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

function togglePassword() {
  var x = document.getElementById("form-input-password");
  const passwordToggle = document.querySelector(".password-toggle");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById("form-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("form-input-email").value;
  const password = document.getElementById("form-input-password").value;

  if (email.trim() === "" && password.trim() === "") {
    let errorMessage = document.getElementById("email-error");
    errorMessage.textContent = "*Champ obligatoire";
    let passwordErrorMessage = document.getElementById("password-error");
    passwordErrorMessage.textContent = "*Champ obligatoire";
    return;
  } else if (email.trim() === "") {
    let errorMessage = document.getElementById("email-error");
    errorMessage.textContent = "*Champ obligatoire";
    return;
  }else if (!emailPattern.test(email)) {
    let errorMessage = document.getElementById("email-error");
    errorMessage.textContent = "*Invalid email syntax";
    return;
  }
   else if (password.trim() === "") {
    let errorMessage = document.getElementById("password-error");
    errorMessage.textContent = "*Champ obligatoire";
    return;
  } 
  
  

  let usersData = JSON.parse(localStorage.getItem("users"));

  let foundUser = null;

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email == email && usersData[i].password == password) {
      foundUser = usersData[i];
      foundUser.isActive = true;
      console.log(foundUser);
      break;
    }
  }

  // Save updated users data back to localStorage
  localStorage.setItem("users", JSON.stringify(usersData));

  if (foundUser) {
    if (foundUser.isAdmin) {
      window.location.href = "Admin-Dashboard.html";
    } else {
      window.location.href = "Student-Dashboard.html";
    }
  } else alert("No match was found");
});
