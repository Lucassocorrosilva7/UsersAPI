import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from "bcrypt";



@Injectable()

export class UserService {
    constructor(private readonly prisma: PrismaService) {
        this.prisma.user
    }

    async create(data: CreateUserDTO) {

        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({ data })
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async show(id: number) {

        await this.exists(id);

        return this.prisma.user.findUnique({
            where: {
                id,
            }
        });
    }

    async update({ name, email, birthAt, password, role }: UpdatePutUserDTO, id: number) {

        await this.exists(id);

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);


        return this.prisma.user.update({
            where: { id },
            data: { name, email, password, birthAt: birthAt ? new Date(birthAt) : null, role },
        });
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


        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async destroy(id: number) {
        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if ((!await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`o usuário ${id} não existe.`)
        }
    }
}