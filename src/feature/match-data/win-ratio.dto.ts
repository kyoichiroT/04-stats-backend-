import { ApiProperty } from '@nestjs/swagger';

export class WinRatio {
  @ApiProperty({ example: 1000, description: '全体のマッチ数' })
  match_count: number;

  @ApiProperty({ example: 600, description: '先手の勝数' })
  first_player_win: number;

  @ApiProperty({ example: 400, description: '後手の勝数' })
  second_player_win: number;

  @ApiProperty({ example: 100, description: '引き分けの数' })
  draw: number;
}
