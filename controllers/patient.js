const User = require("../models/user");
const Patient = require("../models/Patient");

exports.getRegister = (req, res, next) => {
  res.render("patient/register", {
    pageTitle: "Register",
    path: "/register",
    isLoggedIn: true,
    error: {
      status: false,
      errorMessage: "",
    },
  });
};

exports.postRegister = (req, res, next) => {
  console.log("Post register..");
  console.log("Patient Register Info...", req.body);
  const patient = new Patient(req.body);
  patient
    .save()
    .then((patient) => {
      return res.status(201).json({ status: "Patient registered" });
    })
    .catch((err) => {
      // console.log(err);
    });
};
