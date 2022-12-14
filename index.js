const express = require('express');
const orderRouter = require('./routes/orderRoutes');
const cartRouter = require('./routes/cartRoutes');
const helmet = require('helmet');
const AppError = require('./utils/appError');
require('./config/winston');
const globalErrorHandler = require('./utils/errorHandler').errorHandler;
const compression = require('compression');
const dbConnect = require('./config/dbconnect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ['https://techdaily2022.netlify.app', 'http://localhost:3001', 'https://techdaily2023.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(compression());

app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use('/api/orders', orderRouter);
app.use('/api/carts', cartRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
