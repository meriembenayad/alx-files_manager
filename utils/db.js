import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${this.database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const collection = this.client.db(this.database).collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    const collection = this.client.db(this.database).collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
