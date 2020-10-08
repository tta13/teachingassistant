import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   aluno: Aluno = {nome: "tales", cpf: "909090", email: "t@cin.ufpe.br", login: "tta13"};
}

export class Aluno {
  nome: string;
  cpf: string;
  email: string;
  login: string;
}
