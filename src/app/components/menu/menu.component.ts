import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/shared/models/login.model';
import { IUserInfo } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  menuToggle: boolean = false;
  visible: boolean = false;
  formGroup: FormGroup;
  isEditable: boolean = false;

  userInfo?: IUserInfo = {
    id: 0,
    nome: '',
    email: '',
    cargo: ''
  };

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      senha_atual: ['', Validators.required],
      senha_nova: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onMenuToggle() {
    this.menuToggle = !this.menuToggle;
  }
  
  onEditable() {
    this.isEditable = !this.isEditable;
  }

  ngOnInit(): void {
    this.getUserRole();
  }

  openModal() {
    this.visible = true;
  }

  logout() {
    this.visible = false;
    localStorage.clear();
    this.authService.setIsAuthenticated(false);
    this.router.navigateByUrl('/login');
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

  changePassword() {
    if (this.formGroup.valid && this.formGroup.value) {
      const values = {
        ...this.formGroup.value,
        email: this.userInfo!.email
      }

      this.authService.changePassword(values).subscribe({
        next: (changePassword) => {
          console.log('Senha Alterada => ', changePassword);
          this.messageService.add({ severity: 'success', summary: 'Senha atualizada', detail: 'A senha foi atualizada com sucesso.' });
          this.formGroup.reset();
          setTimeout(() => {
            this.visible = false;
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao alterar a senha.` });
        }
      })
    }
  }
}
