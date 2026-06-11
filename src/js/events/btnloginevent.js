// btnloginevent.js — Único responsable del click del botón
 
import { validateEmailField }    from "../login/validations/email.js";
import { validatePasswordField } from "../login/validations/password.js";
import { checkCredentials }      from "../authentication/authservice.js";
 
document.addEventListener("DOMContentLoaded", () => {
  const btnLogin        = document.querySelector(".btn-login");
  const emailInput      = document.getElementById("email");
  const passwordInput   = document.getElementById("password");
  const errorsContainer = document.querySelector(".login-form");
 
  btnLogin.addEventListener("click", async () => {
    const emailOk    = validateEmailField(emailInput, errorsContainer);
    const passwordOk = validatePasswordField(passwordInput, errorsContainer);
 
    if (!emailOk || !passwordOk) return;
 
    const email    = emailInput.value.trim();
    const password = passwordInput.value.trim();
 
    await checkCredentials(email, password);
  });
});
 