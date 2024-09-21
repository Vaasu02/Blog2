const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
}

dbConnect().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})

module.exports = { dbConnect };