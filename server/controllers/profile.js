const renderError = require("../utils/renderError");
const prisma = require('../config/prisma')
exports.createProfile = async(req, res ,next) => {
  try {
    const {firstname , lastname } = req.body
    const {id} = req.user
    
    const email = req.user.emailAddresses[0].emailAddress
    console.log(firstname , lastname , id , email)

    // const profile = await prisma.profile.create({
    //   data:{
    //     firstname :firstname,
    //     lastname : lastname,
    //     clerkId : id,
    //     email 
    //   }
    // })
    const profile = await prisma.profile.upsert({
      where:{ clerkId:id},
      create:{
          firstname,
          lastname,
          email,
          clerkId:id
      },
      update:{
          firstname,
          lastname,
          email
      }

    })
    res.json({result:profile, message: "Create Profile" });
  } catch (error) {
    console.log(error.message);
    // throw new Error();
    // res.status(500).json({massage: "server error0"});
    next(error);
  }
};
