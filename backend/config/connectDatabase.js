const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/ecommence").then((con) => {
        console.log("mongoDB is connected to the host : " + con.connection.host);
    })
}
module.exports = connectDatabase;