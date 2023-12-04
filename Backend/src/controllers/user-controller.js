const mysql = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    getAllUsers: async (request, response) => {
        try {
            const { id, nome, email, cargo } = request.query;
    
            let query = 
                `SELECT
                    usuarios.id,
                    usuarios.nome,
                    usuarios.email,
                    usuarios.cargo
                FROM usuarios
                WHERE 1=1`;
    
            const params = [];
    
            if (id) {
                query += ` AND usuarios.id = ?`;
                params.push(id);
            }
    
            if (nome) {
                query += ` AND usuarios.nome LIKE ?`;
                params.push(`%${nome}%`);
            }
    
            if (email) {
                query += ` AND usuarios.email LIKE ?`;
                params.push(`%${email}%`);
            }
    
            if (cargo) {
                query += ` AND usuarios.cargo LIKE ?`;
                params.push(`%${cargo}%`);
            }
    
            const [result] = await mysql.execute(query, params);
            return response.status(200).json(result);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    createUser: async (request, response) => {
        try {
            const { nome, email, cargo } = request.body;

            const [usuario_existente] = await mysql.execute('SELECT id FROM usuarios WHERE email = ?', [email]);

            if (usuario_existente.affectedRows > 0) {
                return response.status(409).json({ message: 'Este usuário já está cadastrado' });
            }

            const senha = 'senha123'

            const senhaHash = await bcrypt.hash(senha, 10);

            const query = 
                `INSERT INTO usuarios
                    (nome, email, senha, cargo)
                VALUES
                    (?, ?, ?, ?)`;

            const [result] = await mysql.execute(query, [nome, email, senhaHash, cargo]);

            return response.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    userLogin: async (request, response) => {
        try {
            const { email, senha } = request.body;
    
            const [result] = await mysql.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    
            if (!result || result.length === 0) {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            const user = result[0];
    
            const senha_valida = await bcrypt.compare(senha, user.senha);
    
            if (!senha_valida) {
                return response.status(401).json({ message: 'Usuário ou senha inválidos' });
            }
    
            const token = jwt.sign({
                id: user.id,
                nome: user.nome,
                email: user.email,
                cargo: user.cargo
            }, process.env.JWT_SECRET, {
                expiresIn: '5 days'
            });
    
            return response.status(200).json({ 
                message: 'Autenticado com sucesso', 
                cargo: user.cargo,
                token 
            });
        } catch (error) {
            console.error('Erro ao efetuar login:', error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },    

    identifyUser: async (request, response) => {
        try {
            const authHeader = request.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (token == null) {
                return response.status(401).send("Token não fornecido.");
            }

            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    console.error("Ocorreu um erro ao verificar o token:", error);
                    return response.status(403).send("Token inválido.");
                }
                
                request.user = decoded;
                response.json(decoded);
            });
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    updatePassword: async (request, response) => {
        try {
            const { email, senha_atual, senha_nova } = request.body;
    
            const [result] = await mysql.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    
            if (!result || result.affectedRows === 0) {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            const senha_valida = await bcrypt.compare(senha_atual, result[0].senha);
    
            if (!senha_valida) {
                return response.status(401).json({ message: 'Senha atual inválida' });
            }
    
            if (senha_atual === senha_nova) {
                return response.status(401).json({ message: 'A nova senha deve ser diferente da atual' });
            }
    
            const senhaHash = await bcrypt.hash(senha_nova, 10);
    
            await mysql.execute('UPDATE usuarios SET senha = ? WHERE email = ?', [senhaHash, email]);
            return response.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    updateUser: async (request, response) => {
        try {
            const { nome, email, cargo } = request.body;
    
            const [usuario] = await mysql.execute('SELECT id FROM usuarios WHERE id = ?', [request.params.id]);
    
            if (usuario.length === 0) {
                return response.status(409).json({ message: 'Usuário não encontrado' });
            }
    
            const query = 
                `UPDATE usuarios
                SET nome = ?, email = ?, cargo = ?
                WHERE id = ?`;
    
            await mysql.execute(query, [nome, email, cargo, request.params.id]);
    
            return response.status(201).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },    

    deleteUser: async (request, response) => {
        try {
            const query = 
                `DELETE FROM usuarios
                WHERE id = ?`;
    
            const [result] = await mysql.execute(query, [request.params.id]);
    
            if (!result || result.affectedRows === 0) {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            return response.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    }    

}