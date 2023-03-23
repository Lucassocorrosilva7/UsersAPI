import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString, IsEnum } from "class-validator";
import { Role } from "src/enums/roles.enum";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsDateString()
    birthAt: string

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,        
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;

}