const mongoose = require('mongoose');


const main = async () =>{
  // await mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  await mongoose.connect("mongodb+srv://userumum:userumum@cluster0.wnsme2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports= {main}