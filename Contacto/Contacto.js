function mostrarAlerta() {
  // Obtener valores de los inputs
  var input1 = document.getElementById("nombre").value;
  var input2 = document.getElementById("correo").value;
  var input3 = document.getElementById("mensaje").value;

  // Validar si los inputs están vacíos
  if (input1 === "" || input2 === "" || input3 === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Mostrar alerta con los valores de los inputs
  alert("Sus datos y su mensaje han sido recibidos. Gracias!");
  location.reload()
}