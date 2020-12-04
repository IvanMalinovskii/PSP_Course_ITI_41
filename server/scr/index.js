const express = require('express');
const app = express();
const GameProcess = require('./game/GameProcess').GameProcess;
const ReadyStatus = require('./game/ReadyStatus').ReadyStatus;
const connectionRouter = require('./routers/connectionRouter');
const processRouter = require('./routers/processRouter');
let gameProcess = null;
let readyStatus = null;
app.use(express.json());
app.use(require('cors')());
app.listen(process.env.PORT || 5000, (error) => {
   if (error) console.log('ERROR!!');
   else {
       console.log('CONNECTED');
       gameProcess = new GameProcess();
       readyStatus = new ReadyStatus();
       connectionRouter.setProps(readyStatus, gameProcess);
       processRouter.setProps(gameProcess);
   }
});

app.use('/', connectionRouter.router);
app.use('/', processRouter.router);