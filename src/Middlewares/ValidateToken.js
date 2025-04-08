const validateToken = ( req, res, next ) => {

    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');
      res.status(401).send('Page Not Found');
      console.log('auth error');

      return;
    }
  
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];
    

    if (username !== 'b@e!sh#e78784jfeejdr' || password !== 'b@e!sh#e78784jfeejdr') {
      if (username !== 'besher' || password !== 'besher'){
      res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');
      res.status(401).send('Page Not Found');
      console.log('auth ');


      return;
    }
    }
    // Authentication successful

    next();
  }

module.exports = {
    validateToken
}