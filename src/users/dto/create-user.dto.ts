export class CreateUserDto {
    id: number;
    user_name: string
    email: string
    password: string
    role_id: number
    salt: string
    token: string
}
