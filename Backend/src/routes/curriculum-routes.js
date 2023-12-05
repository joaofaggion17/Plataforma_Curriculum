const express = require('express');
const curriculumController = require('../controllers/curriculum-controller');
const login = require('../middlewares/login-middleware');
const roles = require('../middlewares/roles-middleware');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        nome: Joi.string().allow('').optional(),
        email: Joi.string().allow('').optional(),
        telefone: Joi.string().allow('').optional(),
        cidade: Joi.string().allow('').optional(),
        curso: Joi.string().allow('').optional(),
        instituicao: Joi.string().allow('').optional()
    })
}), login.verifyToken, roles.adminRole, curriculumController.getAllCurriculum);

router.post('/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id_aluno: Joi.number().required(),
        nome: Joi.string().required(),
        data_nascimento: Joi.any(),
        email: Joi.string().required(),
        telefone: Joi.string().required(),
        genero: Joi.any(),
        rg: Joi.string().required(),
        cpf: Joi.string().required(),
        endereco: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        cep: Joi.string().required(),
        curso: Joi.string().required(),
        instituicao: Joi.string().required(),
        data_inicio: Joi.string().required(),
        data_termino: Joi.string().required(),
        habilidades: Joi.string().required(),
        experiencia: Joi.string().required(),
        atividades_extras: Joi.string().required()
    })
}), login.verifyToken, roles.alunoRole, curriculumController.createCurriculum);

router.patch('/update/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        id_aluno: Joi.number().required(),
        nome: Joi.string().required(),
        data_nascimento: Joi.string().required(),
        email: Joi.string().required(),
        telefone: Joi.string().required(),
        genero: Joi.string().required().valid('Masculino', 'Feminino', 'Outro'),
        rg: Joi.string().required(),
        cpf: Joi.string().required(),
        endereco: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        cep: Joi.string().required(),
        curso: Joi.string().required(),
        instituicao: Joi.string().required(),
        ano_inicio: Joi.string().required(),
        ano_termino: Joi.string().required(),
        habilidades: Joi.string().required(),
        experiencia: Joi.string().required(),
        atividades_extras: Joi.string().required()
    })
}), login.verifyToken, roles.alunoRole, curriculumController.updateCurriculum);

router.delete('/delete/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), login.verifyToken, roles.alunoRole, curriculumController.deleteCurriculum);

router.use(errors());

module.exports = router;