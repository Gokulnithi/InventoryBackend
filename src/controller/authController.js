const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const { use } = require("react");

const register = async (req, res) => {
  try {
    const { username, password, role,base } = req.body;
    let userExists = await User.findOne({username});
    if(userExists){
      throw new Error('User already there!')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      username,
      password: hashedPassword,
      role,
      base
    });
    await newuser.save();
    res.status(201).json({ messge: `User Registered with ${username}` });
  } catch (err) {
    res.status(401).json({ message: `${err.message}` });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({ messge: `User not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ messge: `Invalid credential` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, base:user.base },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24*60*60*1000,
        sameSite:"None",
    })

    res.status(200).json({token,role:user.role,id:user._id})
  } catch (err) {
    res.status(500).json({ messge: `Something went wrong ${err} `});
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",   
    sameSite: 'None', 
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  logout
};
