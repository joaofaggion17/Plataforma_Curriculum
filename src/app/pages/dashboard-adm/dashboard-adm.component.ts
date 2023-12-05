import { Component, OnInit } from '@angular/core';
import { ICurriculum } from 'src/app/shared/models/curriculum.model';
import { CurriculoService } from 'src/app/shared/services/curriculo.service';

@Component({
  selector: 'app-dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.scss']
})
export class DashboardAdmComponent implements OnInit {

  visible: boolean = false;
  curriculos: ICurriculum[] = [];
  curriculoUser: any;


  constructor(private curriculoService: CurriculoService) { }


  ngOnInit(): void {
      this.curriculoService.getCurriculos().subscribe({
        next: (res) => {
          this.curriculos = res;
          console.log(res)
        },
        error: (erro) => {
          console.error('Erro: ', erro)
        }
      })
  }

  openModal(nome: any) {

    this.curriculoUser = this.curriculos.find(curriculo => curriculo.nome === nome);
    console.log('curriculo: ', this.curriculoUser);
    this.visible = true;
  }
}
