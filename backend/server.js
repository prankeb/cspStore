const express = require('express');
const path = require('path');
const { connect, addUser, loginUser } = require('./db'); 
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//Allows for communcation between server and client on different ports
app.use(cors());

//Uses express to give data to the client in json format
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../build'));

  // Serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}




// Route for connecting to the database
app.get('/connect', async (req, res) => {
  //connects to the database
  try {
    const client = await connect();
    res.json({ message: 'Connected to the database successfully' });

    // Close the database connection when done 
    await client.close();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Route for registering a user on the site
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //Calls the add user function from the database and plugs in the new username and password
    try {
      const userId = await addUser(username, password);
      res.json({ message: 'User added successfully', userId });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

  //Route for logging in the user
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    //Calls the login user function to log in the user
    try {
      const user = await loginUser(username, password);
      res.json({ message: 'Login successful', user });
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

 