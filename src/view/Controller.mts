import express from "express"
import type { Request, Response } from 'express'
import { novoUsuario, findAllUsuarios, deleteLogicUser, login, deleteFisicUser, update, ormClient, } from "../service/ServiceUsuarios.mts";
import { criarNoticia, pegarTodasNoticias, pegarComFiltros , editarNoticia ,apagar } from "../service/ServiceNoticias.mts";
import cors from 'cors'
import { mockedUsers } from "../mocks/MocksUser.mts";
import { mockedNoticys } from "../mocks/MocksNoticys.mts";

const port = 8080

// configurações
const server = express()

server.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
server.use(express.json())
const PATH_BASE_USUARIO = "/usuarios"
const logbaseUser = "ENPOINT[usuarios]"
const logBaseNoticy = "ENDPOINT[noticias]"
// endpoints de usuairios

// criar usuario
server.post(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    const queryResponse = await novoUsuario(req.body)
    resp.send(queryResponse)
})

//  pegar todos os usuarios
server.get(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    const list = await findAllUsuarios()
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    resp.send(list)
})

//delete logico
server.delete(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    const idUsuario = req.body.idUsuario;
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    try {
        deleteLogicUser(idUsuario)
        resp.send("Delete feito com sucesso")
    } catch {

    }
})
// delete fisico
server.delete(PATH_BASE_USUARIO + "/:salt", async (req: Request, resp: Response, next) => {
    const { salt } = req.params
    deleteFisicUser(salt)

    resp
        .status(201)
        .send(salt)
})
// logar usuario
server.post(PATH_BASE_USUARIO + "/login", async (req: Request, resp: Response, next) => {
    const model = await login(req.body)
    console.log(model)
    if (model) {
        resp.send(model)
    } else {
        resp.sendStatus(401)
    }
})
// atualizar usuario
server.put(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    const usuario = req.body
    if (usuario)
        update(usuario)
    resp.send(usuario)
})

//  pegar todos os usuarios
server.get(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    const list = await findAllUsuarios()
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    resp.send(list)
})

//delete logico
server.delete(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    const idUsuario = req.body.idUsuario;
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    try {
        deleteLogicUser(idUsuario)
        resp.send("Delete feito com sucesso")
    } catch {

    }
})
// delete fisico
server.delete(PATH_BASE_USUARIO + "/:salt", async (req: Request, resp: Response, next) => {
    const { salt } = req.params
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    deleteFisicUser(salt)

    resp
        .status(201)
        .send(salt)
})
// logar usuario
server.post(PATH_BASE_USUARIO + "/login", async (req: Request, resp: Response, next) => {
    const model = await login(req.body)
    console.log(logbaseUser.concat(` ${req.method} - acessado por ${req.ip}`))
    if (model) {
        resp.send(model)
    } else {
        resp.sendStatus(401)
    }
})
// atualizar usuario
server.put(PATH_BASE_USUARIO, async (req: Request, resp: Response) => {
    const usuario = req.body
    if (usuario)
        update(usuario)
})

// subir mocks de teste
server.get("/mocksup", async (req: Request, resp: Response) => {

    const users: any[] = mockedUsers
    await ormClient.usuario.createMany({
        data: users
    })
    await ormClient.noticia.createMany(
        {
            data: mockedNoticys(210, 10)
        }
    )

    resp.send("mocks-up concluido")

})


// const 
// controller noticias
const PATH_BASE_NOTICIA = "/noticias"
server.post(PATH_BASE_NOTICIA, async (req: Request, resp: Response) => {
    console.log(logBaseNoticy.concat(` ${req.method} - acessado por ${req.ip}`))
    criarNoticia(req.body)
    resp.send(req.body)
})


// delete fisico
server.delete(PATH_BASE_NOTICIA + "/:salt", async (req: Request, resp: Response, next) => {

})
// logar usuario
// atualizar noticia
server.put(PATH_BASE_NOTICIA, async (req: Request, resp: Response) => {

})

//  pegar todos os noticias
server.get(PATH_BASE_NOTICIA, async (req: Request, resp: Response) => {
    const param: string = req.query.target as string
    console.log(param)
    const noticias = param ? await pegarComFiltros(param) : await pegarTodasNoticias()
    resp.send(noticias);
})

server.listen(port, (err) => {
    try {
        console.log(`Servidor Online na porta ${port}`)
    } catch {
        console.log("servidor caiu")

    }
})

