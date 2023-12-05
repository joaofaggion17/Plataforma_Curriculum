export interface IUserInfo {
    id: number;
    nome: string;
    email: string;
    cargo: string;
}

export interface ChangePassword {
    email: string;
    senha_atual: string;
    senha_nova: string;
}