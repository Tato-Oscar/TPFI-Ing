document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // asi el formulario no recarga la página


  // Obtiene los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const contacto = document.getElementById("contacto").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();
  const terms = document.getElementById("terms").checked;
  const msg = document.getElementById("msg");


  // Limpia mensajes previos
  msg.textContent = "";
  msg.style.color = "red";


  // Validaciones básicas antes de enviar
  if (!terms) {
    msg.textContent = "Debes aceptar los términos y condiciones.";
    return;
  }


  if (password !== confirmar) {
    msg.textContent = "Las contraseñas no coinciden.";
    return;
  }


  // Crea el objeto con los datos a enviar al servidor
  const data = { nombre, contacto, password };


  try {
    // Envía los datos al servidor mediante una petición POST
    const response = await fetch("http://localhost:8080/api/addCliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });


    const result = await response.json();


    if (result.response === "OK") {
      msg.style.color = "green";
      msg.textContent = "Registro exitoso. Redirigiendo al login...";
      setTimeout(() => {
        window.location.href = "loginClient.html";
      }, 2000);
    } else {
      msg.textContent = result.message || "Error al registrar.";
    }


  } catch (error) {
    console.error(error);
    msg.textContent = "Error al conectar con el servidor.";
  }
});
