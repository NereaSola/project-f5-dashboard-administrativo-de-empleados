// authservice.js — Obtiene las credenciales del JSON y las compara

export async function checkCredentials(emailInput, passwordInput) {
    const response = await fetch("../../db/data.json");
    const data = await response.json();

    const { email, password } = data.credentials;

    console.log("Datos introducidos:", emailInput, passwordInput);
    console.log("Datos del JSON:", email, password);

    if (emailInput === email && passwordInput === password) {
        console.log("✅ Login correcto. Bienvenido!");
        window.location.href = "../../dashboard.html";
        return true;
    } else {
        console.log("❌ Credenciales incorrectas.");
        return false;
    }
}
