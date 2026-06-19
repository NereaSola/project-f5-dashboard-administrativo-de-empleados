// password.js
 
export function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}
 
export function validatePasswordField(input, container) {
  const value = input.value.trim();

  // 1. Buscamos o creamos el contenedor del error para la contraseña
  let errorEl = document.getElementById("password-error");
  if (!errorEl && container) {
    errorEl = document.createElement("p");
    errorEl.id = "password-error";
    errorEl.className = "form-error";
    container.appendChild(errorEl);
  }

  // 2. CASO A: El campo está completamente vacío
  if (value === "") {
    input.classList.add("form-input--error");
    if (errorEl) {
      errorEl.textContent = "⚠️ El campo de contraseña es obligatorio.";
      errorEl.style.display = "block";
    }
    return false; // Validación fallida
  }

  // 3. CASO B: Tiene texto pero no cumple los requisitos de seguridad
  if (!isValidPassword(value)) {
    input.classList.add("form-input--error");
    
    const errors = [];
    if (value.length < 8) errors.push("mínimo 8 caracteres");
    if (!/\d/.test(value)) errors.push("al menos 1 dígito");
    
    if (errorEl) {
      errorEl.textContent = `La contraseña necesita: ${errors.join(" y ")}.`;
      errorEl.style.display = "block";
    }
    return false; // Validación fallida
  }

  // 4. CASO C: Todo correcto
  input.classList.remove("form-input--error");
  if (errorEl) errorEl.style.display = "none";
  return true;
}
 
// Solo eventos de formato (blur e input), nunca el click del botón
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput   = document.getElementById("password");
  const errorsContainer = document.querySelector(".login-form");
 
  if (passwordInput && errorsContainer) {
    passwordInput.addEventListener("blur",  () => validatePasswordField(passwordInput, errorsContainer));
    passwordInput.addEventListener("input", () => validatePasswordField(passwordInput, errorsContainer));
  }
});
 