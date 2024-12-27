let mongoose = require('mongoose');

let cancionesSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    artista: {type: String, required: true},
    url_video: {type: String, required: true},
    votos: { type: Number, default: 0 }
});

let Cancion = mongoose.model('Cancion', cancionesSchema);

module.exports = Cancion;