import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class CreateSubscriberDto {
    @ApiProperty({
        type: 'string',
        description: "John",
        example: "John",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: 'email',
        description: "John@eand.com",
        example: "John@eand.com",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: 'boolean',
        description: "Activate/Deactivate subscription",
        example: true,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    active: boolean;

    @ApiProperty({
        type: 'number',
        description: "userID",
        example: 1,
        required: false
    })
    @IsNumber()
    userId: number;
}
