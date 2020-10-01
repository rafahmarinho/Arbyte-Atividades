// (OBRIGATÓRIO)Faça um algoritmo que receba uma CEP e diga qual é o endereço
// completo (Cidade, rua, estado) deste CEP.
// Utilize a API : https://api.postmon.com.br/v1/cep/{CEP}
// Exemplo CEP :https://api.postmon.com.br/v1/cep/89010020

const axios = require('axios')
const rs = require('readline-sync')

function getAPI() {
    const qualCEP = rs.question('Digite um CEP [somente números]: \n')
    axios.get(`https://api.postmon.com.br/v1/cep/${qualCEP}`)
        .then(res => {
            const dataAPI = res.data

            const { logradouro, bairro, cidade, estado } = dataAPI

            console.log(`${logradouro} - ${bairro} -  ${cidade} -  ${estado}`)
        })
        .catch(err => {
            if (err.message === "Request failed with status code 404") {
                console.log('CEP inválido.')
                getAPI()
            } else {
                console.log(err.message)
        }
        })
}

getAPI()