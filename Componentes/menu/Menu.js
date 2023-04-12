

    const ComponenteMnu = document.getElementById("ComponenteMnu")
    ComponenteMnu.innerHTML = `
        <nav>
            <input type="checkbox" id="check">
            <label for="check" class="checkbtn">
                <i class="bi bi-list"></i>
            </label>
            <a href="#" class="enlace">
                <img src="../assets/img/logo.png" alt="" class="logo">
            </a>
            <ul>
                <li><a href="/index.html">Información</a></li>
                <li><a href="/Presentacion/Presentacion.html">Presentación</a></li>
                <li><a href="/Contacto/Contacto.html">Contactanos</a></li>
                <li><a href="/CompraPasajes/pasaje.html">Comprar Pasajes</a></li>
                <li><a href="/CheckIn/CheckIn.html">Check-in</a></li>
            </ul>
        </nav>

    `
