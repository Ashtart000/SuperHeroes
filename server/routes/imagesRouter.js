const { Router } = require('express');
const ImagesController = require('../controllers/images.controller')

imagesRouter = Router();

imagesRouter.get('/', ImagesController.getAllImages);

module.exports = imagesRouter;