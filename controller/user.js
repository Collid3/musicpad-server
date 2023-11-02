const userModel = require("../model/user");

const createUser = async (req, res) => {
  const { email } = req.body;

  if ((!email, email === "")) {
    return res.status(401).json({ error: "Email is required" });
  }

  try {
    const userExists = await userModel.findOne({ email: email }).exec();
    if (userExists) {
      return res
        .status(401)
        .json({ error: "User with that id already exists" });
    }

    const newUser = await userModel.create({
      email,
    });
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser };
