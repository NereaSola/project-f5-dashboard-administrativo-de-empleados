// btnlogoutevent.js — Responsable del click del botón logout

document.addEventListener("DOMContentLoaded", () => {
    const btnLogout = document.querySelector(".logout-btn");

    btnLogout.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});