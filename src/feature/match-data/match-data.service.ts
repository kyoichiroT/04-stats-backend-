import { Injectable } from '@nestjs/common';
import { WinRate } from './win-rate.dto';

@Injectable()
export class MatchDataService {
    private readonly items = [];

    async getWinRates(): Promise<WinRate[]> {
        return [];
    }
}