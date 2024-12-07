import { Module } from '@nestjs/common';
import { MatchDataController } from 'controller/match-data/match-data.controller';
import { MatchDataService } from 'feature/match-data/match-data.service';

@Module({
    controllers: [MatchDataController],
    providers: [MatchDataService],
})
export class MatchDataModule { }