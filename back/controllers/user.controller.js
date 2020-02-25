const User = require("../models/user");

const userCtrl = {};

userCtrl.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    photoUrl: req.body.photoUrl,
    bio: req.body.bio,
    web: req.body.web,
    github: req.body.github,
    gitlab: req.body.gitlab,
    bitbucket: req.body.bitbucket
  });
  await user.save();
  res.json({ status: "User created" });
};

// userCtrl.getUser = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.json(user);
// };

userCtrl.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

userCtrl.editUser = async (req, res, next) => {
  const { id } = req.params;
  const user = {
    username: req.body.username,
    email: req.body.email,
    photoUrl: req.body.photoUrl,
    bio: req.body.bio,
    web: req.body.web,
    github: req.body.github,
    gitlab: req.body.gitlab,
    bitbucket: req.body.bitbucket
  };
  await User.findByIdAndUpdate(id, { $set: user }, { new: true });
  res.json({ status: "User Updated" });
};

userCtrl.deleteUser = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ status: "User Deleted" });
};

module.exports = userCtrl;
