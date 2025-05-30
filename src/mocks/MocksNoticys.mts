import { faker } from "@faker-js/faker/locale/pt_BR";
import { Prisma } from "@prisma/client";

const funcMock = (): Prisma.noticiaCreateManyInput => {
    return {
        titulo: faker.book.title(),
        descricao: faker.lorem.paragraph(2),
        createdAt: new Date(),
        updateAt: new Date(),
        urlImage : '',
        usuarioFk : 50, // <<< aqui, direto
    }
}
export const mockedNoticys = (idUsuario: number, qtd: number): Prisma.noticiaCreateManyInput[] => {
    return Array.from({ length: qtd }, funcMock)
}
