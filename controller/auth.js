const userModel = require("../model/user");

const login = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({ error: "User email is required" });
  }

  try {
    const user = await userModel.findOne({ email: email }).exec();
    if (!user) {
      return res.status(403).json({ error: "User " + email + " not found" });
    }

    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = login;
