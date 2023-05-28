const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection.js');
const path = require('path');
const {authMiddleware} = require('./utils/auth.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const PORT = 3001 || process.env.PORT;

const app = express();
app.use(express.urlencoded({extented:false}));
app.use(express.json());

const startServer = async(typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({app});

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../client/build')));
  }

  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
  });

  db.once('open', ()=>{
    app.listen(PORT, () =>{
      console.log(`api server running on port ${PORT}`);
      console.log(`use graphql at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startServer(typeDefs, resolvers);