const { MongoClient } = require('mongodb');
const { connect, addUser, loginUser } = require('../db.js'); 

// Mock the MongoClient
jest.mock('mongodb');

describe('MongoDB Functions', () => {
  // Reset the mock after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //tests the db connect function
  describe('connect', () => {
    test('should connect to the database successfully', async () => {
      // Mock the MongoClient.connect function to resolve successfully
      MongoClient.connect.mockResolvedValueOnce('fakeDbConnection');

      const result = await connect();

      expect(result).toEqual('fakeDbConnection');
      expect(MongoClient.connect).toHaveBeenCalledWith(
        expect.stringContaining('mongodb://localhost:27017/applicationdb')
      );
    });

    test('should handle connection error', async () => {
      // Mocks the MongoClient.connect function to reject with an error
      MongoClient.connect.mockRejectedValueOnce(new Error('Connection error'));

      await expect(connect()).rejects.toThrowError('Connection error');
      expect(MongoClient.connect).toHaveBeenCalledWith(
        expect.stringContaining('mongodb://localhost:27017/applicationdb')
      );
    });
  });

  //Tests the add user fuction
  describe('addUser', () => {
    test('should add a new user successfully', async () => {
      // Mock the MongoClient.connect function to resolve successfully
      MongoClient.connect.mockResolvedValueOnce('fakeDbConnection');
      // Mock the collection.insertOne function to resolve successfully
      MongoClient.connect().db().collection().insertOne.mockResolvedValueOnce({ insertedId: 'fakeUserId' });

      const result = await addUser('testuser', 'testpassword');

      expect(result).toEqual('fakeUserId');
      expect(MongoClient.connect).toHaveBeenCalled();
      expect(MongoClient.connect().db().collection().insertOne).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      });
      expect(console.log).toHaveBeenCalledWith('User testuser added successfully');
      expect(MongoClient.connect().close).toHaveBeenCalled();
    });

    test('should handle existing user', async () => {
      // Mock the MongoClient.connect function to resolve successfully
      MongoClient.connect.mockResolvedValueOnce('fakeDbConnection');
      // Mock the collection.findOne function to resolve with an existing user
      MongoClient.connect().db().collection().findOne.mockResolvedValueOnce({ username: 'testuser' });

      await expect(addUser('testuser', 'testpassword')).rejects.toThrowError('Username already exists');
      expect(MongoClient.connect).toHaveBeenCalled();
      expect(MongoClient.connect().db().collection().findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(console.error).toHaveBeenCalledWith('Error adding user:', expect.any(Error));
      expect(MongoClient.connect().close).toHaveBeenCalled();
    });

    test('should handle database error during user addition', async () => {
      // Mock the MongoClient.connect function to resolve successfully
      MongoClient.connect.mockResolvedValueOnce('fakeDbConnection');
      // Mock the collection.insertOne function to reject with an error
      MongoClient.connect().db().collection().insertOne.mockRejectedValueOnce(new Error('Database error'));

      await expect(addUser('testuser', 'testpassword')).rejects.toThrowError('Database error');
      expect(MongoClient.connect).toHaveBeenCalled();
      expect(MongoClient.connect().db().collection().insertOne).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      });
      expect(console.error).toHaveBeenCalledWith('Error adding user:', expect.any(Error));
      expect(MongoClient.connect().close).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    test('should log in a user successfully', async () => {
      // Mock the MongoClient.connect function to resolve successfully
      MongoClient.connect.mockResolvedValueOnce('fakeDbConnection');
      // Mock the collection.findOne function to resolve with a matching user
      MongoClient.connect().db().collection().findOne.mockResolvedValueOnce({ username: 'testuser', password: 'testpassword' });

      const result = await loginUser('testuser', 'testpassword');

      expect(result).toEqual({ username: 'testuser', password: 'testpassword' });
      expect(MongoClient.connect).toHaveBeenCalled();
      expect(MongoClient.connect().db().collection().findOne).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      });
      expect(console.log).toHaveBeenCalledWith('User found in the database:', { username: 'testuser', password: 'testpassword' });
      expect(console.log).toHaveBeenCalledWith('User testuser logged in successfully');
      expect(MongoClient.connect().close).toHaveBeenCalled();
    });

    test('should handle invalid credentials during login', async () => {
      // Mock the MongoClient.connect function to resolve successfully
      MongoClient.connect.mockResolvedValueOnce('fakeDbConnection');
      // Mock the collection.findOne function to resolve with no matching user
      MongoClient.connect().db().collection().findOne.mockResolvedValueOnce(null);

      await expect(loginUser('testuser', 'testpassword')).rejects.toThrowError('Invalid username or password');
      expect(MongoClient.connect).toHaveBeenCalled();
      expect(MongoClient.connect().db().collection().findOne).toHaveBeenCalledWith({
        username})})
      })
    });