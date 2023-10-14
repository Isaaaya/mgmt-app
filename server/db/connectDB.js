const mongoose = require('mongoose');

module.exports = connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MONGODB...'))
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}