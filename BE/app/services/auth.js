import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, password, confimPassword } = newUser;

      const findEmail = await User.findOne({ email });
      if (findEmail) {
        return reject({
          status: "error",
          message: "Email already exists",
        });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      if (!findEmail) {
        const user = await User.create({
          name,
          email,
          password: passwordHash,
        });
        if (user) {
          resolve({
            status: "success",
            message: "Đăng ký tài khoản thành công",
            data: user,
          });
        }
      }
    } catch (error) {
      reject({
        status: "error",
        messeage: error.message,
      });
    }
  });
};

export const signin = async (profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(process.env.SECRET_KEY, "JWT_SECRET");
      const { email, password } = profile;

      const findEmail = await User.findOne({ email });
      if (!findEmail) {
        reject({
          status: "error",
          message: "Email không tồn tại",
        });
      }

      const checkPassword = await bcrypt.compare(password, findEmail.password);
      if (!checkPassword) {
        reject({
          status: "error",
          message: "Password không đúng",
        });
      }
      // const passwordHash = await bcrypt.hash(password, 10);
      const token = jwt.sign({ id: findEmail._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      const user = {
        accessToken: token,
        user: {
          id: findEmail._id,
          email: findEmail.email,
        },
      };

      if (user) {
        resolve({
          status: "success",
          message: "Đăng nhập tài khoản thành công",
          data: user,
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find({});
      if (users) {
        resolve(users);
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

const userServices = {
  signup,
  signin,
  getAllUsers,
};

export default userServices;
