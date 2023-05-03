import express from 'express';

import cors from 'cors';
import logger from 'morgan';

import config from './config';
import routes from './routes';
import * as error from './modules/error';
import { mongooseConnect } from './db/connent';

const app = express();

let corsOptions = {
    origin: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use('/calendar', routes);

app.use(error.errorPageNotFound);
app.use(error.errorHandler);

mongooseConnect().then(() => {
    console.log(`DB connected!`);
    app.listen(config.host.port, () => {
        console.log(`
      ################################################
      🛡️  Server listening on port: ${config.host.port}🛡️
      ################################################
    `);
    });
});
