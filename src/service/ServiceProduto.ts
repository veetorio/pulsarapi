import { ormClient } from "./ServiceUsuarios.mts";


export async function criarProduto(produto: any) {
    await ormClient.produto.create({
        data: produto,
        select: {
            lancamento: true,
            nomeProtoTipo: true,
            nomeReal: true,
        }
    })
}