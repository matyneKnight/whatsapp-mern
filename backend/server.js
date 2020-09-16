//importing
import express from 'express';
import mongoose from 'mongoose';
import Pusher from "pusher";
import cors from 'cors';

import dbMessages from './dbMessages.js';

//app configs
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1073579',
  key: '77590d34eeb84fd58081',
  secret: '351a68f1dc809cfdfcd0',
  cluster: 'mt1',
  encrypted: true
});

//middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = 'mongodb+srv://admin:OjMupLARd0c6WtP9@cluster0.v27yk.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ??
const db = mongoose.connection;
db.once('open', () => {
  console.log("DB is connected");

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) =>  {
    console.log("A Change occured", change);

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'insert', 
        {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received
        }
      );
    }
  });

});

// api routes
app.get('/', (req, res) => {
  return res.status(200).send('hello world');
});

app.get('/api/v1/messages/sync', (req, res) => {
  dbMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/api/v1/messages/new', (req, res) => {
  const dbMessage = req.body;

  dbMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});