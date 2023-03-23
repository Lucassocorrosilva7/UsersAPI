
import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDTO } from "./create-user.dto";

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {
    name: string;
    email: string;
    birthAt: string;
    password: string;
    role: number;
}