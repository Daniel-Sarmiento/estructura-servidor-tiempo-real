const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller');
const authMiddleware = require('../middlewares/http/auth.middleware');

router.get('/', authMiddleware.verifyJWT, notificationsController.getAll);
router.get('/:id', authMiddleware.verifyJWT, notificationsController.getById);
router.post('/', authMiddleware.verifyJWT, notificationsController.create)

module.exports = router;