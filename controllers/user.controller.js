const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const Role = require('../models/role.model.js');
const upload = require('../utils/fileUploads.js');
const { Op } = require('sequelize');
const multer = require('multer');

// const Createuser = async (req,res)=> {
//     try {
        
//         const {firstname,lastname,phone,email,password,image} = req.body;
//         console.log(firstname,lastname,phone,email,password,image ,"data");
//         if(!firstname||!lastname||!phone || !email || !password ||!image ){
//             res.send("Plz filed all the field.......").status(400);
//         }
//         const existingUser = await User.findOne({where:{email}});
//         if(existingUser){
//             console.log(existingUser ,"data");
//             return res.send("user is already exist.....").status(401);
            
//         }else{

//            const hashPassword = await bcrypt.hash(password,10);
           
//            const user =  User.build({firstname,lastname,phone,email,password:hashPassword,image});
//            const newUser = user.save();
            
//             if(!newUser){
//                 return res.send('Invalid user added......!').status(400);
//             }else{
//             console.log("Error: ",newUser);
//               return res.send("User added to database succesfully.....");
//             }
            
        

//         }
        
            
       

//     } catch (error) {
        
//     }
// }

// const CreateUser = async (req, res) => {
//     try {
//       const { firstname, lastname, phone, email, password,RoleName } = req.body;
//       console.log(firstname, lastname, phone, email, password, "data");
  
//       if (!firstname || !lastname || !phone || !email || !password || !RoleName) {
//         res.send("Plz filed all the field.......").status(400);
//       }
  
//       const existingUser = await User.findOne({ where: { email } });
  
//       if (existingUser) {
//         console.log(existingUser, "data");
//         return res.send("user is already exist.....").status(401);
//       } else {
//         const hashPassword = await bcrypt.hash(password, 10);
  
//         // Make sure to await the save method
//         const user = await User.create({
//           firstname,
//           lastname,
//           phone,
//           email,
//           password: hashPassword,
//           RoleName
          
//         });
       
        
        
//          const created =  await user.save();
//         if(!created){
//            return res.status(404).send("Role already exists.");
//         }else{
//             return res.send('User created successfully.').status(201);
//         }
        

        
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   };
  
// const CreateUser = async (req, res) => {
//     try {
//       const { firstname, lastname, phone, email, password, RoleName } = req.body;
//       console.log(firstname, lastname, phone, email, password, "data");
  
//       if (!firstname || !lastname || !phone || !email || !password || !RoleName) {
//         return res.status(400).send("Please fill in all the fields.");
//       }
  
    
//       let role = await Role.findOne({
//         where: {
//           roleName: RoleName,
//         },
//       });
  
//       if (!role) {
//         // Role doesn't exist, create a new one
//         role = await Role.create({
//           roleName: RoleName,
//           Username: `${firstname} ${lastname}`,
//           email: email,
//         });
//       } else {
//         // Role with the same roleName exists, create a new one with a unique Username or email
//         role = await Role.create({
//           roleName: RoleName,
//           Username: `${firstname} ${lastname}-${Date.now()}`, // Add a timestamp for uniqueness
//           email: `${email}-${Date.now()}`, // Add a timestamp for uniqueness
//         });
//       }
    

//         const hashPassword = await bcrypt.hash(password,10);

//         const existing = await User.findOne({where : { email }});
//         if(existing){
//           return res.send("user is already existing in database....").status(400);
//         }else{
//           const user = await User.create({
//             firstname,
//             lastname,
//             phone,
//             email,
//             password: hashPassword,
//             RoleName,
//             RoleId: role.id,
//           });
      
//           res.status(201).send({
//             user: user,
//             role: role,
//             message: "User and role are created successfully",
//           });
//         }

        

      
        
       
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).send("Internal Server Error");
//     }
//   };

// const CreateUser = async (req, res) => {
//   try {
//     const { firstname, lastname, phone, email, password, RoleName } = req.body;
//     console.log(firstname, lastname, phone, email, password, "data");

//     if (!firstname || !lastname || !phone || !email || !password || !RoleName) {
//       return res.status(400).send("Please fill in all the fields.");
//     }

//     let role = await Role.findOne({
//       where: {
//         roleName: RoleName,
//       },
//     });

//     if (!role) {
//       // Role doesn't exist, create a new one
//       role = await Role.create({
//         roleName: RoleName,
//         Username: `${firstname} ${lastname}`,
//         email: email,
//       });
//     } else {
//       // Role with the same roleName exists, create a new one with unique Username or email
//       role = await Role.create({
//         roleName: RoleName,
//         Username: `${firstname} ${lastname}-${Date.now()}`,
//         email: `${email}-${Date.now()}`,
//       });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       firstname,
//       lastname,
//       phone,
//       email,
//       password: hashPassword,
//       RoleName,
//       RoleId: role.id,
//     });

