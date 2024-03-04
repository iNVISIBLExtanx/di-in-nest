import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class DatabaseService {
  private db: Db;
  private client: MongoClient;

  async connect(): Promise<Db> {
    if (!this.db) {
      this.client = new MongoClient('mongodb://localhost:27017');
      await this.client.connect();
      this.db = this.client.db('catsDb');
    }
    return this.db;
  }
}
