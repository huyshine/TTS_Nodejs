import { IUser } from "../interfaces/user";
import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signupSchema } from "../validate/user";
dotenv.config();

export const signin = async (req: any, res: any) => {
  try {
    const user = req.body;
    const checkEmail: any = await User.getUserByEmail(user.email);
    if (checkEmail.length === 0) throw new Error("Email does not exist");
    const checkPassword = await bcrypt.compare(
      user.password,
      checkEmail[0].password
    );
    if (!checkPassword) throw new Error("Password is incorrect");

    const token = jwt.sign({ id: checkEmail.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const auth = {
      id: checkEmail[0]?.id,
      role: checkEmail[0]?.id_role,
    };

    res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công !",
      data: {
        access_token: token,
        authen: auth,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const signup = async (req: any, res: any) => {
  try {
    // const user = req.body;
    const { name, email, password, confimPassword } = req.body;
    const { error } = await signupSchema.validate(
      {
        name,
        email,
        password,
        confimPassword,
      },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const checkEmail: any = await User.getUserByEmail(email);
    if (checkEmail.length > 0) throw new Error("Email already exists");

    const data = await User.signup(req.body);
    res.status(200).json({
      status: "success",
      message: "Đăng ký tài khoản thành công",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllUser = async (req: any, res: any) => {
  try {
    const data = await User.getAllUser();
    res.status(200).json({
      status: "success",
      
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
