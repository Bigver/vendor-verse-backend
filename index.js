import app from './app.js';
import sequelize from './database.js';
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});



