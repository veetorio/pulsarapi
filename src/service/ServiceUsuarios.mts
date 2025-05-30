import { PrismaClient } from "@prisma/client"
import type { usuario } from "@prisma/client"
import { hash } from "crypto"
export const ormClient = new PrismaClient()
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
        const salt = hash(hashAlg, usuarioModel.senha + usuarioModel.nome)
        usuarioModel.salt = salt
        console.log(usuarioModel)
        const query = await ormClient
            .usuario
            .findFirst({
                where : {
                    AND : {
                        nome : usuarioModel.nome,
                        senha : usuarioModel.senha
                    },
                },
                select : {
                    salt : true,
                    nome : true,
                    tipo_usuario : true,
                }
            })
            .then((queryResponse) => {

                console.log(queryResponse)
                return queryResponse

            })
            .catch(function () {
                console.error("Não foi possivel fazer login")
            })
        return query

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
                },
                select : {
                    nome : true,
                    senha : true,
                    tipo_usuario : true,
                    salt : true,
                    produto : true,
                    id : true
                }
            })
        return list
    } finally {
        await ormClient.$disconnect()
    }
}
export async function update(params : usuario) {
    await ormClient.usuario.update({
        where : {
            salt : params.salt
        },
        data : params
    })
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
export async function deleteFisicUser(saltUSer: string) {
    const user  = await ormClient
        .usuario
        .findFirst({
            where : {
                salt : saltUSer
            }
        })
    await ormClient
        .usuario
        .delete(
            {
                where : {
                    id : user?.id
                }
            }
        )
        .finally(
            ormClient.$disconnect
        )
}