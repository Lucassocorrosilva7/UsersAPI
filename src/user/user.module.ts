import { Module, MiddlewareConsumer, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserIdCheckMiddlware } from "src/middleware/user-id-check.middlware";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
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