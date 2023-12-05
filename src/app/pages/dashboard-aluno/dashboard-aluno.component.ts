import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurriculum } from 'src/app/shared/models/curriculum.model';
import { IUserInfo } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CurriculoService } from 'src/app/shared/services/curriculo.service';

@Component({
  selector: 'app-dashboard-aluno',
  templateUrl: './dashboard-aluno.component.html',
  styleUrls: ['./dashboard-aluno.component.scss']
})
export class DashboardAlunoComponent implements OnInit {
  formGroup: FormGroup;

  userInfo: IUserInfo = {
    id: 0,
    nome: '',
    email: '',
    cargo: ''
  };

  constructor(private fb: FormBuilder, private curriculoService: CurriculoService, private authService: AuthService) {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      // data_nascimento: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      // genero: ['', Validators.required],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      curso: ['', Validators.required],
      instituicao: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_termino: ['', Validators.required],
      habilidades: ['', Validators.required],
      experiencia: ['', Validators.required],
      atividades_extras: ['', Validators.required],
    });
  }
  
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

  salvarCurriculo() {
    if (this.formGroup.valid) {
      const values: ICurriculum = {
        id_aluno: this.userInfo.id,
        nome: this.formGroup.get('nome')?.value,
        email: this.formGroup.get('email')?.value,
        telefone: this.formGroup.get('telefone')?.value,
        rg: this.formGroup.get('rg')?.value,
        cpf: this.formGroup.get('cpf')?.value,
        endereco: this.formGroup.get('endereco')?.value,
        cidade: this.formGroup.get('cidade')?.value,
        estado: this.formGroup.get('estado')?.value,
        cep: this.formGroup.get('cep')?.value,
        curso: this.formGroup.get('curso')?.value,
        instituicao: this.formGroup.get('instituicao')?.value,
        data_inicio: this.formGroup.get('data_inicio')?.value,
        data_termino: this.formGroup.get('data_termino')?.value,
        habilidades: this.formGroup.get('habilidades')?.value,
        experiencia: this.formGroup.get('experiencia')?.value,
        atividades_extras: this.formGroup.get('atividades_extras')?.value,
        data_nascimento: '2024-06-01',
        genero: 'Outro',

      }

      this.curriculoService.saveCurriculo(values).subscribe({
        next: (res) => {
          console.log("Currículo salvo: ", res);
          this.formGroup.reset();
        },
        error: (erro) => console.error("Erro: ", erro)
      })
    }   
    
  }
}
