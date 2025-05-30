import { faker } from "@faker-js/faker"
import { hash } from "crypto";


const generateUser = () => {
    const name = faker.person.fullName()
    const password = faker.person.middleName() + faker.number.int()
    return {
        nome: name,
        senha: password,
        tipo_usuario: faker.number.int({ max: 1, min: 0 }) == 0 ? "COMMON" : "ADMIN",
        salt : hash("md5",name + password)
        
    }
}
export const mockedUsers: any[] = Array.from({ length: 100 },generateUser)
