// LISTA 14.1
// Ex. 1
// Criar todas essas operações para o nosso mercado
// listar todos os produtos
// verProduto
// criarProduto
// atualizarTudoDoProduto
// atualizarParteDoProduto
// removerProduto
// Utilizar os produtos vindos da API no mercado

const axios = require('axios')
const rs = require('readline-sync')
function listaTodosProdutos() {
  axios.get('http://localhost:3000/produtos')
    .then(respostaDaApi => {
      console.log(respostaDaApi.data)
      // let produtoEscolhido = rs.questionInt("Qual produto você quer?")
      // listaProduto(produtoEscolhido)
    })
}
function listaProduto(produtoEscolhido) {
  const url = 'http://localhost:3000/produtos' + "/" + produtoEscolhido
  console.log("Quero acessar a url " + url)
  axios.get(url)
    .then(respostaDaApi => {
      console.log(respostaDaApi.data)
    })
}
function criaNovoProduto(nome, descricao, preco, categoria) {
  // uma ação de post serve para criar um novo registro
  axios.post("http://localhost:3000/produtos", {
    "nome": nome,
    "descricao": descricao,
    "preco": preco,
    "categoria_id": categoria,
    "peso": 1000
  })
  .then(respostaDaApi => {
    console.log(respostaDaApi.data)
  })
}
function atualizaTodasInformacoesDoProdutoExistente(id, nome, descricao, preco, categoria) {
  // uma ação de post serve para criar um novo registro
  axios.put("http://localhost:3000/produtos/" + id, {
    "nome": nome,
    "descricao": descricao,
    "preco": preco,
    "categoria_id": categoria,
    "peso": 1000
  })
    .then(respostaDaApi => {
      console.log(respostaDaApi.data)
    })
}
function atualizaParteDasInformacoesProdutoExistente(id, descricao) {
  // uma ação de post serve para criar um novo registro
  axios.patch("http://localhost:3000/produtos/" + id, {
    "descricao": descricao
  })
    .then(respostaDaApi => {
      console.log(respostaDaApi.data)
    })
}
function deletarProduto(id) {
  axios.delete("http://localhost:3000/produtos/" + id)
    .then(respostaDaApi => {
      console.log(respostaDaApi.data)
      console.log("DELETADO")
    })
}
// criaNovoProduto('X-Promise', 'Faz a gente passar mal', 150, 1)
// atualizaTodasInformacoesDoProdutoExistente(9, 'X-Ítalo', 'Saudades', 100, 1)
// atualizaParteDasInformacoesProdutoExistente(9, 'Professor 10/10')
// deletarProduto(10)
listaTodosProdutos()
