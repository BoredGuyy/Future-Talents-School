document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users"));

  if(!users)
    localStorage.setItem("users", '[{"id":0,"name":"abdelaziz","email":"admin@gmail.com","password":"password","isActive":false,"isAdmin":true},{"id":1,"name":"hamza","email":"hamza@gmail.com","password":"password","isActive":false,"isAdmin":true},{"id":1,"name":"ilyas","email":"ilyas@gmail.com","password":"password","isActive":false,"isAdmin":true}]');

  for (let i = 0; i < users.length; i++){
    if (users[i].isActive && users[i].isAdmin) {
      window.location.href = "Admin-dashboard.html";
      break;
    } else if (users[i].isActive && !users[i].isAdmin) {
      window.location.href = "Student-dashboard.html";
      break;
    }
  }
})