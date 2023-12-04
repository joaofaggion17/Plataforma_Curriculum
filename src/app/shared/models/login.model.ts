export interface ILogin {
    email: string;
    senha: string;
}

export interface ILoginResponse {
    message: string;
    token: string;
    cargo: Role;
}

export enum Role {
    Administrador = 'Administrador',
    Aluno = 'Aluno'
}
export interface IChangePassword {
    senha_antiga: string;
    senha_nova: string;
}