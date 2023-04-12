const BDRESERVAS_URL = "../Bd/Reservas.json"
const BDASIENTOS_URL = "../Bd/AsientosReservados.json"
const letras = ["A","B","C","","D","E","F"]






// (Inicio) crear los asientos =================================================================================
const GenerarAsientos = () => {

    const newSection = document.createElement("section")
    const newH2 = document.createElement("h2")
    newH2.textContent="SELECIONE SU ASIENTO"
    document.querySelector(".divCardAsientos").appendChild(newH2)
    document.querySelector(".divCardAsientos").appendChild(newSection)

    for (let f = 0; f <=6; f++) {
        for(let c = 1; c <= 10; c++){
            //agrega los botones =====================================
            const IndexAsiento = letras[f] + c
            const BtnAsiento = document.createElement("button")
            BtnAsiento.id = IndexAsiento
            BtnAsiento.textContent = IndexAsiento

            //agrega la clases css de asientos =======================
            if (f == 3) {
                BtnAsiento.classList.add("pasillo")
            }else{
                BtnAsiento.classList.add("asientoVacio")
            }
            BtnAsiento.addEventListener("click" , botonOnClick)
            document.querySelector("section").appendChild(BtnAsiento)
        }
    }
}
// (Fin) crear los asientos ***********************************************************************************


let asientoElegido = "";



// (inicio) Seleccionar asientos =============================
const botonOnClick = (e) =>{
    const txtAsiento = document.getElementById("txtAsiento")
    let AsientoAnterior = document.getElementById("txtAsiento").value
    if (e.target.className == "asientoOcupado"){
        alert("Asiento Ocupado Elija Otro")
    }else{
        txtAsiento.value = (e.target.innerHTML);
        
        e.target.classList.add("asientoSeleccionado")
        document.getElementById(AsientoAnterior).classList.remove("asientoSeleccionado")
        asientoElegido = txtAsiento.value;
        console.log(asientoElegido)
    }

}
// (fin) Seleccionar asientos ************************************










// (inicio) enviar busqueda de reserva =============================================================
const FrmBurcarReservaHTML = document.querySelector("#FrmBuscarReserva")
FrmBurcarReservaHTML.addEventListener("submit",(e) => {
    e.preventDefault()
    let txtReservaId = document.querySelector("#txtReservaId").value
    let txtDni = document.querySelector("#txtDni").value
    if (txtReservaId == "" & txtDni == "" ){
        alert("No Se Ingresaron Los Datos Requridos Para la Busqueda")
    }else{
        BuscarReserva(txtReservaId, txtDni)
    }
})
//(fin) enviar busqueda de reserva **************************************************************







// (inicio) buscar reserva y ver =======================================================
const BuscarReserva = (Nro, Dni) => {
    fetch(BDRESERVAS_URL)
        .then(response => response.json())
        .then(Reservas => {
                let HayValores = false
                for(let Reserva of Reservas){
                    if (Reserva.ReservaId == Nro & Reserva.PasajeroDocumento == Dni){
                        GenerarAsientos()
                        document.querySelector("#txtVueloId").value = Reserva.VueloId
                        let str = `
                            <h2>DATOS DEL PASAJERO</h2>
                            <strong>APELLIDO Y NOMBRE:</strong> ${Reserva.PasajeroApellido}, ${Reserva.PasajeroNombre} <br>
                            <strong>DNI:</strong> ${Reserva.PasajeroDocumento} <br>
                            <H2>DATOS DEL VUELO</H2>
                            <strong>CÓD. DE VUELO:</strong> ${Reserva.VueloId} <br>
                            <strong>ORIGEN:</strong> ${Reserva.VueloOrigen} <br>
                            <strong>DESTINO:</strong> ${Reserva.VueloDestino} <br>
                            <strong>PARTIDA:</strong> ${Reserva.VueloFechaHora} <br>
                            <strong>SECTOR DE ABORDAJE:</strong> ${Reserva.VueloSectorAbordaje} <br>
                            <strong>ESTADO:</strong> ${Reserva.VueloEstado} <br>
                        `
                        document.querySelector("#DatosReserva").innerHTML=str
                        HayValores=true
                        asientoElegido = Reserva.ReservaAsiento
                        break
                    }
                }
                if (HayValores==true) {
                    document.querySelector("#btnBuscarReserva").hidden=true
                    VerAsientosOcupados(document.querySelector("#txtVueloId").value)
                    document.querySelector("#btnConfirmarAsiento").hidden=false
                }else{
                    alert("No Se Encontro La Reserva Indicada")
                }
        })
}
//(fin) buscar reserva y ver ***********************************************************






