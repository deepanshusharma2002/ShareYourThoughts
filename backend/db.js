
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb+srv://ds4244431:cB1AyFWYEjlNWzc8@cluster0.ch0vj.mongodb.net/blogVega6'); // Your DB URI
      console.log('✅ MongoDB connected');
    }
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;



