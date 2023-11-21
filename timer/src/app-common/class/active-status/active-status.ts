import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class ActiveStatus {
    @ApiProperty({
        type: 'number',
        description: "id of the user",
        example: 1,
        required: true
    })
    @IsNumber()
    id: number;
    @ApiProperty({
        type: 'boolean',
        description: "status",
        example: true,
        required: false
    })
    @IsBoolean()
    active?: boolean;
}
