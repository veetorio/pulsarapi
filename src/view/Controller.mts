import express from "express"
import type {  Request , Response } from 'express'
import { novoUsuario , findAllUsuarios , deleteLogicUser , login } from  "../service/Service.mts";
const port = 8080

// configurações
const server = express()
server.use(express.json())
const path_base = "/usuarios"
const logBase = "ENPOINT[usuarios]"
// endpoints de usuairios

// criar usuario
server.post(path_base,async (req : Request ,resp : Response) => {
    console.log(logBase.concat(` ${req.method} - acessado por ${req.ip}`))
    const queryResponse = await novoUsuario(req.body)
    resp.send(queryResponse)
})

//  pegar todos os usuarios
server.get(path_base, async (req : Request , resp : Response) => {
    const list =  await findAllUsuarios()
    console.log(logBase.concat(` ${req.method} - acessado por ${req.ip}`))
    resp.send(list)
})

//delete
server.delete(path_base, async (req : Request , resp : Response) => {
    const idUsuario = req.body.idUsuario;
    console.log(logBase.concat(` ${req.method} - acessado por ${req.ip}`))
    try {
        deleteLogicUser(idUsuario)
        resp.send("Delete feito com sucesso")
    } catch {

    }
})

// logar usuario
server.post(path_base + "/login", async (req : Request , resp : Response,next) => {
    const model = await login(req.body)
    if(model){
        resp.send(model)
    } else {
        resp.sendStatus(401)
    }
})

server.listen(port,(err) => {
    try {
        console.log(`Servidor Online na porta ${port}`)
    } catch {
        console.log("servidor caiu")

    }
})

