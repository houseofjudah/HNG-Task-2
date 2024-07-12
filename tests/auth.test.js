const request = require('supertest');
const app = require('../app');
const  { User } = require('../models/user.model');
const { DESCRIBE } = require('sequelize/lib/query-types');



    describe('Register endpoint', () => {
        it('should register a user successfully', async () => {
          const response = await request(app)
          .post('/auth/register')
          .send({
            firstName: 'Judah',
            lastName: 'Onunkwor',
            email: 'jchimgozrim28@gmail.com'
          });
        });
    });


  
  
  describe('Login endpoint', () => {
    it('should login registered user', async () => {
      const response = await request(app)
      .POST('/auth/login')
      .send({
        

      });
    });
  });