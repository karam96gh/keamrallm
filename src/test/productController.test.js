const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../app'); // Assuming this is the path to your Express app
const { io } = require('../app'); // Assuming this is the path to your 'io' instance
const { addProduct } = require('../Controller/ProductController'); // Import your controller function
describe('addProduct', () => {
    it('should emit updateLatestProducts event', (done) => {
     
        console.log("hiiiiiii");

      // Simulate a request to your addProduct function
      supertest(app)
        .post('/api/product/add-product') // Adjust the route as needed
        .end((err, res) => {
          if (err) 
          {
            console.log("hiiiiiii2");


            return done(err);

          }
          console.log("hiiiiiii");

          // Expect a successful response
          expect(res.status).to.equal(200);
          console.log("hiiiiiii");

          // Now, check if the event was emitted
          const expectedEventData = { action: 'update', data: { "id": 1 } };
          io.on('updateLatestProducts', (data) => {
            expect(data).to.deep.equal(expectedEventData);
            console.log("hiiiiiii");

            done(); // Signal that the test is complete'
            console.log("hiiiiiii");

          });
        });
    });
  });
  