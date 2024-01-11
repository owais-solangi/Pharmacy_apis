const express = require("express");
const cors = require("cors");
const {sequelize, ConnectDb} = require('./config/db.config.js');
const app = express();
const path = require('path');
// const bodyparser = require('body-parser');
const PORT = process.env.PORT;
const Role = require("./models/role.model.js");
require('dotenv').config();
// let corsOptions = {
//   origin: `http://${process.env.HOST}:${process.env.PORT}`
// };
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// parse requests of content-type - application/x-www-form-urlencoded


require("./routes/user.routes.js")(app);
require("./routes/salesOrder.routes.js")(app);
require("./routes/sales.routes.js")(app);
require("./routes/purchaseOrder.routes.js")(app);
require("./routes/purchase.routes.js")(app);
require("./routes/product.routes.js")(app);
require("./routes/login.routes.js")(app);
// require("./routes/login.routes.js")(app);


app.post('/test-route', (req, res) => {
  console.log('Request Body:', req.body);
  res.send('Received a POST request!');
});

// app.use(RoleDefault);

app.listen(PORT,async()=>{
    console.log(`🚀 server is running on http://localhost:${PORT}`);
    await ConnectDb();
});



const Create_role = async () => {
    try {

       

      await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
      console.log('Tables created successfully.');
  
      // Creating roles
      await Role.create({ roleName: 'Admin' , username: "abcd" , email: 'abcd@gmail.com' });
      await Role.create({ roleName: "User" , username: "xyz" , email: 'xyz@gmail.com'});
    
  
      console.log('Roles created successfully.');

      
      console.log('Admin user created successfully:')
    } catch (error) {
      console.error('Error creating tables:', error);
    } finally {
    
      await sequelize.close();
    }
  }

  // Create_role();





