'use strict'

let discos = [];

function cargar() {
    let nombreDisco = prompt("Ingrese el nombre del disco:");
    while(nombreDisco.length<1){
        nombreDisco = prompt("No se ha ingresado dato alguno, Ingrese el nombre del disco:");
    }
    let artista = prompt("Ingrese el nombre del artista o banda:");
    while(artista.length<1){
        artista = prompt("No se ha ingresado dato alguno, Ingrese el nombre del artista:");
    }
    let id = prompt("Ingrese un código numérico único del disco:");

    while (idExistente(id) || isNaN(parseInt(id)) || (id < 1 || id > 999)) {
        id = prompt("El código ingresado ya existe o no es válido. Ingrese otro código:");
    }

    let disco = new Disco(nombreDisco, artista, id);

    let cargarPista = true;
    while (cargarPista) {
        let nombrePista = prompt("Ingrese el nombre de la pista:");
        while(nombrePista.length<1){
            nombrePista = prompt("Ha ingresado mal el nombre de la pista, ingrese nuevamente:");
        }
        let duracion = parseInt(prompt("Ingrese la duración de la pista en segundos:"));

        while (isNaN(duracion) || duracion < 0 || duracion > 7200) {
            duracion = parseInt(prompt("Duración inválida. Ingrese la duración de la pista en segundos:"));
        }

        disco.agregarPista(nombrePista, duracion);

        cargarPista = confirm("¿Desea ingresar otra pista?");
    }

    discos.push(disco);
}

function idExistente(id) {
    return discos.some(disco => disco.id === id);
}

function obtenerDuracionTotalMasAlta(){
    let duracionMasAlta = 0;
    if(discos.length>0){
        discos.forEach((disco)=>{
            if(disco.obtenerDuracionTotal()>duracionMasAlta){
                duracionMasAlta = disco.obtenerDuracionTotal();
            }
        })
        if(discos.length==1){
            alert("Este disco es el único cargado así que obviamente va a ser el más largo con duración más alta es de: "+formatDuracion(duracionMasAlta));
        }else{
            alert("El disco con duración más alta es de: "+formatDuracion(duracionMasAlta));
        }
    } else{
        alert("No hay discos para saber la duración");
    }
}

function mostrar() {
    let output = document.getElementById("discos");
    output.innerHTML = "";
    if(discos.length>0){
        discos.forEach(disco => {
            let divDisco = document.createElement("div");
            divDisco.classList.add('discoItem')
            divDisco.innerHTML = `<img src=${disco.portada} alt='portada'><br>
                                  <strong>Nombre:</strong> <span>${disco.nombre}</span><br>
                                  <strong>artista/Banda:</strong><span> ${disco.artista}</span><br>
                                  <strong>Código:</strong> <span>${disco.id}</span><br>
                                  <strong>Cantidad de Pistas: ${disco.obtenerCantidadPistas()}</strong><br>
                                  <strong>Duración Total: ${disco.obtenerDuracionTotalFormateada()}</strong><br>
                                  <strong>Promedio de Duración: ${disco.obtenerDuracionPromedioFormateada()}</strong><br>
                                  <strong>Pista más Larga: ${disco.obtenerPistaMasLarga().nombre} ${disco.formatDuracion(disco.obtenerPistaMasLarga().duracion)}</strong><br>
                                  <strong>Lista pistas:</strong><br>`;
            disco.pistas.forEach(pista => {
                let duracion = formatDuracion(pista.duracion);
                let duracionStyle = pista.duracion > 180 ? 'style="color: red;"' : '';
                divDisco.innerHTML += `<span ${duracionStyle}>- ${pista.nombre} (${duracion})</span><br>`;
            });
    
            output.appendChild(divDisco);
        });

        alert(`Se han cargado ${discos.length} discos.`);
    } else{
        alert("No se han cargado discos")
    }
}

function mostrarInfoDiscoPorCodigo() {

    let codigo = document.getElementById("codigoDisco").value;

    let discoEncontrado = discos.find(disco => disco.id === codigo);

    if (discoEncontrado) {
        alert(`Información del Disco con Código ${codigo}:\n` +
        `Nombre: ${discoEncontrado.nombre}\n` +
        `Artista/Banda: ${discoEncontrado.artista}\n` +
        `Cantidad de Pistas: ${discoEncontrado.obtenerCantidadPistas()}\n` +
        `Duración Total: ${discoEncontrado.obtenerDuracionTotalFormateada()}\n` +
        `Promedio de Duración: ${discoEncontrado.obtenerDuracionPromedioFormateada()}\n` +
        `Pista más Larga: ${discoEncontrado.obtenerPistaMasLarga().nombre} (${formatDuracion(discoEncontrado.obtenerPistaMasLarga().duracion)})`);
    } else {
        alert("El código del disco ingresado no coincide con ningún disco cargado.");
    }
}

function formatDuracion(duracion) {
    let minutos = Math.floor(duracion / 60);
    let segundos = duracion % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

