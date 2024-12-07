import { ApiProperty } from '@nestjs/swagger';

export class WinRate {
    @ApiProperty({ example: '1000', description: '全体のマッチ数' })
    total_match_count: number;

    @ApiProperty({ example: 0.6, description: '先手の勝率' })
    first_player_winRate: number;

    @ApiProperty({ example: 0.4, description: '後手の勝率' })
    second_player_winRate: number;
    
    @ApiProperty({ example: 0.1, description: '引き分けの割合' })
    drawRate: number;
}