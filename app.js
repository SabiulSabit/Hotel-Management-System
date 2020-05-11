const express =  require('express');
const path    =  require('path');
const bodyParser = require('body-parser');


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

//own module
const userRouter = require('./routes/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(userRouter);

app.listen(3000, () => console.log("Server is Running..."));