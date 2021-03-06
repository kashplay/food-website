const planModel = require("../models/planModel");

module.exports.getHomePage = async function (req, res) {
  const user = req.user;
  let plans = await planModel.find().limit(3);
  // console.log(plans);
  res.render("home.pug", { title: "Home Page", plans: plans, user: user });
};
module.exports.getPlansPage = async function (req, res) {
  const user = req.user;
  const plans = await planModel.find();

  res.render("plansPage.pug", { title: "Plans page", plans, user: user });
};

module.exports.getLoginPage = function (req, res) {
  res.render("login.pug", { title: "Login Page" });
};
module.exports.getProfilePage = function (req, res) {
  const user = req.user;
  // console.log(user);
  res.render("me.pug", { user });
};
module.exports.getUpdateUserPage = function (req, res) {
  const user = req.user;
  res.render("updateUser", { user });
};

module.exports.getPlansDetailsPage = async function (req, res) {
  const user = req.user;
  const id = req.params.id;
  const plan = await planModel.findById(id);
  res.render("planDetails", {user,plan})

}