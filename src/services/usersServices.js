const db = require('../database/models');
const { hashSync } = require('bcryptjs');
const fs = require('fs');
module.exports = {
    getAllUsers: async () => {
        try {
            const users = await db.User.findAll();
            return users;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    getOneUser: async (id) => {
        try {
            const user = await db.User.findByPk(id);
            return user;

        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    getAllEmails: async () => {
        try {
            const users = await db.User.findAll({
                attributes : ['email']
            });
            const emails = users.map(user => user.email);
            return emails;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    registerUser: async (data, image) => {
        try {
            const newAddress = await db.Address.create();
            const newUser = await db.User.create({
                name: data.name.trim(),
                surname: data.surname.trim(),
                email: data.email.trim(),
                password: hashSync(data.password, 10),
                phone: data.codarea + " " + data.tel,
                idRol: 2,
                avatar: image?.filename || null,
                idAddress: newAddress.id
            })
            return newUser
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    updateUser: async (id, data, image) => {
        try {
            const user = await db.User.findByPk(id);

            const updatedUser = await db.User.update(
                {
                    name: data.name.trim(),
                    surname: data.surname.trim(),
                    phone: data.codarea + " " + data.tel,
                    avatar: image ? image.filename : user.avatar
                },
                {
                    where: { id }
                }
            );
            const updatedAddress = await db.Address.update(
                {
                    address: data.address ? data.address.trim() : null,
                    city: data.city ? data.city.trim() : null,
                    province: data.province ? data.province.trim() : null,
                    zipCode: data.zipCode ? data.zipCode : null
                },
                {
                    where : { id : user.idAddress }
                }
            );
            (image && fs.existsSync('public/images/users/' + updatedUser.avatar)) && fs.unlinkSync('public/images/users/' + updatedUser.avatar);
            return updatedUser;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    destroyUser: async (id) => {
        try {
            const deletedUser = await db.User.destroy({
                where: { id }
            });
            return deletedUser;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    }
}