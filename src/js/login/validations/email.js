// email.js
 
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email.trim());
}
 
export function validateEmailField(input, container) {
  if (input.value !== "" && !isValidEmail(input.value)) {
    input.classList.add("form-input--error");
    let errorEl = document.getElementById("email-error");
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.id = "email-error";
      errorEl.className = "form-error";
      container.appendChild(errorEl);
    }
    errorEl.textContent = "El formato del correo no es válido (ej: usuario@dominio.com).";
    errorEl.style.display = "block";
    return false;
  }
  input.classList.remove("form-input--error");
  const errorEl = document.getElementById("email-error");
  if (errorEl) errorEl.style.display = "none";
  return true;
}
 
// Solo eventos de formato (blur e input), nunca el click del botón
document.addEventListener("DOMContentLoaded", () => {
  const emailInput      = document.getElementById("email");
  const errorsContainer = document.querySelector(".login-form");
 
  emailInput.addEventListener("blur",  () => validateEmailField(emailInput, errorsContainer));
  emailInput.addEventListener("input", () => validateEmailField(emailInput, errorsContainer));
});