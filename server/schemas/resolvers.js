const {Users, Products} = require('../models');
const {signToken} = require('../utils/auth.js');

const resolvers = {
    Query: {
        print: () => {
            return "Okay";
        }
    }
};

module.exports = resolvers;