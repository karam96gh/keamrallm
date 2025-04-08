const socketIo = require('socket.io');

let httpIo; // Initialize HTTP Socket.IO instance
let httpsIo; // Initialize HTTPS Socket.IO instance

module.exports = {
  init: (httpServer, httpsServer) => {
    httpIo = socketIo(httpServer, {
      cors: {
        origin: '*',
      },
    });

    httpsIo = socketIo(httpsServer, {
      cors: {
        origin: '*',
      },
    });

    return { httpIo, httpsIo };
  },
  getHttpIO: () => {
    if (!httpIo) {
      throw new Error('HTTP Socket.io not initialized.');
    }
    return httpIo;
  },
  getHttpsIO: () => {
    if (!httpsIo) {
      throw new Error('HTTPS Socket.io not initialized.');
    }
    return httpsIo;
  },
};
