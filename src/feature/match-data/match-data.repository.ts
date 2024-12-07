import { Injectable } from '@nestjs/common';
import { WinRatio } from './win-ratio.dto';
import * as AWS from 'aws-sdk';
import * as csv from 'csv-parser';

type S3WinRatioData = {
  firstPlayer: string;
  secondPlayer: string;
  winner: string;
};
@Injectable()
export class MatchDataRepository {
  private readonly s3 = new AWS.S3();
  private readonly bucketName = '04-matchdata';

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.s3 = new AWS.S3();
  }

  async getWinRatiosfromS3(): Promise<WinRatio[]> {
    const winRatios: S3WinRatioData[] = [];
    const files = await this.listFilesInS3Bucket();

    for (const file of files) {
      const fileWinRatios = await this.parseCsvFromS3(file);
      winRatios.push(...fileWinRatios);
    }

    return this.aggregateWinRatios(winRatios);
  }

  private async listFilesInS3Bucket(): Promise<string[]> {
    const params = {
      Bucket: this.bucketName,
    };

    const data = await this.s3.listObjectsV2(params).promise();
    if (!data.Contents) {
      return [];
    }
    return data.Contents.map((item) => item.Key).filter(
      (key): key is string => key !== undefined,
    );
  }

  private async parseCsvFromS3(key: string): Promise<S3WinRatioData[]> {
    const winRatios: S3WinRatioData[] = [];
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    return new Promise((resolve, reject) => {
      this.s3
        .getObject(params)
        .createReadStream()
        .pipe(csv())
        .on('data', (data) => {
          const winRatio: S3WinRatioData = {
            firstPlayer: data.firstPlayer,
            secondPlayer: data.secondPlayer,
            winner: data.winner,
          };
          winRatios.push(winRatio);
        })
        .on('end', () => resolve(winRatios))
        .on('error', (error) => reject(error));
    });
  }

  private aggregateWinRatios(winRatios: S3WinRatioData[]): WinRatio[] {
    let matchCount = 0;
    let firstPlayerWin = 0;
    let secondPlayerWin = 0;
    let draw = 0;

    const data = winRatios.map((winRatio) => {
      matchCount++;
      if (winRatio.winner === winRatio.firstPlayer) {
        firstPlayerWin++;
      } else if (winRatio.winner === winRatio.secondPlayer) {
        secondPlayerWin++;
      } else {
        draw++;
      }
      return {
        match_count: matchCount,
        first_player_win: firstPlayerWin,
        second_player_win: secondPlayerWin,
        draw: draw,
      };
    });
    return data;
  }
}
