const bcryptjs = require('bcryptjs')
module.exports = [
    {
        id: 1,
        name: 'admin',
        surname: 'test',
        email: 'admin@test.com',
        password: bcryptjs.hashSync('123456', 10),
        phone: "11 23456789",
        idRol: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: 'user',
        surname: 'test',
        email: 'user@test.com',
        password: bcryptjs.hashSync('123456', 10),
        phone: "11 98765432",
        idRol: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]