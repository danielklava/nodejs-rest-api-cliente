import express, { Request, Response } from 'express';
import { NextFunction } from 'connect';

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import exjwt from 'express-jwt';
import logger from 'morgan';
import cors from 'cors';

const secretkey = 'private-key';

const jwtMW = exjwt({ secret: secretkey });

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initMiddlewares();
        this.initControllers(controllers);
    }

    initControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/api/v1', controller.router)
        });
    }

    initMiddlewares() {

        this.app.use(cors());
        //app.options('*', cors());
        this.app.use(logger());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.get('/', jwtMW, (req, res) => { res.send('Você está autenticado'); });

        // Error handling 
        this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
            if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
                res.status(401).send(err);
            }
            else {
                next(err);
            }
        });

        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type,Authorization,Accept');
            next();
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Listening on port: " + this.port);
        })
    }

}

export default App;