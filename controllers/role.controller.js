const Role = require("../models/role.model");
const User = require("../models/user.model");
// const User = require("../models/user.model");
// const Role = require("../models/user.model");

const getRoles = async(req,res)=>{
    const roles = await Role.findAll();
    if(!roles){
        return res.status(401).send(
            "Roles not found null!"
        )
    }else{
        return res.status(201).send({
            
            roles,
            message: "Successfully"
        })
    }
}

const Create_roles = async(req,res)=>{
    const {roleName,username,email} = req.body;
    if(!roleName || !username || !email){
        return res.status(400).send("Plz All field are required.....");
    }

    const imagePath = req.file ? req.file.filename : null
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    try{
        const alreadyExisting = await Role.findOne({ where : {email}});
        if(alreadyExisting){
            return res.status.send("email is already exist......");
        }else{

            const role = await Role.create({
                roleName,
                username,
                email,
                image: imagePath ? `${baseUrl}/uploads/image/${imagePath}` : null
            });
    
            if(role){
                return res.status(201).send({
                    Role: role,
                    message: "Role created successfully....."
                })
            }else{
                return res.status(400).send("User not created....",error.message);
            }

        }
       

    }catch(error){
        return res.status(400).send(error);
    }
    


}


const getRolebyId = async(req,res)=>{
    const {id} = req.params;
    const role = await Role.findByPk(id);
    if(role){
        return res.status(201).send({
            Role: role,
            message: "successfully"
        })
    }else{
        return res.status(400).send("Roles not found......");
    }
}

const UpdateRole = async(req,res)=>{
    const {roleName, Username , email} = req.body;
    const {id} =  req.params;

    const [updateRows] = await Role.update({
        roleName,
        Username,
        email
    }, {where : {id}});

    if(updateRows > 0){
        const user = await User.findOne({where : {id}});

        const Updateuser = await user.update({
            RoleName: roleName,
            email: email
            
        })

        return res.status(201).send("Role and User are updated......");
    }else{
        return res.status(404).send("Role not updated....")
    }

}

const DeleteRoles = async (req,res)=>{
    
    const {id} = req.params;

    const role = await Role.findOne({where : {id}});
    
    if(!role){
        return res.status(400).send("Roles are not defined.....");
    }else{
        try{

            const user = await User.findAll({where : { RoleId : id }});
            const Deleteduser = await Promise.all(user.map(users=> users.destroy()))
            const roles = await role.destroy();
            return res.status(201).json({
                message: "Match Role and User are deleted",
                User: Deleteduser,
                Role: roles
            })
        }catch(error){
            console.log(error);
        }
       
        
    }

    

    
}

module.exports = {
    getRoles,
    getRolebyId,
    Create_roles,
    UpdateRole,
    DeleteRoles
}