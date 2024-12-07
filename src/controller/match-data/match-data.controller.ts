import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MatchDataService } from 'feature/match-data/match-data.service';
import { WinRate } from 'feature/match-data/win-rate.dto';


@Controller('match-data')
export class MatchDataController {
    constructor(private readonly matchDataService: MatchDataService) { }

    @Get('/win-rate')
    @ApiOperation({ summary: '勝率データを取得します' })
    @ApiResponse({ status: 200, description: '勝率データが返却されました' })
    @ApiOkResponse({ description: '勝率のデータ', type:[WinRate]})
        
    async getWinRate(): Promise<WinRate[]> {
        return this.matchDataService.getWinRates();
    }
}