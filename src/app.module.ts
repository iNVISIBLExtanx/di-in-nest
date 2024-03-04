import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, DatabaseService],
})
export class AppModule {}
