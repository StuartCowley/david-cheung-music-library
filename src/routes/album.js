const express = require('express');
const router = express.Router();
const controllers = require('../controllers/album');

router.post('/artists/:id/albums', controllers.createAlbum);
router.get('/albums', controllers.readAlbum);
router.get('/albums/:id', controllers.readSingleAlbum);
router.put('/albums/:id', controllers.updateAlbum);
router.patch('/albums/:id', controllers.patchAlbum);
router.delete('/albums/:id', controllers.deleteAlbum);

module.exports = router;
