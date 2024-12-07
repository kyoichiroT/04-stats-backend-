import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MatchDataService } from 'feature/match-data/match-data.service';
import { WinRatio } from 'feature/match-data/win-ratio.dto';

@Controller('match-data')
export class MatchDataController {
  constructor(private readonly matchDataService: MatchDataService) {}

  @Get('/win-ratio')
  @ApiOperation({ summary: '勝率データを取得します' })
  @ApiResponse({ status: 200, description: '勝率データが返却されました' })
  @ApiOkResponse({ description: '勝率のデータ', type: [WinRatio] })
  async getWinRate(): Promise<WinRatio[]> {
    return this.matchDataService.getWinRatios();
  }
}
