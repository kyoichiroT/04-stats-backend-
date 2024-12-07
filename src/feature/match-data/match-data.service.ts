import { Injectable } from '@nestjs/common';
import { WinRatio } from './win-ratio.dto';
import { MatchDataRepository } from './match-data.repository';

@Injectable()
export class MatchDataService {
  constructor(private readonly matchDataRepository: MatchDataRepository) {}

  async getWinRatios(): Promise<WinRatio[]> {
    const winRatioData = await this.matchDataRepository.getWinRatiosfromS3();

    return winRatioData;
  }
}
