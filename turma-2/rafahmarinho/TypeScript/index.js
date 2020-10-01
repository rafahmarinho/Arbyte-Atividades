"use strict";
exports.__esModule = true;
var rs = require("readline-sync");
var Pessoa_1 = require("./Pessoa");
var criarNovoUsuario = true;
var users = [];
while (criarNovoUsuario) {
    var nome = rs.question('Qual o seu nome?');
    var idade = rs.questionInt('Qual a sua idade?');
    if (idade < 18) {
        console.log('Salve menó de idade.');
    }
    else {
        console.log('Já pode ser preso!');
    }
    var CPF = rs.question('Qual o seu CPF? [only numbers]');
    while (CPF.length != 11) {
        console.log('CPF inválido');
        CPF = rs.question('Qual o seu CPF? [only numbers. ex: 00100200344]');
    }
    var cidade = rs.question('Qual cidade voce nasceu?');
    var telefone = rs.question('Qual o seu telefone? [only numbers]');
    while (telefone.length != 11) {
        console.log('Telefone inválido');
        telefone = rs.question('Qual o seu telefone? [only numbers. ex: 1199009900]');
    }
    var usuario = new Pessoa_1["default"](nome, idade, CPF, cidade, telefone);
    users.push(usuario);
    console.log(users);
    console.log('Deseja criar outro usuário? \n');
    var novoUsuario = rs.questionInt('[1] SIM \n [2] NAO \n');
    if (novoUsuario === 1) {
        criarNovoUsuario = true;
    }
    else if (novoUsuario === 2) {
        criarNovoUsuario = false;
    }
    else {
        while (novoUsuario != 1 && novoUsuario != 2) {
            console.log('Opção inválida');
            console.log('Deseja criar outro usuário? \n');
            novoUsuario = rs.questionInt('[1] SIM \n [2] NÃO');
            if (novoUsuario === 2) {
                criarNovoUsuario = false;
            }
        }
    }
}
