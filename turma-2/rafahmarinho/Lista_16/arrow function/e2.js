/* 2 - Crie um algoritmo que conte quantos carros do Japan (Japão) existem na base cars.json. O
campo que define o país no cars.json é Origin. A comparação da string pode ser utilizada
usando a palavra “Japan”. */

let cars = require('../cars.json')

let japanCars = () => {
    return cars.filter(car =>{
        return car.Origin === 'Japan'
    }).length
}

console.log(`Existem ${japanCars()} carros japoneses cadastrados.`)