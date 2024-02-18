const { MongoClient } = require("mongodb");

//function for connecting to the database
 async function connect () {
  //database connection
  const url = 'mongodb://localhost:27017/applicationdb';

  //variable for the db
  let client;

  //attempts to connect to the database
  //Otherwise shows the error that happend
  try {
    client = await MongoClient.connect(url);
    console.log('Connected Succesfully!');
  } catch(err) {
    console.log("Error: " + err);
  }

  return client;
}

//function for adding a new user to the database 
async function addUser(username, password) {
  let client;
  //connects to the database
  //Goes to the user collection
  try {
    client = await connect();
    const database = client.db();
    const collection = database.collection('users');

    // Checks if the user already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Inserts  new user into the database
    const result = await collection.insertOne({ username, password });
    console.log(`User ${username} added successfully`);

    //returns the user id and closes the database
    return result.insertedId;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; 
  } finally {
    
    if (client) {
      await client.close();
    }
  }
}

//function for logining in the user
async function loginUser(username, password) {
  //connects to the databse and finds the collection of users
  try {
    const client = await connect();
    const database = client.db();
    const collection = database.collection('users');

    //finds the username and password and sees if it is correct
    const user = await collection.findOne({ username, password });
    console.log('User found in the database:', user);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    console.log(`User ${username} logged in successfully`);

    await client.close();

    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

module.exports = { connect, addUser, loginUser };






  
