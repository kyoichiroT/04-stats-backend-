import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './feature/app.service';
import { MatchDataModule } from './modules/match-data/match-data.modules';

@Module({
  imports: [MatchDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
