if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: '.env'});
};

const PORT: string | number = process.env.PORT || 5000;

import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import productsRoute from './routes/products';
import contactRoute from './routes/contact';
import authenticationRoute from './routes/authentication';
import productsAdminRoute from './routes/admin/productsAdmin';


const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.use('/products', productsRoute);
app.use('/products', productsAdminRoute);
app.use('/contact', contactRoute);
app.use('/authentication', authenticationRoute);

app.use(cookieParser());    

const uri: string = `${process.env.DB_CONNECTION}`;
const options = { useUnifiedTopology: true , useNewUrlParser: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}).catch (err => {
    console.log('Access denied');
    console.error(err);
});

