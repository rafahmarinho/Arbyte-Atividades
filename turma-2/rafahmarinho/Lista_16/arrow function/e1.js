/* 1 - Crie um algoritmo que solicite um número para o usuário e diga quantos carros possuem o
atributo“Horsepower” maior que o número informado pelo usuário. Para isso utiliza a
propriedade “Horsepower” do cars.json */

let cars = require('../cars.json')
let rs = require('readline-sync')
let number = rs.questionInt('Digite um numero de potência desejada: ')

let carrosOn = (number) => {
    return cars.filter(car =>{
        return car.Horsepower > number
    }).length
} 

console.log(`Existem ${carrosOn(number)} carros com uma potencia acima da digitada.`)