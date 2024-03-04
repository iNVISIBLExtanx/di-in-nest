import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CatsService {
  constructor(private databaseService: DatabaseService) {}

  async findAllCats() {
    const db = await this.databaseService.connect();
    const catsCollection = db.collection('cats');
    return catsCollection.find().toArray();
  }
}
