import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsEmpty, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        type: 'string',
        description: "root",
        example: "root",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: 'password',
        description: " password for the user name ",
        example: "SpotTiger$666",
        required: true
    })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        type: 'boolean',
        description: "Activate/Deactivate user",
        example: true,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    active: boolean;

}

export class ValidateUserDto {
    @ApiProperty({
        type: 'string',
        description: "root",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: 'password',
        description: " password for the user name ",
        example: "SpotTiger$666",
        required: true
    })
    @IsNotEmpty()
    password: string;
}
