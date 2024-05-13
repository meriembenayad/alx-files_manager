import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ error: 'Missing email' });
      return;
    }

    if (!password) {
      res.status(400).send({ error: 'Missing password' });
      return;
    }

    const user = await dbClient.users.findOne({ email });
    if (user) {
      res.status(400).send({ error: 'Already exist' });
      return;
    }

    const hashedPassword = sha1(password);
    const newUser = await dbClient.users.insertOne({ email, password: hashedPassword });
    res.status(201).send({ id: newUser.insertedID, email });
  }
}

export default UsersController;
