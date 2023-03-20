import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: `s*3cacHa3ruw#D-a9=bRaVo?rA&A68+o`
    })]
})


export class AuthModule {}