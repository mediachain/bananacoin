import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import initializeDb from './db';
import initializeChain from './chain';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit : config.bodyLimit
}));

initializeDb(db => {
  initializeChain({config, db}, chain => {
    app.use(middleware({ config, db }));
    app.use('/api', api({ config, db }));
    app.server.listen(process.env.PORT || config.port);
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
