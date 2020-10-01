// 4. Colocar uma opção para o carrinho ser entregue (usar promise e timeout)
//    (timeout para demorar um pouco para entregar)
//    Quando o usuário escolher que quer uma entrega, criar uma promise para realizar essa entrega e
//    agradecer pela compra logo depois da promise
//    "Agendamos sua entrega"
//    "Agradecemos sua compra!"
//    alguns segundos depois, com a promise concluída, aparecerá uma mensagem de "Carrinho entregue"
const axios = require('axios')
const rs = require('readline-sync')
class Usuario {
    constructor(nome, saldoNoCartao) {
        this.nome = nome
        this.saldoNoCartao = saldoNoCartao
        this.carrinho = []
    }
}

let usuario = new Usuario('Rafa', 50)

class Produto {
    constructor(id, nome, valor) {
        this.id = id
        this.nome = nome
        this.valor = valor
    }
}
class Mercado {
    constructor(nome, dono) {
        this.nome = nome
        this.dono = dono

        let maca = new Produto(
            1,
            'Maçã',
            2.30
        )

        let uva = new Produto(2, 'Uva', 8)

        let uvaSemCaroco = new Produto(3, 'Uva Sem Caroço', 16)
        this.produtos = [maca, uva, uvaSemCaroco]
    }
    listarProdutos() {

        for (let i = 0; i < this.produtos.length; i++) {

            let produtoAtual = this.produtos[i]

            console.log("[" + produtoAtual.id + "] - " +
                produtoAtual.nome + " custa R$ " + produtoAtual.valor)
        }
    }
}
let maria = new Usuario('Dona Maria', 1000000)
let mercado = new Mercado('Mercado Arbyte', maria)

function comprar() {
    mercado.listarProdutos()
    let produtoEscolhido = rs.question("Escolha seu produto: ")
    let limiteListaProdutos = mercado.produtos.length

    while (produtoEscolhido > 0 && produtoEscolhido <= limiteListaProdutos) {

        let produto = mercado.produtos[produtoEscolhido - 1]
        console.log("Produto que o usuário escolheu é: " + produto.nome)

        usuario.carrinho.push(produto)


        let continuar = rs.questionInt("\nMais alguma coisa?\n[1] - sim\n[2] - não\n")

        if (continuar === 1) {
            mercado.listarProdutos()
            produtoEscolhido = rs.question("Escolha seu produto: ")
        }
        else {
            break
        }
    }
    console.log("Carrinho: ")
    console.log(usuario.carrinho)
    console.log("Processando pagamentos...")

    listaDePagamentos = []

    for (let i = 0; i < usuario.carrinho.length; i++) {
        let valorProduto = usuario.carrinho[i].valor
        listaDePagamentos.push(new Promise((resolve, reject) => {

            setTimeout(() => {
                if (valorProduto <= usuario.saldoNoCartao) {
                    usuario.saldoNoCartao -= valorProduto
                    resolve("TRANSAÇÃO ACEITA")
                } else {
                    reject("SALDO INSUFICIENTE")
                }
            }, 5000);
        })
        )
    }
    Promise.all(listaDePagamentos)
        .then(respostaQuandoDeuCerto => {
            console.log(respostaQuandoDeuCerto)
            let continuarCompra = rs.keyInYN('Quer efetuar uma nova compra? \n')
            continuarCompra ? limparCarrinho() : console.log('Obrigado e volte sempre!')
            let desejaEntrega = rs.keyInYN('Deseja agendar uma entrega? \n')
            desejaEntrega ? fazerEntrega() : console.log('Ok, retirar pessoalmente então!\n')
        })
        .catch(err => {
            console.log(err)
        })
}

comprar()

function limparCarrinho() {
    usuario.carrinho = []
    console.log('\n\n===== NOVA COMPRA ===== \n\n')
    comprar()
}

function fazerEntrega() {
    const qualCep = rs.question('Digite um CEP [somente números]: \n')
    axios.get(`https://api.postmon.com.br/v1/cep/${qualCep}`)
        .then(res => {
            const dataAPI = res.data

            const { logradouro, bairro, cidade, estado } = dataAPI

            const confirmaCep = rs.keyInYN(`${logradouro} - ${bairro} -  ${cidade} -  ${estado} \n O endereço é este mesmo? `)
            if (confirmaCep) {

                setTimeout(() => {
                    console.log('Agendamos a sua entrega! \n Agradecemos a sua compra!')
                }, 2000);
                setTimeout(() => {

                    console.log('Carrinho entregue.')
                }, 5000);
            } else {
                fazerEntrega()
            }
        })
        .catch(err => {
            if (err.message === "Request failed with status code 404") {
                console.log('CEP inválido.')
                fazerEntrega()
            } else {
                console.log(err.message)
            }
        })
}

