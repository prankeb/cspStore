
const request = require('supertest');
const express = require('express');
const app = require('../server'); 

//tests the connection to database
describe('Express App Tests', () => {
  test('should respond with a success message when connecting to the database', async () => {
    const response = await request(app).get('/connect');
    //Should recive a 200 message
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Connected to the database successfully');
  });

  //Test for resgistering a user
  test('should register a user and respond with a success message', async () => {
    const response = await request(app)
        //sends a username and password to register
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User added successfully');
    expect(response.body.userId).toBeDefined();
  });

  //Testing for logging in user
  test('should log in a user and respond with a success message', async () => {
   
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toBeDefined();
  });

});