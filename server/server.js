const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//const PORT = process.env.PORT || 5000;
const secretKey = "smartpark7250561528"; // move to .env in real apps

//  MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected successfully'))
.catch((err) => console.error(' MongoDB connection error:', err));

//  Razorpay Setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

//  Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: 'smartpark-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}));

//  Static Frontend Files
app.use(express.static(path.join(__dirname, '../client')));

//  API Routes
app.use('/api/emergency', require('./routes/emergencies'));
app.use('/api/incident', require('./routes/incident'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/history', require('./routes/history'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/violations', require('./routes/Violations'));
app.use('/api/feedback', require('./routes/feedback'));


//  Razorpay Order Route
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: parseInt(amount),
      currency: 'INR',
      receipt: 'receipt_order_' + Math.random().toString(36).slice(2),
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

//  Auth Middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

//  Optional direct HTML routes (if needed)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dashboard.html'));
});

//  Fallback to index.html (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//  Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/feedback.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/feedback.html'));
});

app.post('/verify', async (req, res) => {

  try {
    console.log("Incoming Razorpay verification payload:", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const crypto = require('crypto');
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Signature verification failed.");
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    console.log("Payment verified successfully.");
    res.json({ success: true });

  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});












// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./db');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const Razorpay = require('razorpay');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');

// // Load env
// dotenv.config();
// const secretKey = "smartpark7250561528"; // Use env in real project
// // const PORT = process.env.PORT || 3000;

// // Routes
// const emergencyRoutes = require('./routes/emergencies');
// const incidentRoutes = require('./routes/incident');
// const authRoutes = require('./routes/auth');
// const bookingRoutes = require('./routes/booking');
// const adminRoutes = require('./routes/admin');
// const historyRoutes = require('./routes/history');
// const paymentRoutes = require('./routes/payment');

// const app = express();
// connectDB();

// //  MongoDB Connection
// // mongoose.connect('mongodb://localhost:27017/smartcity')
// // const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log(' MongoDB connected successfully'))
//   .catch((err) => console.error(' MongoDB connection error:', err));


//   // After this, all models can use the same connection
// const User = require('./models/user'); // Correct usage

// //  Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(session({
//   secret: 'smartpark-secret',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: 'mongodb://rajkumarjamuib733:Rajkumar2004@localhost:27017/smartcity' })
// }));

// //  Routes
// app.use('/api/emergency', emergencyRoutes);
// app.use('/api/incident', incidentRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/booking', bookingRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/history', historyRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/vehicles', require('./routes/vehicles'));
// app.use('/api/violations', require('./routes/Violations'));
// app.use('/api/emergencies', require('./routes/emergencies'));

// //  Razorpay Instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// //  Razorpay Order Route
// app.post('/create-order', async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: parseInt(amount),
//       currency: 'INR',
//       receipt: 'receipt_order_' + Math.random().toString(36).slice(2),
//       payment_capture: 1
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(200).json(order);
//   } catch (err) {
//     console.error('Error creating Razorpay order:', err);
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// });

// //  Auth Middleware
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// //  Static Frontend
// app.use(express.static(path.join(__dirname, '../client')));

// //  Fallback Route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

// app.get('/test/:id', (req, res) => res.send('OK'));
// app.listen(3000, () => console.log('Server running'));
// //  Start server
// const PORT = process.env.PORT || 27017;
// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });

// Good usage
// app.use('/api/user/id', userRouter);       // with param name "id"
// app.use('/api/admin', adminRouter);         // static path
