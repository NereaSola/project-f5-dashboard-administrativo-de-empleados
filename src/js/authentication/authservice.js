// authservice.js — Obtiene las credenciales del JSON y las compara

export async function checkCredentials(emailInput, passwordInput) {
    try {
        const response = await fetch("../../db/data.json");
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.credentials) {
            throw new Error("Estructura de JSON inválida: Falta el objeto 'credentials'");
        }

        const { email, password } = data.credentials;

        console.log("Datos introducidos:", emailInput, passwordInput);
        console.log("Datos del JSON:", email, password);
        console.log("¿Emails iguales?", emailInput === email);
        console.log("¿Passwords iguales?", passwordInput === password);

        if (emailInput === email && passwordInput === password) {
            console.log("✅ Login correcto. Bienvenido!");
            localStorage.setItem("loggedUser", JSON.stringify({ email: emailInput, isAuth: true }));  //CAMBIO LOCALSTORAGE
            window.location.href = "../../dashboard.html";
            return true;
        } else {
            console.log("❌ Credenciales incorrectas.");
            showAuthError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            return false;
        }

    } catch (error) {
        console.error("Hubo un problema con la autenticación:", error.message);
        showAuthError("Error técnico del sistema. Inténtalo de nuevo más tarde.");
        return false;
    }
}

function showAuthError(message) {
    const errorsContainer = document.querySelector(".login-form");
    if (!errorsContainer) {
        console.error("No se encontró el contenedor '.login-form' en el DOM.");
        return;
    }
    let errorEl = document.getElementById("auth-error");
    if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.id = "auth-error";
        errorEl.className = "form-error";
        errorsContainer.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.style.display = "block";
}