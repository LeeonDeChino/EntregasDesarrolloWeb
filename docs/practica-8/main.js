const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");
const $loader = d.querySelector("#loader"); // Referencia al loader


// Función de Validación del Formulario
function validateForm(e) {
  // Cancela el comportamiento por defecto del evento
  e.preventDefault();
  console.log(e);

  //Limpiamos los mensajes de error de los inputs
  $errorsMessages.forEach((el) => {
    el.textContent = "";
  });

  let isValid = true;

  // Validar campo Nombre
let namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
if ($nameInput.value.trim() === "") {
  $nameError.textContent = "El nombre es obligatorio";
  $nameInput.focus();
  isValid = false;
} else if (!namePattern.test($nameInput.value.trim())) {
  $nameError.textContent = "El nombre solo debe contener letras y espacios";
  $nameInput.focus();
  isValid = false;
}

  //Validar campo Correo
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.textContent = "El correo es obligatorio";
    $emailInput.focus();
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.textContent = "El formato del correo es inválido";
    $emailInput.focus();
    isValid = false;
  }

  // Validar campo Contraseña
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if ($passwordInput.value.trim() === "") {
  $passwordError.textContent = "La contraseña es obligatoria";
  $passwordInput.focus();
  isValid = false;
} else if (!passwordPattern.test($passwordInput.value.trim())) {
  $passwordError.textContent =
    "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial";
  $passwordInput.focus();
  isValid = false;
}

  //Validar campo Confirmar Contraseña
  if ($confirmPasswordInput.value.trim() === "") {
    $confirmPasswordError.textContent =
      "Confirmar su contraseña es obligatorio";
    $confirmPasswordInput.focus();
    isValid = false;
  } else if (
    $confirmPasswordInput.value.trim() !== $passwordInput.value.trim()
  ) {
    $confirmPasswordError.textContent =
      "Las contraseñas no coinciden";
    $confirmPasswordInput.focus();
    isValid = false;
  }

  // Si la validación es correcta, mostrar loader y luego enviar el formulario
  if (isValid) {
    $loader.style.display = "block"; // Mostrar loader
    $successMessage.textContent = ""; // Limpiar mensaje de éxito

    setTimeout(() => {
      $loader.style.display = "none"; // Ocultar loader
      $successMessage.textContent = "Formulario enviado exitosamente";
      $form.reset();
    }, 5000);
  }
}

$form.addEventListener("submit", validateForm);