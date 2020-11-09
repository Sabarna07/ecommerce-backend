const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const braintree = require('braintree')

require('dotenv').config()
//Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const ordersRoutes = require('./routes/orders')

//app
const app = express()

//db
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true  }
  )
  .then(() => console.log('DB Connected'))
  
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Routes Middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',braintreeRoutes);
app.use('/api',ordersRoutes);

const PORT = process.env.PORT || 8000


//Server Running
app.listen(PORT,()=>{
    console.log(`Server runnig at port ${PORT}`);
})