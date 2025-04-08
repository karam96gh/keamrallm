
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const socket = require('./socket'); // Import the socket.js module

require('dotenv').config();

const app = express();

// HTTPS configuration
const httpsOptions = {
  key: fs.readFileSync('C:/Users/Admin/Backend-E_commerce-Products-NodeJs-main/Backend-E_commerce-Products-NodeJs-main/src/passss.pem'),
  cert: fs.readFileSync('C:/Users/Admin/Backend-E_commerce-Products-NodeJs-main/Backend-E_commerce-Products-NodeJs-main/src/cer.pem')
};

const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(app);
const { init } = socket;
const { httpsIo, httpIo } = init(httpServer, httpsServer);
// Import socket.io and configure it for both servers


httpsIo.on('connection', (socket) => {
  console.log('A client connected via HTTPS.');
  // Handle HTTPS socket events here

  socket.on('disconnect', () => {
    console.log('A client disconnected via HTTPS.');
  });
});

httpIo.on('connection', (socket) => {
  console.log('A client connected via HTTP.');
  // Handle HTTP socket events here

  socket.on('disconnect', () => {
    console.log('A client disconnected via HTTP.');
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', require('./Routes/user.routes'));
app.use('/api', require('./Routes/auth.routes'));


app.use('/api', require('./Routes/product.routes'));
app.use('/api', require('./Routes/category.routes'));
app.use('/api', require('./Routes/companies.routes'));
app.use('/api', require('./Routes/ads.routes'));
app.use('/api', require('./Routes/bills.routes'));
app.use('/api', require('./Routes/orders.routes'));
app.use('/api', require('./Routes/uploadsImages.routes'));
app.use('/api', require('./Routes/event.routes'));

app.use('/api', require('./RoutesResturants/bills.routes'));
app.use('/api', require('./RoutesResturants/meals.routes'));
app.use('/api', require('./RoutesResturants/categories.routes'));
app.use('/api', require('./RoutesResturants/sub_categories.routes'));
app.use('/api', require('./RoutesResturants/resturants.routes'));
app.use('/api', require('./RoutesResturants/ads.routes'));
app.use('/api', require('./RoutesResturants/orders.routes'));

app.use('/api', require('./RoutesMarket/bills.routes'));
app.use('/api', require('./RoutesMarket/product.routes'));
app.use('/api', require('./RoutesMarket/category.routes'));
// app.use('/api', require('./RoutesMarket/sub_categories.routes'));
app.use('/api', require('./RoutesMarket/companies.routes'));
app.use('/api', require('./RoutesMarket/ads.routes'));
app.use('/api', require('./RoutesMarket/orders.routes'));
app.use('/api', require('./RoutesMarket/uploadsImages.routes'));
app.use('/api', require('./RoutesMarket/delivery.routes'));

app.use((req, res, next) => {
  console.log(`Request for file: ${req.url} ${req.ip}`);
  next();
});

// Serve static files over HTTPS
app.use(express.static(path.join(__dirname, 'Uploads/Profile')));
app.use(express.static(path.join(__dirname, 'Uploads/Home')));
app.use(express.static(path.join(__dirname, 'Uploads/Products')));
app.use(express.static(path.join(__dirname, 'Uploads/Categories')));
app.use(express.static(path.join(__dirname, 'Uploads/market')));
app.use(express.static(path.join(__dirname, 'Uploads/emmal')));

app.use(express.static(path.join(__dirname, '.well-known')));

app.use(express.static(path.join(__dirname, 'Uploads')));
// ... (other static file configurations)

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.sendFile(path.join(__dirname, '.well-known', 'assetlinks.json'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'Uploads', 'emmal', 'indexx.html'));
});
app.get('/remove-account', (req, res) => {
  res.sendFile(path.join(__dirname, 'Uploads', 'emmal', 'remove.html'));
});
app.get('/prod', (req, res) => {
  res.sendFile(path.join(__dirname, 'Uploads', 'emmal', 'prod.html'));
});
app.get('/contact-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'Uploads', 'contact.html'));
});

// Start both HTTP and HTTPS servers
const hostname = '10.0.18.66';
const httpsPort = 443;
// const httpPort = 80;

// httpServer.listen(httpPort, hostname, () => {
//   console.log('HTTP Server running on port ' + httpPort);
// });

httpsServer.listen(httpsPort, hostname, () => {
  console.log('HTTPS Server running on port ' + httpsPort);
});

module.exports = { app, httpsServer, httpServer, httpsIo, httpIo };
