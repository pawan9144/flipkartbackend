const express = require("express");
const { signupValidation } = require("../../validations/customerval");
const router = express.Router;

const customer = () => {
  //SignUp User
  router.post(REGISTER, signupValidation, registerUser);
};
module.exports = customer;
