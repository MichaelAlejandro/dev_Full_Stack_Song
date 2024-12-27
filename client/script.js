let nombre = document.getElementById("nombre");
let artista = document.getElementById("artista");
let url = document.getElementById("url");
let guardar = document.getElementById("guardar");
let cancionAleatoria = document.getElementById('cancionAleatoria');
let cancionInfo = document.getElementById('cancionInfo');
let nombreError = document.getElementById("nombreError");
let artistaError = document.getElementById("artistaError");
let urlError = document.getElementById("urlError");

function validarURLYouTube(url) {
    let regexYoutube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regexYoutube.test(url);
}

function validarFormulario() {
    let esValido = true;
    
    if (!nombre.value.trim()) {
        nombreError.style.display = "block";
        esValido = false;
    } else {
        nombreError.style.display = "none";
    }
    
    if (!artista.value.trim()) {
        artistaError.style.display = "block";
        esValido = false;
    } else {
        artistaError.style.display = "none";
    }
    
    if (!url.value.trim() || !validarURLYouTube(url.value)) {
        urlError.style.display = "block";
        esValido = false;
    } else {
        urlError.style.display = "none";
    }
    
    return esValido;
}

guardar.addEventListener("click", async () => {
    if (!validarFormulario()) {
        return;
    }

    let body = JSON.stringify({
        nombre: nombre.value.trim(),
        artista: artista.value.trim(),
        url_video: url.value.trim(),
        votos: 0
    });

    try {
        let response = await fetch('http://localhost:3000/api/canciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });

        if (response.status == 201) {
            let cancion = await response.json();
            console.log("Canción guardada:", cancion);
            limpiarFormulario();
            cargarCanciones();
        }
    } catch (error) {
        console.log("Error al guardar la canción:", error);
    }
});

cancionAleatoria.addEventListener('click', async () => {
    try {
        let response = await fetch('http://localhost:3000/api/canciones/aleatoria');
        let cancion = await response.json();
        
        if (cancion && cancion[0]) {
            mostrarCancionAleatoria(cancion[0]);
        }
    } catch (error) {
        console.log("Error al obtener canción aleatoria:", error);
    }
});

async function votarCancion(idCancion) {
    try {
        let response = await fetch(`http://localhost:3000/api/canciones/${idCancion}/votar`, {
            method: 'POST'
        });
        
        if (response.ok) {
            let cancionActualizada = await response.json();
            actualizarVotos(idCancion, cancionActualizada.votos);
        }
    } catch (error) {
        console.log("Error al votar:", error);
    }
}

function limpiarFormulario() {
    nombre.value = "";
    artista.value = "";
    url.value = "";
    nombreError.style.display = "none";
    artistaError.style.display = "none";
    urlError.style.display = "none";
}

function mostrarCancionAleatoria(cancion) {
    cancionInfo.style.display = "block";
    document.getElementById('cancionNombre').textContent = `Canción: ${cancion.nombre}`;
    document.getElementById('cancionArtista').textContent = `Artista: ${cancion.artista}`;
    document.getElementById('cancionVideo').href = cancion.url_video;
    document.getElementById('voteCount').textContent = cancion.votos || 0;
    
    document.getElementById('voteButton').onclick = () => votarCancion(cancion._id);
}

function actualizarVotos(idCancion, votos) {
    let contadorVotos = document.querySelector(`[data-cancion-id="${idCancion}"] .contador-votos`);
    if (contadorVotos) {
        contadorVotos.textContent = `Votos: ${votos}`;
    }
}

async function cargarCanciones() {
    try {
        let response = await fetch('http://localhost:3000/api/canciones');
        let canciones = await response.json();
        mostrarCanciones(canciones);
    } catch (error) {
        console.log("Error al cargar las canciones:", error);
    }
}

function mostrarCanciones(canciones) {
    let listaCanciones = document.getElementById('listaCanciones');
    
    canciones.forEach(cancion => {
        let elementoCancion = document.createElement('div');
        elementoCancion.className = 'song-card';
        elementoCancion.setAttribute('data-cancion-id', cancion._id);
        
        elementoCancion.innerHTML = `
            <h3>${cancion.nombre}</h3>
            <p>Artista: ${cancion.artista}</p>
            <div class="vote-section">
                <button onclick="votarCancion('${cancion._id}')">Votar</button>
                <span class="contador-votos">Votos: ${cancion.votos || 0}</span>
            </div>
            <a href="${cancion.url_video}" target="_blank" class="video-link">Ver Video</a>
        `;
        
        listaCanciones.appendChild(elementoCancion);
    });
}

cargarCanciones();