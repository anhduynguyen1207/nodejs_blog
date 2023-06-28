const express = require('express');
var router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/create', newsController.create);
router.post('/store', newsController.store);
router.get('/:id/edit', newsController.edit);
router.post('/handle-form', newsController.handleform);
router.put('/:id', newsController.update);
router.patch('/:id/restore', newsController.restore);
router.delete('/:id', newsController.delete);
router.delete('/:id/force', newsController.forceDelete);
router.get('/:slug', newsController.detail);
router.get('/', newsController.index);

module.exports = router;