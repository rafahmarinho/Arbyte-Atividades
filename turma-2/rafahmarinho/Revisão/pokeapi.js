/* 1 - Crie um programa que deve:
- Pedir ao usuário que defina um pokémon que ele gostaria de saber mais informações
sobre. Essa escolha pode ser feita através do input do ID do Pokémon ou pelo nome.
- Fazer o display do nome do Pokémon, seu tipo e também sua lista de habilidades (na
tela do terminal)
- Além de mostrar uma lista com os nomes das habilidades, o programa deve fornecer a
descrição dessas habilidades, conforme é possível obter no endpoint de ABILITIES.
- Mostrar para quais tipos de pokémon esse pokémon não causa dano, para quais ele
causa metade do dano e para quais ele causa o dobro do dano. Essas informações
podem ser
obtidas no endpoint de TYPES, dentro da chave ‘damage_relations’, da seguinte
maneira:
‘no_damage_to’, ‘half_damage_to’, ‘double_damage_to’, respectivamente.
- Além de mostrar relações de dano, o programa deveria mostrar exemplos de outros
pokémons que têm o mesmo tipo que o pokémon mostrado. */

const rs = require('readline-sync')
const axios = require('axios')
const chalk = require('chalk')
const API = 'https://pokeapi.co/api/v2/pokemon/'


console.log(chalk.bold.white.bgRed(' P O K É D E X \n'));
const idPokemon = rs.question('Digite o ID ou NOME do Pokémon desejado :')

const findPokemon = API + idPokemon

async function getDescription(urlAbility) {
    let { data } = await axios.get(urlAbility)
    return data.effect_entries[1].effect
}

async function getAbilities(abilities) {
    for (let i = 0; i < abilities.length; i++) {
        let urlAbility = abilities[i].ability.url
        let description = await getDescription(urlAbility)
        console.log(`Habilidade ${i + 1}: ${abilities[i].ability.name}`)
        console.log(description)
    }
}

async function getPokemon(findPokemon) {
    let { data } = await axios.get(findPokemon)
    const { abilities, name, types } = data
    console.log(`O Pokémon escolhido foi ${name} !`)
    await getAbilities(abilities)
    console.log(abilities[0].ability)
    for (let i = 0; i < types.length; i++) {
        console.log(`Type ${i + 1}: ${types[i].type.name}`)
    }
    console.log(types[0].type)
}
getPokemon(findPokemon)
