const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = "mongodb+srv://amitshekhar:<DATABASE_PASSWORD>@cluster0.fxx85.mongodb.net/BigApp?retryWrites=true&w=majority".replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(con => {
    console.log("db connection successful");
});

const server = app.listen(process.env.PORT , () => {
    console.log(`App listening at port ${process.env.PORT}`);
});
