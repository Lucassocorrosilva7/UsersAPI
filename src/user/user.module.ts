import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { UserIdCheckMiddlware } from "src/middleware/user-id-check.middlware";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})


export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddlware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }

}