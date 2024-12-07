import { ApiProperty } from '@nestjs/swagger';

export class WinRate {
    @ApiProperty({ example: 'Team A', description: 'The name of the team' })
    team: string;

    @ApiProperty({ example: 75, description: 'The win rate of the team' })
    winRate: number;
}