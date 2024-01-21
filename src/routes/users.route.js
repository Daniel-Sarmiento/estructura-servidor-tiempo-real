const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/http/auth.middleware');

router.get('/:id', authMiddleware.verifyJWT, usersController.getById);
router.post('/', usersController.create);
router.delete('/', (req, res) => res.json({m: 1}));

module.exports = router;