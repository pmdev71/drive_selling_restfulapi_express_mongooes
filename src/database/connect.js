const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://restfulapi_user:eqnl9L3N7y6jeJd1@restfulapi.ypourgq.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Database connected successfully...');
  })
  .catch((err) => {
    console.log('No connection !');
  });
