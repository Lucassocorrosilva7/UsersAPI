import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
        secret: `s*3cacHa3ruw#D-a9=bRaVo?rA&A68+o`
    }),
    UserModule,
    PrismaModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})


export class AuthModule {}