const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env'})

// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});