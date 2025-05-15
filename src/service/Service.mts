import { PrismaClient } from "@prisma/client"
import type { usuario } from "@prisma/client"
import { hash } from "crypto"
const ormClient = new PrismaClient()
const hashAlg = "md5"
export async function novoUsuario(usuarioModel: usuario)  {
    try {

        usuarioModel.salt = hash(hashAlg, usuarioModel.senha)

        const { atividade, nome, salt, senha, tipo_usuario } = usuarioModel
        return await ormClient.usuario.create({
            data: {
                nome,
                salt,
                senha,
                atividade,
                tipo_usuario
            }, select : {
                id : true,
                salt : true,
                nome : true
            }
        })
    } finally {
        await ormClient.$disconnect()
    }
}
export async function login(usuarioModel: usuario) {
    try {
        const salt = hash(hashAlg, usuarioModel.senha)
        const userModelQuery = ormClient
            .usuario
            .findFirst({
                where: {
                    AND: {
                        nome: usuarioModel.nome,
                        senha: usuarioModel.senha,
                        salt: usuarioModel.salt
                    }
                }
            })
            .then((queryResponse) => {

                console.log(queryResponse)
                return queryResponse

            })
            .catch(function () {
                console.error("Não foi possivel fazer login")
            })
        return userModelQuery

    } finally {
        ormClient.$disconnect()
    }
}
export async function findAllUsuarios() {
    try {
        const list = await ormClient
            .usuario
            .findMany({
                where: {
                    atividade: true
                }
            })
        return list
    } finally {
        await ormClient.$disconnect()
    }
}
export async function deleteLogicUser(user: number) {
    try {
        await ormClient
            .usuario
            .update({
                where: {
                    id: user
                },
                data: {
                    atividade: false
                }
            })

    } catch {
        console.trace("Não foi possivel realizar a exclusão")
    } finally {
        await ormClient.$disconnect()
    }
}