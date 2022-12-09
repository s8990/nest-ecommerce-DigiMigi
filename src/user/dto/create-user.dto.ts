import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly mobile: string;

    @IsNotEmpty()
    readonly password: string;

    readonly bio: string;

    readonly image: string;
}