const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('./db/mongoose');

const userRouter = require('./routers/user');

//middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api/user', userRouter);

//port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up and running on localhost ${port}.`);
});
