export class Pessoas {
    private CPF;
    private nome;
    public idade;
    public cidade;
    public telefone;

    constructor(nome: string, idade: number, CPF: string, cidade: string, telefone: string) {

        this.nome = nome;
        this.idade = idade;
        this.CPF = CPF;
        this.cidade = cidade;
        this.telefone = telefone;
    }
}

export default Pessoas