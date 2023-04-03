import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async create(data: CreateUserDTO) {
        if (await this.usersRepository.exist({
            where: {email: data.email}
        })) {
            throw new BadRequestException('Este e-mail já está sendo utilizado.');
        }
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);

    }

    async list() {
        return this.usersRepository.find();
    }

    async show(id: number) {
        await this.exists(id);
        return this.usersRepository.findOneBy({
            id
        });
    }

    async update({ name, email, birthAt, password, role }: UpdatePutUserDTO, id: number) {

        await this.exists(id);

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);


        await this.usersRepository.update(id, {
            name,
            email,
            password,
            birthAt: birthAt ? new Date(birthAt) : null,
            role,
        });

        return this.show(id);
    }

    async updatePartial({ name, email, birthAt, password, role }: UpdatePatchUserDTO, id: number) {

        await this.exists(id);


        const data: any = {};

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (name) {
            data.name = name;
        }

        if (email) {
            data.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        }

        if (role) {
            data.role = role;
        }


        await this.usersRepository.update(id, data);

        return this.show(id);

    }

    async destroy(id: number) {
        await this.exists(id);

        return this.usersRepository.delete(id);
    }

    async exists(id: number) {


        if (!(await this.usersRepository.exist({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`o usuário ${id} não existe.`)
        }
    }
}