// password.js
 
export function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}
 
export function validatePasswordField(input, container) {
  if (input.value !== "" && !isValidPassword(input.value)) {
    input.classList.add("form-input--error");
    let errorEl = document.getElementById("password-error");
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.id = "password-error";
      errorEl.className = "form-error";
      container.appendChild(errorEl);
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
 
// Solo eventos de formato (blur e input), nunca el click del botón
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput   = document.getElementById("password");
  const errorsContainer = document.querySelector(".login-form");
 
  passwordInput.addEventListener("blur",  () => validatePasswordField(passwordInput, errorsContainer));
  passwordInput.addEventListener("input", () => validatePasswordField(passwordInput, errorsContainer));
});
 