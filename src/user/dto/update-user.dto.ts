import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {

    readonly name: string;

    readonly email: string;

    readonly mobile: string;

    readonly bio: string;

    readonly image: string;
}