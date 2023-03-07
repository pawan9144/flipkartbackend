const User = require("../../model/customermodel");

exports.registerUser = async (req, res) => {
  const { name, email, password, confirmpassword, tc } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(201).json({
      status: "failed",
      message: "Email is allready exist",
    });
  }
  if (!name && !email && !password && !confirmpassword && !tc) {
    return res.json({
      message: "All field is required !",
      success: false,
    });
  }
  if (password != confirmpassword) {
    return res.json({
      message: "password and confirm password doesn't match",
      success: false,
    });
  }
  try {
    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const createObj = {
      name,
      email,
      password: hashpassword,
      ...(tc && { tc }),
    };
    const userData = await User.create(createObj);
    //find single user
    const saved_user = await User.findOne({ email: email });
    // GEnerate JWT token
    const token = jwt.sign({ userID: saved_user._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      data: { ...userData, token: token },
      message: "Register successfull",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
