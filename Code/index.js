document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users"))

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