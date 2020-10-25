import { CadastroDeAlunos } from '../cadastrodealunos';
import { Aluno } from '../../common/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroDeAlunos;

  function cadastrarAluno(nome:string, cpf:string, gitLogin:string, mail:string) {
    var aluno: Aluno = new Aluno();
    aluno.nome = nome;
    aluno.cpf = cpf;
    aluno.gitLogin = gitLogin;
    aluno.email = mail;
    return cadastro.cadastrar(aluno);
  }

  function expectSoUmAluno() {
    expect(cadastro.getAlunos().length).toBe(1);
    var aluno = cadastro.getAlunos()[0];
    return aluno;
  }

  beforeEach(() => cadastro = new CadastroDeAlunos())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("cadastra alunos corretamente", () => {
    cadastrarAluno("Mariana","683", "", "");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("");
    expect(aluno.metas.size).toBe(0);
  })

  it("não aceita alunos com CPF duplicado", () => {
    cadastrarAluno("Mariana","683", "", "");
    cadastrarAluno("Pedro","683", "", "");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
  })

  it("não aceita alunos com login git duplicado", () => {
    cadastrarAluno("Tales", "683", "tta", "");
    cadastrarAluno("Tomaz", "688", "tta", "");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Tales");
  })

  it("remove aluno corretamente", () => {
    var aluno1 = cadastrarAluno("Tales", "683", "", "");
    var aluno2 = cadastrarAluno("Amanda", "709", "", "");

    cadastro.deletar(aluno1.cpf);

    var alunoRestante = expectSoUmAluno();
    expect(alunoRestante.cpf).toBe(aluno2.cpf);
  })

  it("não remove nenhum aluno se cpf não estiver registrado", () => {
    var aluno = cadastrarAluno("Tales", "683", "", "");

    cadastro.deletar("100");

    var alunoRestante = expectSoUmAluno();
    expect(alunoRestante.cpf).toBe(aluno.cpf);
  })

})
