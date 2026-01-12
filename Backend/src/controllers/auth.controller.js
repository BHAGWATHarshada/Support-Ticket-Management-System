import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: "All fields required" })

  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ message: "User already exists" })

  const hashed = await bcrypt.hash(password, 10)
  await User.create({ email, password: hashed })

  res.status(201).json({ message: "User registered" })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: "All fields required" })

  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: "Invalid credentials" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: "Invalid credentials" })

  const token = jwt.sign(
  { id: user._id, role: user.role, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
)


  res.json({ token })
}
