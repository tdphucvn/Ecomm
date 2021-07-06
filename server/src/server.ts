if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: '.env'});
};

const PORT: string | number = process.env.PORT || 5000;

import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import itemsRoute from './routes/products';
import contactRoute from './routes/contact';
import authenticationRoute from './routes/authentication';

const app: Application = express();

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/items', itemsRoute);
app.use('/contact', contactRoute);
app.use('/authentication', authenticationRoute);

const uri: string = `${process.env.DB_CONNECTION}`;
const options = { useUnifiedTopology: true , useNewUrlParser: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}).catch (err => {
    console.log('Access denied');
    console.error(err);
});

