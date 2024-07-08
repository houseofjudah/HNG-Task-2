const request = require('supertest');
const app = require('../app');
const  { User } = require('../models/user.model');



    describe('Register endpoint', () =>{
        it('should register a user successfully', async () =>{
          const response = await request(app)
          .post('/auth/register')
          .send({
            firstName: 'Judah',
            lastName: 'Onunkwor',
            email: 'jchimgozrim28@gmail.com'
          });
        });
    });