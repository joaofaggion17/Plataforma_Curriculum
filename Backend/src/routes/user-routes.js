const express = require('express');
const userController = require('../controllers/user-controller');
const login = require('../middlewares/login-middleware');
const roles = require('../middlewares/roles-middleware');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number().allow('').optional(),
        nome: Joi.string().allow('').optional(),
        email: Joi.string().allow('').optional(),
        cargo: Joi.string().valid('Administrador', 'Funcionário').allow('').optional()
    })
}), login.verifyToken, roles.adminRole, userController.getAllUsers);

router.post('/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required(),
        cargo: Joi.string().valid('Administrador', 'Aluno')
    })
}), login.verifyToken, roles.adminRole, userController.createUser);

router.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        senha: Joi.string().required()
    })
}), userController.userLogin);

router.post('/identify', userController.identifyUser)

router.patch('/update-password', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().min(3).max(100).required(),
        senha_atual: Joi.string().min(3).max(100).required(),
        senha_nova: Joi.string().min(3).max(100).required()
    })
}), login.verifyToken, userController.updatePassword); 

router.patch('/update/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required(),
        cargo: Joi.string().valid('Administrador', 'Aluno')
    })
}), login.verifyToken, roles.adminRole, userController.updateUser);

router.delete('/delete/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), login.verifyToken, roles.adminRole, userController.deleteUser);

router.use(errors());

module.exports = router;