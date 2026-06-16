document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("loggedUser")) {
    window.location.href = "./"; // ajusta la ruta
    return;
  }

  // resto del código del dashboard
});