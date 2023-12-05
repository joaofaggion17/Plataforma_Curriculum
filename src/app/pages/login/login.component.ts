import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  onLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      // this.onLoading = true
  }

  onSubmitLogin() {
    if (this.formGroup.valid) {
      this.onLoading = true;
      this.authService.onLogin(this.formGroup.value).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.setIsAuthenticated(true);
          console.info("Usuário logado: ", res);

          // const userRole = Role[res.cargo as unknown as keyof typeof Role];
          

          if (res.cargo === Role.Administrador) {
            console.info("Usuário logado: ", res.cargo);
            this.router.navigate(['/dashboard-adm']);
          }

          if (res.cargo === Role.Aluno) {
            console.info("Usuário logado: ", res.cargo);
            this.router.navigate(['/dashboard-aluno']);
          }
        },
        error: (erro) => {
          console.error("Falha na autenticação: ", erro);
        },
        complete: () => {
          this.onLoading = false;
        }
      })
    }
  }



}
