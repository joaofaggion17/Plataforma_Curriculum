const mysql = require('../connection');

module.exports = {

    getAllCurriculum: async (request, response) => {
        try {
            const { nome, email, telefone, cidade, curso, instituicao } = request.query;

            let query = `SELECT * FROM curriculum WHERE 1 = 1 `;

            if (nome) {
                query += ` AND nome = '${nome}'`;
            }

            if (email) {
                query += ` AND email = '${email}'`;
            }

            if (telefone) {
                query += ` AND telefone = '${telefone}'`;
            }

            if (cidade) {
                query += ` AND cidade = '${cidade}'`;
            }

            if (curso) {
                query += ` AND curso = '${curso}'`;
            }

            if (instituicao) {
                query += ` AND instituicao = '${instituicao}'`;
            }

            const [result] = await mysql.execute(query);
            return response.status(200).send(result);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    createCurriculum: async (request, response) => {
        try {
            const {id_aluno, data_nascimento, nome, email, telefone, genero, rg, cpf, endereco, cidade, estado, cep, curso, instituicao, data_inicio, data_termino, habilidades, experiencia, atividades_extras  } = request.body;

            const query = `INSERT INTO curriculum (id_aluno, data_nascimento, nome, email, telefone, genero, rg, cpf, endereco, cidade, estado, cep, curso, instituicao, data_inicio, data_termino, habilidades, experiencia, atividades_extras) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const result = await mysql.execute(query, [id_aluno, data_nascimento, nome, email, telefone, genero, rg, cpf, endereco, cidade, estado, cep, curso, instituicao, data_inicio, data_termino, habilidades, experiencia, atividades_extras]);

            return response.status(201).json({ message: 'Curriculum cadastrado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    updateCurriculum: async (request, response) => {
        try {
            const { id } = request.params;
            const { nome, data_nascimento, email, telefone, genero, rg, cpf, endereco, cidade, estado, cep, curso, instituicao, ano_inicio, ano_termino, habilidades, experiencia, atividades_extras } = request.body;

            const query = `UPDATE curriculum SET nome = ?, data_nascimento = ?, email = ?, telefone = ?, genero = ?, rg = ?, cpf = ?, endereco = ?, cidade = ?, estado = ?, cep = ?, curso = ?, instituicao = ?, ano_inicio = ?, ano_termino = ?, habilidades = ?, experiencia = ?, atividades_extras = ? WHERE id = ?`;

            const result = await mysql.execute(query, [nome, data_nascimento, email, telefone, genero, rg, cpf, endereco, cidade, estado, cep, curso, instituicao, ano_inicio, ano_termino, habilidades, experiencia, atividades_extras, id]);

            return response.status(200).json({ message: 'Curriculum atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    deleteCurriculum: async (request, response) => {
        try {
            const { id } = request.params;

            const query = `DELETE FROM curriculum WHERE id = ?`;

            const result = await mysql.execute(query, [id]);

            return response.status(200).json({ message: 'Curriculum deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

}