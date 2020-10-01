// 1. Quando eu tentar passar o cartão, quero que ele passe o cartão para cada produto no carrinho
//    então só avisar que a compra foi concluída se todos os produtos passarem no cartão
//    EXEMPLO:
//    Considerando esse carrinho
//    1) Produto { id: 3, nome: 'Uva Sem Caroço', valor: 16 },
//    2) Produto { id: 3, nome: 'Uva Sem Caroço', valor: 16 },
//    3) Produto { id: 3, nome: 'Uva Sem Caroço', valor: 16 },
//    4) Produto { id: 3, nome: 'Uva Sem Caroço', valor: 16 }
//    Tentar passar o primeiro produto e tirar do saldo do cartão
//    Tentar passar o segundo produto e tirar do saldo do cartão
//    e assim vai
//    a compra só é concluída se todos os produtos passarem
//    SUGESTÃO:
//    Então, seria legal se tivesse uma função para pagarProduto(produto)

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

    })
    .catch(err => {
      console.log(err)
    })
}

comprar()


