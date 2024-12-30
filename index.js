const express = require("express");
const { connectMongo } = require("./connect");
const urlRoute = require("./router/urlRoute");
const userRoute = require('./router/userRoute')
const URL = require("./models/urlModel");
const staticRoute = require('./router/staticRouter')
const path = require('path')
const app = express();
const {request} = require('http')
const cookieParser = require('cookie-parser')
const {checkforAuthentication , restrictTo, restrictTologgedinUseOnly, checkAuth} = require('./middleware/middleAuth')
const PORT = 5000;

 connectMongo("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
 );


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use(express.json());
 app.use(express.urlencoded({ extended: false }));// to parse form data
app.use(cookieParser());
 app.use(checkforAuthentication)




app.set('view engine' , 'ejs'); // telling view engine is ejs
 app.set('views' , path.resolve('./views')) // set path

//app.use("/url", restrictTologgedinUseOnly , urlRoute);
app.use("/url", restrictTo(['NORMAL']),  urlRoute);

app.use('/user' , userRoute)
app.use('/',  staticRoute);




//app.use('/', checkAuth ,  staticRoute);

