const formularioPasajeros = document.querySelector("#formularioPasajes")
const contenedorHTML = document.querySelector(".contenedorPasajes")

const pasajes = []

const mostrarPasajeros = () => {
    contenedorHTML.innerHTML = ""

    for(const pasaje of pasajes){
        contenedorHTML.innerHTML += `
        <div class="cardPasaje">
          <img class="logo" src="../assets/img/logo.png" alt="logo de vuela ya">
            <h2>Sus datos de Pasaje: </h2>
            <strong> Nombre Pasajero: ${pasaje.nombre} </strong>
            <strong> Apellido Pasajero: ${pasaje.apellido} </strong>
            <strong> Tipo Documento: ${pasaje.TipoDNI} </strong>
            <strong> Documento: ${pasaje.NumeroDocumento} </strong>
            <h2>Sus Datos de Vuelo: </h2>
            <strong> Origen Vuelo: ${pasaje.origen} </strong>
            <strong> Destino Vuelo: ${pasaje.destino} </strong>
            <strong> Fecha embarque: ${pasaje.fecha} </strong>
            <strong> Horario embarque: ${pasaje.horario} </strong>
        </div>
        `
    }
}

formularioPasajeros.addEventListener("submit", (event) => {
    event.preventDefault()
    pasajes.push({
        nombre: formularioPasajeros.nombre.value,
        apellido: formularioPasajeros.apellido.value,
        TipoDNI: formularioPasajeros.TipoDNI.value,
        NumeroDocumento: formularioPasajeros.NumeroDocumento.value,
        origen: formularioPasajeros.origen.value,
        destino: formularioPasajeros.destino.value,
        fecha: formularioPasajeros.fecha.value,
        horario: formularioPasajeros.horario.value
    })
    mostrarPasajeros();
    limpiarInputs();
})

function validarSelect() {
    var select = document.getElementById("destino");
    var opciones = select.options;
    var valorActual = opciones[select.selectedIndex].value;

    for (var i = 0; i < opciones.length; i++) {
      if (i !== select.selectedIndex && opciones[i].value === valorActual) {
        document.getElementById("error").innerHTML = "¡Error! El origen no puede ser igual al destino.";
        select.selectedIndex = 0;
        break;
      } else {
        document.getElementById("error").innerHTML = "";
      }
    }
  }

  function limpiarInputs() {
    // Obtener todos los elementos input del documento
    const inputs = document.getElementsByTagName("input");
    
    // Iterar sobre cada elemento y establecer su valor en una cadena vacía
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }