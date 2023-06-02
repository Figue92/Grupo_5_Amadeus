const db = require('../database/models')

module.exports = {
    getAllCategories : async () => {
    try {
      const categories = await db.Category.findAll({include:['products']});
  return categories 
 } catch (error){
     throw {
         status : 500,
         message : error.message
     }
 }
},
getFindAndCountAllCategories : async () => {
    try {
      const {count, rows : categories} = await db.Category.findAndCountAll({
        order : [['nameCategory']]
      });
  return {categories, count} 
 } catch (error){
     throw {
         status : 500,
         message : error.message
     }
 }
}}