// (inicio) muestra asientos ocupados =============================
const VerAsientosOcupados = (Vuelo) =>{
    fetch(BDRESERVAS_URL)
    .then(response => response.json())
    .then(Pasajeros => {
        for(Pasajero of Pasajeros){
            if(Pasajero.VueloId == Vuelo & Pasajero.ReservaAsiento !== "" ){
                if (Pasajero.ReservaId == document.getElementById("txtReservaId").value){
                    document.getElementById(Pasajero.ReservaAsiento).classList.add("asientoSeleccionado")
                    document.getElementById("txtAsiento").value = Pasajero.ReservaAsiento
                }else{
                    document.getElementById(Pasajero.ReservaAsiento).classList.add("asientoOcupado")
                    document.getElementById(Pasajero.ReservaAsiento).classList.remove("asientoVacio")
                }
            }
         }
    })
}

// (fin) muestra asientos ocupados *******************************





const btnConfirmarAsiento = (e) =>{
    // e.preventDefault()
    let txtReservaId = document.querySelector("#txtReservaId").value
    let txtDni = document.querySelector("#txtDni").value
    let txtAsiento = document.querySelector("#txtAsiento").value
    if (txtReservaId == "" || txtDni == "" || txtAsiento == ""){
        alert("Faltan Algunos de Estos Datos. (Dni - Número de Reserva - Seleccionar un Asiento")
    }else{
        alert ("Se ha Confirmado Correctamente Su Check-IN")
        MostrarBoletoAbordaje(txtReservaId)
        //location.reload();
    }
}

const MostrarBoletoAbordaje = (CodigoReserva) =>{
    fetch(BDRESERVAS_URL)
    .then(response => response.json())
    .then(Reservas => {

        for(let Reserva of Reservas){
            if (Reserva.ReservaId == CodigoReserva){

                const BoletoHTML = document.querySelector("body")
                BoletoHTML.innerHTML = `
                    <div class="ticket Principal">
                        <div class="punteado">
                            <img alt='Barcode Generator TEC-IT'
                            src='https://barcode.tec-it.com/barcode.ashx?data=${Reserva.VueloId}&translate-esc=true'/>
                        </div>
                        <div>
                            <img class="logo" src="../assets/img/logo.png" alt="logo de vuela ya">
                        </div>
                        <div class="vuelo"> 
                            <strong>Vuelo N°:</strong> ${Reserva.VueloId} 
                        </div>
                        <div> 
                            <strong>Apellido y Nombre:</strong> ${Reserva.PasajeroApellido} ${Reserva.PasajeroNombre}  
                        </div>
                        <div>
                            <strong>Documento</strong>: ${Reserva.PasajeroDocumento}  
                        </div>
                        <div>
                            <strong>Abordaje:</strong> ${Reserva.VueloFechaHora} 
                        </div>
                        <div>
                            <strong>Origen:</strong> ${Reserva.VueloOrigen} 
                            <strong>Destino:</strong> ${Reserva.VueloDestino} 
                        </div>
                        <div>
                            <strong>Asiento:</strong> ${asientoElegido} 
                        </div>
                        <div>
                            <strong>Puerta:</strong> ${Reserva.VueloSectorAbordaje} 
                        </div>
                        <div class="codBarras">
                                <img alt='Barcode Generator TEC-IT'
                                    src='https://barcode.tec-it.com/barcode.ashx?data=${Reserva.VueloId}&translate-esc=true'/>
                        </div>

                        <div class="Botones"> 
                             <button class="btn btnVerde" onclick ="btnImprimirTicket_Click()">Imprimir</button>
                        </<div>
                    </div>
                `
            }
            break
        }

    })


}


const btnImprimirTicket_Click = () =>{
    alert("Imprimiendo... Gracias!!! Que tengas un buen viaje")
    location.reload();
}


