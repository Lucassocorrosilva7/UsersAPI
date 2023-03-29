import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FileModule } from "src/file/file.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
        secret: process.env.JWT_SECRET
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService]
})


export class AuthModule {}