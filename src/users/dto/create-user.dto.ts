import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
    id: number;
    user_name: string
    email: string
    password: string
    role: number
    salt: string
    token: string
}
