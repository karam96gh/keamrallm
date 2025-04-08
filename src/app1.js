const express = require('express');
const path = require('path');
const multer = require('multer');

require('dotenv').config();

// Import socket.io and configure it
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('./socket'); // Import the socket.js module
const io = socket.init(server);


io.on('connection', (socket) => {
    console.log('A client connected.');
    io.emit('c', { action: 'update', data: {"id":1} });

    // You can add WebSocket logic here to send real-time updates to clients.
    // For example, when something changes in the database, you can emit an event to inform clients.
  
    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });
  });
  
  //uploads 
  
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


// This folder will be Public
app.use(express.static(path.join(__dirname, 'Uploads/Profile')));
app.use(express.static(path.join(__dirname, 'Uploads/Home')));
app.use(express.static(path.join(__dirname, 'Uploads/Products')));
app.use(express.static(path.join(__dirname, 'Uploads/Categories')));
app.use(express.static(path.join(__dirname, 'Uploads')));

module.exports = { app, server };