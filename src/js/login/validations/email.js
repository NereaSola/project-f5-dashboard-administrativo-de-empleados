// email.js
 
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email.trim());
}
 
export function validateEmailField(input, container) {
  const value = input.value.trim();
  
  // 1. Buscamos o creamos el contenedor del error para este campo
  let errorEl = document.getElementById("email-error");
  if (!errorEl && container) {
    errorEl = document.createElement("p");
    errorEl.id = "email-error";
    errorEl.className = "form-error";
    container.appendChild(errorEl);
  }

  // 2. CASO A: El campo está completamente vacío
  if (value === "") {
    input.classList.add("form-input--error");
    if (errorEl) {
      errorEl.textContent = "⚠️ El campo de correo electrónico es obligatorio.";
      errorEl.style.display = "block";
    }
    return false; // Validación fallida
  }

  // 3. CASO B: Tiene texto pero el formato de correo está mal
  if (!isValidEmail(value)) {
    input.classList.add("form-input--error");
    if (errorEl) {
      errorEl.textContent = "El formato del correo no es válido (ej: usuario@dominio.com).";
      errorEl.style.display = "block";
    }
    return false; // Validación fallida
  }

  // 4. CASO C: Todo está perfecto
  input.classList.remove("form-input--error");
  if (errorEl) errorEl.style.display = "none";
  return true;
}
 
// Solo eventos de formato (blur e input), nunca el click del botón
document.addEventListener("DOMContentLoaded", () => {
  const emailInput      = document.getElementById("email");
  const errorsContainer = document.querySelector(".login-form");
 
  if (emailInput && errorsContainer) {
    emailInput.addEventListener("blur",  () => validateEmailField(emailInput, errorsContainer));
    emailInput.addEventListener("input", () => validateEmailField(emailInput, errorsContainer));
  }
});