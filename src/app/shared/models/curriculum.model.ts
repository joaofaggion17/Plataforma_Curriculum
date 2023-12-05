export interface ICurriculum {
    id?: number;
    id_aluno: number;
    nome: string;
    data_nascimento?: any;
    email: string;
    telefone: string;
    genero?: any;
    rg: string;
    cpf: string;
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
    curso: string;
    instituicao: string;
    data_inicio: Date;
    data_termino: Date;
    habilidades: string;
    experiencia: string;
    atividades_extras: string;
}

export enum IGender {
    Masculino = 'Masculino',
    Feminino = 'Feminono',
    Outro = 'Outro'
}