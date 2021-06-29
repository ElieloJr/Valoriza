import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"


interface IPayload{
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    // Receber o token
    const authToken = request.headers.authorization
    
    // Validar se token esta preenchido
    if(!authToken){
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ")

    try{
        // Validar se token é valido
        const {sub} = verify(token ,"e732fb5467be548cf3bb149352c8ec7c") as IPayload

        // Recuperar informações do usuario
        request.user_id = sub
        
        return next()
    }catch(err){
        return response.status(401).end()
    }
}
