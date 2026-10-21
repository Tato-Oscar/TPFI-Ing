const form = document.getElementById('resetPasswordForm');
const idInput = document.getElementById('id');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmarPassword');
const resultado = document.getElementById('resultado');

// El enlace desde el login puede incluir el correo ya escrito.
const params = new URLSearchParams(window.location.search);
const idRecibido = params.get('id');
if (idRecibido) {
  idInput.value = idRecibido;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultado.style.color = 'red';
  resultado.textContent = '';

  const id = idInput.value.trim();
  const password = passwordInput.value;
  const confirmarPassword = confirmInput.value;

  if (!id || !password || !confirmarPassword) {
    resultado.textContent = 'Debe completar el correo electrónico y ambos campos de contraseña.';
    return;
  }

  if (password !== confirmarPassword) {
    resultado.textContent = 'Las contraseñas no coinciden.';
    confirmInput.focus();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch('http://localhost:8080/api/resetCliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    });
    const result = await response.json();

    if (!response.ok || result.response !== 'OK') {
      resultado.textContent = result.message || 'No se pudo actualizar la contraseña.';
      submitButton.disabled = false;
      return;
    }

    resultado.style.color = 'green';
    resultado.textContent = 'Contraseña actualizada correctamente. Ya puede iniciar sesión.';
    passwordInput.value = '';
    confirmInput.value = '';
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    resultado.textContent = 'Error al conectar con el servidor. Inténtelo nuevamente.';
    submitButton.disabled = false;
  }
});
