import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";


export const User = createParamDecorator((filter: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    if (request.user) {
        if (filter) {
            return request.user[filter]
        } else {
            return request.user;
        }
    } else {
        throw new NotFoundException("Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.");
    }
});