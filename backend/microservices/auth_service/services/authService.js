const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

class AuthService {
  // Register a new admin
  static async register(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({ username, email, password: hashedPassword });
      return admin;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Login admin
  static async login(email, password) {
    try {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) throw new Error("Admin not found");

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) throw new Error("Invalid password");

      const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
      return { token, admin };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AuthService;
