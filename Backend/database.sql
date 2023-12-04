CREATE DATABASE IF NOT EXISTS curriculum;

USE curriculum;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo ENUM('Administrador', 'Aluno') NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS curriculum (
    id INT NOT NULL AUTO_INCREMENT,
    id_aluno INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    rg VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    instituicao VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_termino DATE NOT NULL,
    habilidades VARCHAR(255) NOT NULL,
    experiencia VARCHAR(255) NOT NULL,
    atividades_extras VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_aluno) REFERENCES usuarios(id)
);
