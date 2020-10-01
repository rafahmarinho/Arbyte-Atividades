// mostrar todos os nomes de todos os carros

let cars = require('../cars.json')

cars.forEach(car => {
    console.log(car.Car)
})