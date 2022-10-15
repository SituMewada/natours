const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB =
//   'mongodb+srv://sitaram_mewada:AS75ASmEIp4SvIgL@cluster0.iaivv.mongodb.net/natours?retryWrites=true&w=majority';
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log('DB connection successfull');
  });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`over app is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
