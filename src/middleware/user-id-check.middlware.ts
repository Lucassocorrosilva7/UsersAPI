import { NestMiddleware, BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddlware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        console.log('UserIdCheckMiddlware', 'antes')

        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID inválido!');
        }

        console.log('UserIdCheckMiddlware', 'depois')


        next();

    }

}