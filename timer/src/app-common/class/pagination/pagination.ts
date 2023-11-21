import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmpty, IsInt, IsNumber, IsOptional, isEmpty } from 'class-validator';
import { INTEGER } from 'sequelize';

export class Pagination {
    @ApiProperty({
        type: 'number',
        description: "limit",
        example: 20,
        required: false
    })
    @IsInt()
    @IsOptional()
    @Type(() => INTEGER)
    limit: number;

    @ApiProperty({
        type: 'number',
        description: "offset",
        example: 0,
        required: false,
        
    })
    @IsOptional()
    @IsInt()
    @Type(() => INTEGER)
    offset: number;
}
