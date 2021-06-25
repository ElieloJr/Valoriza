import { getCustomRepository } from "typeorm"

import { compare, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)
        //Verificar se email existe
        const userExists = await usersRepositories.findOne({
            email
        })

        if(!userExists){
            throw new Error("Email/Password incorrect")
        }
        //Verificar se senha está correta
        const passwordMatch = await compare(password, userExists.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        //Gerar token
        const token = sign({
            email: userExists.email
        }, "e732fb5467be548cf3bb149352c8ec7c", {
            subject : userExists.id,
            expiresIn: "1d"
        })

        return token
    }
}

export {AuthenticateUserService}