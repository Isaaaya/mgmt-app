require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./db/connectDB');
const cors = require('cors');

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))


const start = async () => {
    await connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}...`)
            })
        })
        .catch((error) => console.log(error));
}

start();