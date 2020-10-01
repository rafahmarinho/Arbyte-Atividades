import * as rs from 'readline-sync'
import Pessoas from './Pessoa'
let criarNovoUsuario = true
let users = []

while (criarNovoUsuario) {
    let nome = rs.question('Qual o seu nome?')
    let idade = rs.questionInt('Qual a sua idade?')
    if (idade < 18) {
        console.log('Salve menó de idade.')
    } else {
        console.log('Já pode ser preso!')
    }
    let CPF = rs.question('Qual o seu CPF? [only numbers]')
    while (CPF.length != 11) {
        console.log('CPF inválido')
        CPF = rs.question('Qual o seu CPF? [only numbers. ex: 00100200344]')
    }
    let cidade = rs.question('Qual cidade voce nasceu?')
    let telefone = rs.question('Qual o seu telefone? [only numbers]')
    while (telefone.length != 11) {
        console.log('Telefone inválido')
        telefone = rs.question('Qual o seu telefone? [only numbers. ex: 1199009900]')
    }
    let usuario = new Pessoas(nome, idade, CPF, cidade, telefone)
    users.push(usuario)
    console.log(users)
    console.log('Deseja criar outro usuário? \n')
    let novoUsuario = rs.questionInt('[1] SIM \n [2] NAO \n')
    if (novoUsuario === 1) {
        criarNovoUsuario = true
    } else if (novoUsuario === 2) {
        criarNovoUsuario = false
    } else {
        while (novoUsuario != 1 && novoUsuario != 2) {
            console.log('Opção inválida')
            console.log('Deseja criar outro usuário? \n')
            novoUsuario = rs.questionInt('[1] SIM \n [2] NÃO')
            if (novoUsuario === 2) {
                criarNovoUsuario = false
            }
        }
    }
}
