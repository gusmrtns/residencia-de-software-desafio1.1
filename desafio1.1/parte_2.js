class Turma {

    #alunos = [];


    addAluno(novoAluno) {
        if (this.#alunos.some(aluno => aluno.equalsMatricula(novoAluno))) {
            return false;
        }

        this.#alunos.push(novoAluno);
        return true;
    }

    removeAluno(matricula) {
        for (let i = 0; i < this.#alunos.length; i++) {
            const aluno = this.#alunos[i];
            
            if (aluno.getMatricula() === matricula) {
                this.#alunos.splice(i, 1); 
                return true;
            }
        }
    
        return false;  
    }

    lancarNota(matricula, prova, nota) {
        const aluno = this.#alunos.find(aluno => aluno.getMatricula() === matricula);
        if (aluno) {
            aluno.setNota(prova, nota);
            return true;  
        }
        return false; 
    }
    

    ordenarAlunosPorNome() {
        this.#alunos.sort((a, b) => a.getNome().localeCompare(b.getNome()));
    }

    imprimirAlunos() {
        this.ordenarAlunosPorNome();

  
        console.log("—---------------------------------------");
        console.log("Matricula Nome P1 P2 NF");
        console.log("—---------------------------------------");

        
        this.#alunos.forEach(aluno => {
            const p1 = aluno.p1 !== null ? aluno.getP1().toFixed(1) : "-";
            const p2 = aluno.p2 !== null ? aluno.getP2().toFixed(1) : "-";
            let nf;

            // Calcula a nota final (NF) de acordo com as regras
            if (aluno.getP1() !== null && aluno.getP2() !== null) {
                nf = ((aluno.getP1() + aluno.getP2()) / 2).toFixed(1);
            } else if (aluno.getP1() !== null) {
                nf = (aluno.getP1() / 2).toFixed(1);
            } else if (aluno.getP2() !== null) {
                nf = (aluno.getP2() / 2).toFixed(1);
            } else {
                nf = (0).toFixed(1);
            }

            console.log(`${aluno.getMatricula()} ${aluno.getNome()} ${p1} ${p2} ${nf}`);
        });
        console.log("—---------------------------------------");
    }
}

class Aluno {
    #nome;
    #matricula;
    #p1;
    #p2;


    constructor(nome, matricula, p1 = 0, p2 = 0) {
        this.#nome = nome;
        this.#matricula = matricula;
        this.#p1 = p1;
        this.#p2 = p2;

        if (this.#nome === null || this.#matricula === null){
            throw new Error("O nome e a matricula são campos obrigatórios");
        }
    }

    equalsMatricula(aluno) {
        return this.#matricula === aluno.getMatricula();
    }

    getMatricula() {
        return this.#matricula;
    }

    getNome() {
        return this.#nome;
    }

    getP1() {
        return this.#p1;
    }

    getP2() {
        return this.#p2;
    }

    setNota(prova, nota) {
        if (prova === 'P1' || prova === 'p1') {
            this.#p1 = nota;
        } else if (prova === 'P2' || prova === 'p2') {
            this.#p2 = nota;
        } else {
            console.log("Prova inválida. Escolha P1 ou P2.");
        }
    }


}



var prompt = require('prompt-sync')();


// Função para adicionar dados do aluno com prompt
function adicionarAlunoNaTurma(turma) {
    const nome = prompt("Digite o nome do aluno: ");
    const matricula = prompt("Digite a matrícula do aluno: ");

    const novoAluno = new Aluno(nome, matricula);
    if (turma.addAluno(novoAluno)) {
        console.log("Aluno adicionado com sucesso!");
    } else {
        console.log("Matrícula duplicada. Aluno não adicionado.");
    }
}

// Função para lançar notas
function lancarNotaNaTurma(aluno) {
    const matricula = prompt("Digite a matrícula do aluno para lançar a nota: ");
    const prova = prompt("Digite a prova (P1 ou P2): ");
    const nota = parseFloat(prompt("Digite a nota: "));

    if (aluno.lancarNota(matricula, prova, nota)) {
        console.log("Nota lançada com sucesso!");
    } else {
        console.log("Aluno não encontrado.");
    }
}

// Função principal de execução
function main() {
    const turma = new Turma();

    let opcao;
    do {
        console.log("\n1. Adicionar Aluno");
        console.log("2. Remover Aluno");
        console.log("3. Lançar Nota");
        console.log("4. Imprimir Alunos");
        console.log("0. Sair");
        opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case '1':
                adicionarAlunoNaTurma(turma);
                break;
            case '2':
                const matriculaRemover = prompt("Digite a matrícula do aluno para remover: ");
                if (turma.removeAluno(matriculaRemover)) {
                    console.log("Aluno removido com sucesso.");
                } else {
                    console.log("Aluno não encontrado.");
                }
                break;
            case '3':
                lancarNotaNaTurma(turma);
                break;
            case '4':
                turma.imprimirAlunos();
                break;
            case '0':
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    } while (opcao !== '0');
}

// Executa o programa principal
main();