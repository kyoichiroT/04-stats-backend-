import { Injectable } from '@nestjs/common';
import { WinRate } from './win-rate.dto';

@Injectable()
export class MatchDataRepository {
    
    async getWinRatesFromS3(): Promise<WinRate[]> {
        // S3からデータを取得するロジックをここに記述
        return [];
    }
}