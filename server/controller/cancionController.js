let Cancion = require('../models/cancion');

exports.agregarCancion = async (req,res)=>{
    console.log("REQUEST RECIBIDO "+req.body);
    const {nombre,artista,url_video} = req.body;
    const cancion = new Cancion({nombre,artista,url_video});
    try{
        await cancion.save();
        console.log("CANCIÓN GUARDADA: "+cancion);
        res.status(201).json(cancion);
    }catch(error){
        console.error(error);
        res.status(400).json({message: 'Error al guardar la canción'})
    }
}

exports.obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.status(200).json(canciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting songs' });
    }
};

exports.obtenerCancionAleatoria = async (req, res) => {
    try {
        const cancion = await Cancion.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(cancion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting random song' });
    }
};

exports.votarCancion = async (req, res) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        if (!cancion) {
            return res.status(404).json({ message: 'Song not found' });
        }
        
        cancion.votes = (cancion.votes || 0) + 1;
        await cancion.save();
        
        res.status(200).json(cancion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error voting for song' });
    }
};