const db = require('../database/models')

module.exports = {
  loginGoogle: async (req,res)=>{
    const {
      provider,
      photos: [{value:picture}],
      emails: [{value:email}],
      _json: {
        sub : googleId, 
        family_name: surname,
        given_name: name,
        }
    }=req.session.passport.user;
 try {
  const address= await   db.Address.create()
  const [{id,rolId}, isCreate]= await db.User.findOrCreate({
    where: {
  socialId: googleId
    },
    defaults:{
      name,
      surname,
      email,
     avatar: picture,
     addressId: address.id,
     socialId: googleId,
     socialProvider: provider
  
    }
  })
  if(!isCreate){
    await address.destroy()
  }

  req.session.userLogin={
    id,
    name,
    surname,
    email,
    rol:rolId,
    socialId: googleId
  }
  res.cookie('userAmadeusPC', req.session.userLogin, { maxAge: 1000 * 60 * 5 })
  res.redirect('/users/profile')
 } catch (error) {
  console.log(error);
 }

  }
}