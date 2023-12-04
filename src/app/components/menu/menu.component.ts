import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/login.model';
import { IUserInfo } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public userInfo: IUserInfo = {
    id: 0,
    nome: '',
    email: '',
    cargo: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.authService.userIdentify().subscribe({
      next: (res) => {
          console.log("Informações do usuário: ", res);

          this.userInfo = {
            id: res.id,
            nome: res.nome,
            email: res.email,
            cargo: res.cargo
          };
      },
      error: (erro) => console.error("Erro: ", erro)
    })
  }
}
