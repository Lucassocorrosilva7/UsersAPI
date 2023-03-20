import { Body, Controller, Get, Post, Put, Patch, Delete, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";


@UseInterceptors(LogInterceptor) // Localmente apenas nesse controller
@Controller('users')

export class UserController {

    constructor(private readonly userService: UserService){}


@Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data);
    }
@Get()
    async list(){
        return this.userService.list();
    }

@Get(':id')
    async show(@ParamId() id: number ){
        return this.userService.show(id);
    }

@Put(':id')
    async update(@Body() data: UpdatePutUserDTO,@ParamId() id: number ){
        return this.userService.update(data, id)
    }

@Patch(':id')
 async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number ){
    return this.userService.updatePartial(data, id);
 }

@Delete(':id')
 async destroy(@ParamId() id: number ) {
    return this.userService.destroy(id);
 }
    
}