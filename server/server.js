const express = require('express');
const PORT = 3001;

const app = express();
app.use(express.urlencoded({extented:false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
  });
  
  app.listen(PORT,console.log("SERVER RUNNING"));