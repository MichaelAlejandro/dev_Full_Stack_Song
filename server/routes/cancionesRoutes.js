let path = require('path');
let express = require('express');
let router = express.Router();
let cancionController = require('../controller/cancionController')

router.use(express.static(path.join(__dirname, '../../client')));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/api/canciones', cancionController.obtenerCanciones);
router.post('/api/canciones', cancionController.agregarCancion);
router.get('/api/canciones/aleatoria', cancionController.obtenerCancionAleatoria);
router.post('/api/canciones/:id/votar', cancionController.votarCancion);

module.exports = router;