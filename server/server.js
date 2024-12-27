let express = require('express');
let mongoose = require('mongoose')
let cancionesRoutes = require('./routes/cancionesRoutes')
let app = express();
let port = 3000;
let cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

async function connectDB(){
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/music', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Conexión a la base de datos exitosa");
    }catch(err){
        console.error("Error en la conexión a BD",err);
        process.exit(1);
    }
}
connectDB();

app.use('/canciones',cancionesRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/canciones/`);
});

const Cancion = require('./models/cancion');

app.post('/api/canciones', async (req, res) => {
    const { nombre, artista, url_video } = req.body;
    const cancion = new Cancion({ nombre, artista, url_video, votos: 0 });
    
    try {
        await cancion.save();
        res.status(201).json(cancion);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al guardar la canción' });
    }
});

app.get('/api/canciones', async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.json(canciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener canciones' });
    }
});

app.get('/api/canciones/aleatoria', async (req, res) => {
    try {
        const cancion = await Cancion.aggregate([{ $sample: { size: 1 } }]);
        res.json(cancion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener canción aleatoria' });
    }
});

app.post('/api/canciones/:id/votar', async (req, res) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        if (!cancion) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        cancion.votos = (cancion.votos || 0) + 1;
        await cancion.save();
        res.json(cancion);
    } catch (error) {
        res.status(500).json({ message: 'Error al votar' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

