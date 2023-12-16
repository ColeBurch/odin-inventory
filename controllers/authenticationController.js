const User = require("../models/user");
const utils = require("../utils");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.user_login = asyncHandler(async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ errors: [{ msg: "No user found." }] });
      } else {
        const isValid = utils.validPassword(
          req.body.password,
          user.hash,
          user.salt
        );

        if (isValid) {
          const tokenObject = utils.issueJWT(user);

          res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
            user: {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          });
        } else {
          res.status(401).json({ errors: [{ msg: "Invalid credentials." }] });
        }
      }
    })
    .catch((err) => {
      next(err);
    });
});

exports.user_register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Email already in use.",
              path: "email",
              type: "field",
              value: req.body.email,
            },
          ],
        });
      } else {
        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
          id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          hash: hash,
          salt: salt,
        });

        newUser
          .save()
          .then((user) => {
            const jwt = utils.issueJWT(user);

            res.json({
              success: true,
              token: jwt.token,
              expiresIn: jwt.expires,
              user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              },
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};
