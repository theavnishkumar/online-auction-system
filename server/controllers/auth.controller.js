import User from "../models/user.model.js";
import Login from "../models/login.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import { clearCookie, setCookie } from "../utils/cookies.util.js";

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All Fields are required" });
  try {
    const user = await User.findOne({ email });
    //  Checking user exists — use same message to prevent user enumeration
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Password Validate
    const psswordValidate = await bcrypt.compare(password, user.password);
    if (!psswordValidate) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // generating jwt token
    const token = generateToken(user._id, user.role);

    // Set HTTP-only cookie
    setCookie(res, token);

    // Getting user gro location
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"];
    const location = await getLocationFromIp(ip);

    // Update user's last login and location
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
      location: location,
      ipAddress: ip,
      userAgent: userAgent,
    });

    // Saving login details
    const login = new Login({
      userId: user._id,
      ipAddress: ip,
      userAgent,
      location,
      loginAt: new Date(),
    });
    await login.save();

    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Server error from handle login" });
  }
};

export const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  // Checking input fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Server-side password strength validation
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  try {
    const existingUser = await User.findOne({ email });

    // Checking existing of user
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Getting geo details
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"];
    const location = await getLocationFromIp(ip);

    // Hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving user to database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: "https://avatar.iran.liara.run/public/7",
      ipAddress: ip,
      userAgent,
      location,
      signupAt: new Date(),
      lastLogin: new Date(),
    });
    await newUser.save();

    const login = new Login({
      userId: newUser._id,
      ipAddress: ip,
      userAgent,
      location,
      loginAt: new Date(),
    });
    await login.save();

    // Generating jwt token
    const token = generateToken(newUser._id, newUser.role);

    // Set HTTP-only cookie
    setCookie(res, token);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const handleUserLogout = async (req, res) => {
  clearCookie(res);
  return res.status(200).json({ message: "Logged out successfully" });
};
