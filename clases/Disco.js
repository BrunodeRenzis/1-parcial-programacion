class Disco {
    constructor(nombre, artista, id) {
        this.nombre = nombre;
        this.artista = artista;
        this.id = id;
        this.portada = "../assets/disco.png";
        this.pistas = [];
    }

    agregarPista(nombre, duracion) {
        this.pistas.push(new Pista(nombre, duracion));
    }

    obtenerDuracionTotal() {
        return this.pistas.reduce((total, pista) => total + pista.duracion, 0);
    }

    obtenerDuracionPromedio() {
        return this.obtenerDuracionTotal() / this.pistas.length;
    }

    obtenerPistaMasLarga() {
        return this.pistas.reduce((maxPista, pista) => (pista.duracion > maxPista.duracion ? pista : maxPista), this.pistas[0]);
    }

    obtenerCantidadPistas() {
        return this.pistas.length;
    }
    
    obtenerDuracionTotalFormateada() {
        let duracionTotalSegundos = this.obtenerDuracionTotal();
        return this.formatDuracion(duracionTotalSegundos);
    }

    obtenerDuracionPromedioFormateada() {
        let duracionPromedioSegundos = this.obtenerDuracionPromedio();
        return this.formatDuracion(duracionPromedioSegundos);
    }

    formatDuracion(duracion) {
        let horas = Math.floor(duracion / 3600);
        let minutos = Math.floor((duracion % 3600) / 60);
        let segundos = duracion % 60;
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
}
