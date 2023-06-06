const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../data");
const { hashSync } = require("bcryptjs");
const fs = require("fs");
const db = require("../database/models");
const { getAllEmails } = require("../services/usersServices");
const createResponseError = require("../helpers/createResponseError");

module.exports = {
  register: async (req, res) => {
    try {
      const emails = await getAllEmails();
      return res.render("users/register", {
        title: "Registro",
        emails,
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  login: (req, res) => {
    return res.render("users/login", {
      title: "Ingresá",
    });
  },

  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, surname, email, tel, password, codarea } = req.body;

      db.Address.create()
        .then((address) => {
          db.User.create({
            name: name.trim(),
            surname: surname.trim(),
            email: email.trim(),
            password: hashSync(password, 10),
            phone: codarea + " " + tel,
            idRol: 2,
            avatar: req.file.filename,
            idAddress: address.id,
          })/* .then((user) => {
            db.Cart.create({
              idUser: user.id,
            }) */.then(() => {
              return res.redirect("/users/login");
            });
          /* }); */
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/register", {
        title: "Registro",
        errors: errors.mapped(),
        old: req.body,
        emails: [],
      });
    }
  },
  processLogin: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("users/login", {
        title: "Inicio de sesión",
        errors: errors.mapped(),
        old: req.body,
      });
    }

    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(({ id, name, surname, idRol, phone }) => {
        req.session.userLogin = {
          id,
          name,
          surname,
          phone,
          rol: idRol,
        };

        if (req.body.remember) {
          res.cookie("userAmadeusPC", req.session.userLogin, {
            maxAge: 1000 * 60 * 5,
          });
        }

        return res.redirect("/users/profile");
      })
      .catch((error) => console.log(error));
  },
  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id, {
      attributes: ["name", "surname", "email", "avatar"],
      include: [
        {
          association: "address",
          attributes: ["address", "city", "province", "zipCode"],
        },
      ],
    })
      .then((user) => {
        console.log(user)
        return res.render("users/profile", {
          title: "Perfil de usuario",
          ...user.dataValues,
        });
      })

      .catch((error) => console.log(error));
  },
  edit: (req, res) => {
    db.User.findByPk(req.session.userLogin.id, {
      include: ["address"],
    }).then((user) => {
      return res.render("users/edit", {
        title: "Editar Perfil",
        user,
      });
    });
  },
  update: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { name, surname, phone, address, city, province, zipCode } =
        req.body;
    
      const { id } = req.session.userLogin;
      db.User.findByPk(id)
        .then((user) => {
          const addressUpdate = db.Address.update(
            {
              address: address ? address.trim() : null,
              city: city ? city.trim() : null,
              province: province ? province.trim() : null,
              zipCode: zipCode ? zipCode : null,
            },
            {
              where: {
                id: user.idAddress,
              },
            }
          );
          const userUpdate = db.User.update(
            {
              name: name.trim(),
              surname: surname.trim(),
              phone,
              avatar: req.file ? req.file.filename : user.avatar,
            },
            {
              where: {
                id,
              },
            }
          );

          Promise.all([addressUpdate, userUpdate]).then(
            ([addressUpdate, userUpdate]) => {
              req.file &&
                fs.existsSync("public/images/users/" + user.avatar) &&
                fs.unlinkSync("public/images/users/" + user.avatar);

              req.session.message = "Datos actualizados";

              req.session.userLogin = {
                id,
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                rol: user.idRol,
              };

              return res.redirect("/users/profile");
            }
          );
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/edit", {
        title: "Editar Perfil",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  logout: (req, res) => {
    res.clearCookie("userAmadeusPC");
    req.session.destroy();
    return res.redirect("/");
  },
  /* list: (req, res) => {
        db.User.findAll({
            include: ['address','rol']
        })
            .then(users => {
                return res.render('users/usersList',{
                    users
                })
            })
            .catch(error => console.log(error))
    } */
  destroy: (req, res) => {
    db.User.destroy({
      where: {
        id: req.session.userLogin.id,
      },
    })
      .then(() => {
        res.clearCookie("userAmadeusPC");
        req.session.destroy();
        return res.redirect("/");
      })
      .catch((error) => console.log(error));
  },
  favorites: (req, res) => {
    return res.render("users/favorites", {
      title: "Tus Productos Favoritos",
    });
  },
};
