import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

    cadastrar(aluno: Aluno): Aluno {
     var result = null;
     if (this.alunoNaoCadastrado(aluno.cpf, aluno.gitLogin)) {
       result = new Aluno();
       result.copyFrom(aluno);
       this.alunos.push(result);
     }
     return result;
   }

    deletar(cpf: string): boolean{
      var aluno = this.getAluno(cpf)
      var index: number = this.alunos.indexOf(aluno, 0);
      if (index > -1) {
        this.alunos.splice(index, 1);
        return true;
      }
      return false;
    }

    getAluno(cpf: string): Aluno{
      return this.alunos.find(a => a.cpf == cpf);
    }

    alunoNaoCadastrado(cpf: string, git: string): boolean {
      return !this.alunos.find(a => a.cpf == cpf || (a.gitLogin == git && git != ""));
   }

    atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
   }

    clear(): void{
      this.alunos.splice(0, this.alunos.length);
    }

    getAlunos(): Aluno[] {
     return this.alunos;
   }
}