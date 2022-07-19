const app = require('./app');

const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env'})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});