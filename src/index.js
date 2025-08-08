const express = require('express');
const dotenv = require('dotenv').config();
const dbconnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productDetailsRoutes = require('./routes/productRoutes')
const trasactionRoute = require('./routes/trasactionRoute')
const formRoutes = require('./routes/formRoutes');
const byBaseDetails = require('./routes/dasboardBase')
const notificationDue = require('./routes/notificationRoute')
const VerificationDetails = require('./routes/verifcationDetails');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
//Middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "https://inventory-frontend-ruddy-ten.vercel.app", // ✅ allow your frontend
  credentials: true, // ✅ allow cookies and auth headers
}));

//routes
app.use('/api/auth',authRoutes);
app.use('/api/userinfo',userRoutes)
app.use('/api/products',productDetailsRoutes)
app.use('/api/inventory',formRoutes)
app.use('/api',trasactionRoute)
app.use('/api',byBaseDetails)
app.use('/api',notificationDue)
app.use('/api',VerificationDetails);
//app.use('/api/users',userRoutes);

//server-start
const PORT = process.env.PORT || 7002;
app.listen(PORT,async()=>{
    await dbconnect();
    console.log(`Server is Running at ${PORT}`);
})