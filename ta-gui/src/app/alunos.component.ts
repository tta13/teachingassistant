import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

  @Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })
 export class AlunosComponent implements OnInit {

    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    alunoduplicado: boolean = false;

    constructor(private alunoService: AlunoService) {}

     criarAluno(a: Aluno): void {
       this.alunoService.criar(a)
              .subscribe(
                ar => {
                  if (ar) {
                    this.alunos.push(ar);
                    this.aluno = new Aluno();
                  } else {
                    this.alunoduplicado = true;
                  } 
                },
                msg => { alert(msg.message); }
              );
    }
    
    deletarAluno(a: Aluno): void{
      this.alunoService.deletar(a).subscribe(
        deleted =>{
          if(deleted){
            this.removerAlunoDaLista(a);
            alert("Aluno " + a.nome + " deletado!");
          }else{
            alert("Aluno não encontrado")
          }
        },
        msg => { alert(msg.message); }
      );
    }

    removerAlunoDaLista(a: Aluno): void{
      var index: number = this.alunos.indexOf(a, 0);
      if (index > -1) {
        this.alunos.splice(index, 1);
      }
    }

    onMove(): void {
       this.alunoduplicado = false;
    }

     ngOnInit(): void {
       this.alunoService.getAlunos()
             .subscribe(
               as => { this.alunos = as; },
               msg => { alert(msg.message); }
              );
     }

  }