/* 3 - Faça um algoritmo que solicite ao usuário A ou B Caso o usuário escolha A O algoritmo
deve imprimir toda informação do carro com maior aceleração Caso o usuário escolha B O
algoritmo deve imprimir toda informação do carro com maior potência */

let cars = require('../cars.json')
let rs = require('readline-sync')
let input = rs.question('Olá, escolha A ou B: ').toLowerCase()


let maiorAceleracao = () => {
    let resultado = cars.map(car => car.Acceleration)
    let maiorAcceleration = 0
    let car = {}

    resultado.forEach((acceleration, i ) => {
        if(acceleration > maiorAcceleration){
            maiorAcceleration = acceleration
            car = cars[i]
        }    
    })

    return car
}

let maiorPotencia = () => {
    let resultado = cars.map(car => car.Horsepower)
    let melhorPotencia = 0
    let car = {}

    resultado.forEach((Horsepower, i ) => {
        if(Horsepower > melhorPotencia){
            melhorPotencia = Horsepower
            car = cars[i]
        }    
    })

    return car
}

if(input == 'a'){
    console.log('Este é o carro com maior aceleração: ',maiorAceleracao())
} else if (input == 'b'){
    console.log('Este é o carro com maior potência: ',maiorPotencia())
}
