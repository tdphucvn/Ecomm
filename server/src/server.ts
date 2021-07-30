if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: '.env'});
};

const PORT: string | number = process.env.PORT || 5000;
 
import express, {Application} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import productsRoute from './routes/products';
import contactRoute from './routes/contact';
import authenticationRoute from './routes/authentication';
import productsAdminRoute from './routes/admin/productsAdmin';
import paymentRouter from './routes/payment';
import ordersRouter from './routes/private/orders';
import path from 'path';

const app: Application = express();

app.use(cookieParser());


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static(path.join(__dirname, 'build')))


app.use('/api/products', productsRoute);
app.use('/api/products', productsAdminRoute);
app.use('/api/contact', contactRoute);
app.use('/api/authentication', authenticationRoute);
app.use('/api/payment', paymentRouter);
app.use('/api/orders', ordersRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const uri: string = `${process.env.DB_CONNECTION}`;
const options = { useUnifiedTopology: true , useNewUrlParser: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).then(() => {
    app.listen(PORT, () => console.log(`Server * running on PORT ${PORT}`));
}).catch (err => {
    console.log('Access denied');
    console.error(err);
});