//     res.status(201).send({
//       user: user,
//       role: role,
//       message: "User and role are created successfully",
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// const CreateUser = async (req, res) => {
//   try {
//     const { firstname, lastname, phone, email, password, RoleName } = req.body;
//     console.log(firstname, lastname, phone, email, password, "data");

//     if (!firstname || !lastname || !phone || !email || !password || !RoleName) {
//       return res.status(400).send("Please fill in all the fields.");
//     }

//     let role = await Role.findOrCreate({
//       where: {
//         roleName: RoleName,
//       },
//       defaults: {
//         roleName: RoleName,
//         Username: `${firstname} ${lastname}-${Date.now()}`,
//         email: `${email}-${Date.now()}`,
//       },
//     });

//     const hashPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       firstname,
//       lastname,
//       phone,
//       email,
//       password: hashPassword,
//       RoleName,
//       RoleId: role[0].id, // Access the created or found role's ID
//     });

//     res.status(201).send({
//       user: user,
//       role: role[0], // Access the created or found role
//       message: "User and role are created successfully",
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

const CreateUser = async (req, res) => {
  try {
    const { firstname, lastname, phone, email, password, roleName } = req.body;
    console.log(firstname, lastname, phone, email, password, "data");
    if (!firstname || !lastname || !phone || !email || !password || !roleName) {
      return res.status(400).send("Please fill in all the fields.");
    }
      const imagePath = req.file ? req.file.filename:null;

      const baseUrl = `${req.protocol}://${req.get('host')}`

       const existingUser = await User.findOne({where : {email}});
       if(existingUser){
         return res.status(401).send("User already exist ..... ");
       }else{

          const hashPassword = await bcrypt.hash(password, 10);
          const user = await User.create({
            firstname,
            lastname,
            phone,
            email,
            password: hashPassword,
            roleName,
            image: imagePath ? `${baseUrl}/uploads/image/${imagePath}` : null
          });

          const users = await user.save();

          console.log(users )
      
          res.status(201).send({
            user: users,
            message: "User  are created successfully",
          });

       }
        
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const getUsers = async (req,res)=>{
    try {
        const users = await User.findAll();
        if(!users){
            return res.send("not result found......").status(401);
            
        }else{
            return res.send(users).status(201);
        }
        
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req,res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if(!user){
            return res.send("user not found...").status(401);
        }else{
            return res.send(user).status(201);
        }
    } catch (error) {
        console.log(error);
        res.send("error.....").status(400);
        
    }
}

// const UpdateUser = async (req, res) => {
//     try {
//       const { firstname, lastname , phone , email , password,roleName } = req.body;
//       const  id  = req.params.id;
//       console.log("id: ", id);

//       const updateData = {firstname, lastname, phone , email , roleName};
//       // Basic validation
//       if(password){
//         updateData.password = bcrypt.hashSync(password,10);
//       }

//       const updatedRows = await User.update(updateData,{ where: { id } }
//       );
//       if ([updatedRows] > 0) {
//         return res.status(200).json({ message: `User updated successfully ` });
//       } else {
//         return res.status(404).json({ error: 'User not found.' });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

// const UpdateUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { firstname, lastname, phone, email, password, roleName } = req.body;
    
//     console.log("id: ", id);



//     const updateData = { firstname, lastname, phone, email, roleName };
//     // Basic validation
//     if(password){
//       updateData.password = bcrypt.hashSync(password,10);
//     }

//     const updatedRows = await User.update(updateData,{where: {id}})

//     if (updatedRows > 0) {
//       return res.status(200).json({ message: `User updated successfully` });
//     } else {
//       return res.status(404).json({ error: 'User not found.' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const UpdateUser = async(req,res) =>{

  try {
    
    const { id } = req.params;
    const{firstname,lastname,email,password,roleName} = req.body;
    console.log(req.body);
    const updateData = {
      firstname,
      lastname,
      email,
      roleName
    }

    if(password){
      updateData.password = bcrypt.hashSync(password,10)
    }

    const updatedRows = await User.update(updateData,{where: { id }});
    console.log(updatedRows ,"updateRows");

    if([updatedRows] > 0){
      return res.status(202).json(`user updated succesfully: ${updatedRows}`)
    }else{
      return res.status(404).json("User not found");
    }

    
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req,res)=>{
    
      const id = req.params.id
      const user = await User.findOne({where : {id}})
        
        if(!user){
            return res.status(404).send("User delete not successfully....");
        }
            try{
              const deleteUser = await user.destroy();
              return res.status(201).send({
                message: "user are deleted",
                User: deleteUser
              })

            }catch(error){
              console.log(error);

            }
        
    
}


module.exports = {
    CreateUser,
    getUsers,
    getUserById,
    UpdateUser,
    deleteUser
}