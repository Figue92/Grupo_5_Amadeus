const db = require('../database/models')

module.exports = {
    getAllProducts : async () => {
    try {
      const totalProducts = await db.Products.count();
  return totalProducts 
 } catch (error){
     throw {
         status : 500,
         message : error.message
     }
 }
},
getAllUsers : async () => {
    try {
      const totalUsers = await db.Users.count();
  return totalUsers 
 } catch (error){
     throw {
         status : 500,
         message : error.message
     }
 }
},
getAllCategories : async () => {
    try {
      const totalCategories = await db.Category.count();
  return totalCategories 
 } catch (error){
     throw {
         status : 500,
         message : error.message
     }
 }
}
}