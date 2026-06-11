function isValidPassword(password) {
    return password.length >= 8 && /\d/.test(password);
}

function validatePasswordField(input, container) {
    if (input.value !== "" && !isValidPassword(input.value)) {
        input.classList.add("form-input--error");

        let errorEl = document.getElementById("password-error");
        if (!errorEl) {
            errorEl = document.createElement("p");
            errorEl.id = "password-error";
            errorEl.className = "form-error";
            container.insertAdjacentElement("afterend", errorEl);
        }

        const errors = [];
        if (input.value.length < 8) errors.push("mínimo 8 caracteres");
        if (!/\d/.test(input.value)) errors.push("al menos 1 dígito");
        errorEl.textContent = `La contraseña necesita: ${errors.join(" y ")}.`;
        errorEl.style.display = "block";
        return false;
    }

    input.classList.remove("form-input--error");
    const errorEl = document.getElementById("password-error");
    if (errorEl) errorEl.style.display = "none";
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const btnLogin = document.querySelector(".btn-login");

    passwordInput.addEventListener("blur", () => validatePasswordField(passwordInput, btnLogin));
    passwordInput.addEventListener("input", () => validatePasswordField(passwordInput, btnLogin));

    btnLogin.addEventListener("click", () => {
        if (!validatePasswordField(passwordInput, btnLogin)) return;
        console.log("Contraseña válida, procediendo...");
    });
});