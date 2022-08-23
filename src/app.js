var cookieParser = require('cookie-parser');
const express = require('express');
require('./database/connect');
const User = require('./models/users');
const Package = require('./models/packages');
const { route } = require('express/lib/application');
const userRouter = require('./routers/userRouter');
const packageRouter = require('./routers/packageRouter');
const orderRouter = require('./routers/orderRouter');

const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(packageRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`Running server at port ${port}`);
});
