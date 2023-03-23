import { Body, Controller, Get, Post, Put, Patch, Delete, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard,RoleGuard)
@UseInterceptors(LogInterceptor) 
@Controller('users')

export class UserController {

    constructor(private readonly userService: UserService){}

@Roles(Role.Admin)
@Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data);
    }

@Roles(Role.Admin)
@Get()
    async list(){
        return this.userService.list();
    }

@Roles(Role.Admin)
@Get(':id')
    async show(@ParamId() id: number ){
        return this.userService.show(id);
    }

@Roles(Role.Admin)
@Put(':id')
    async update(@Body() data: UpdatePutUserDTO,@ParamId() id: number ){
        return this.userService.update(data, id)
    }

@Roles(Role.Admin)
@Patch(':id')
 async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number ){
    return this.userService.updatePartial(data, id);
 }

@Roles(Role.Admin)
@Delete(':id')
 async destroy(@ParamId() id: number ) {
    return this.userService.destroy(id);
 }
    
}