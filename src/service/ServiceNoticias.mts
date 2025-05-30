import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const ormClient = new PrismaClient()

export async function criarNoticia(noticiaIn: any) {
    await ormClient
        .noticia
        .create({
            data: {
                titulo: noticiaIn.titulo,
                descricao: noticiaIn.descricao,
                usuarioFk : noticiaIn.fkUser,
                urlImage : noticiaIn.urlImage,
                tag : {
                    connectOrCreate : noticiaIn.tag.map((tag : any) => {
                        return {
                            where : { id : tag.id },
                            create : {
                                nome : tag.nome
                            }
                        }
                    })
                }
            }
        })
}
export async function pegarTodasNoticias() {
   return await ormClient
    .noticia
    .findMany({
        include : {
            tag : true
        }
    })

}
export async function editarNoticia(params: any) {
    await ormClient
        .noticia
        .update({
            where : params.id,
            data : params
        })
    
}

export async function apagar(params: any) {
    await ormClient
        .noticia
        .delete(
            {where : params.id}
        )
}
export async function pegarComFiltros(target : string){
    console.log("Acessou")
    return await ormClient
        .noticia
        .findMany({
            where : {
                tag : {
                    some : {
                        nome : target
                    }
                }
                
            },
            include : {
                tag : true
            }
        })
}
export async function pegarTags(){

}