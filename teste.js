let inputs = [100, 100, 100, 100,0]

// 0 - palavras
// 1 - pseudopalavras
// 2 - frases
// 3 - texto
// 4 - questoes


const nivel0 = () => {
    if (inputs[0] === 0)
        console.log("nivel 0 - não avaliado - prova encerrada")
}

const nivel1 = () => {
    if (inputs[0] >= 0 && inputs[0] <= 10)
        console.log("nivel 1 - não leitor - prova encerrada")
}

const nivel2e3 = () => {

    if (inputs[0] <= 35 || inputs[1] <= 12) {
        if (inputs[0] <= 25 && inputs[1] <= 6)
            console.log("nivel 2 - leitor de palavras - prova encerrada")
        else
            console.log("nivel 3 - leitor de sílabas - prova encerrada")
    }
}

const nivel4 = () => {
    if(inputs[0] <= 45 || inputs[1] <= 18 || inputs[2] === 0)
        console.log("nivel 4 - leitor de frases - prova encerrada")
}
const nivel5 = () => {
    if(inputs[0] <= 59 ||  inputs[1] <= 24 || inputs[3] === 100 || inputs[4] === 0)
        console.log("nivel 5 - leitor sem fluencia - prova encerrada")
}
const nivel6 = () => {
    if(inputs[0] <= 60 || inputs[1] <= 25 || inputs[3] === 100 || inputs[4] > 0)
        console.log("nivel 6 - leitor fluente - prova encerrada")

}
nivel5()
nivel6()