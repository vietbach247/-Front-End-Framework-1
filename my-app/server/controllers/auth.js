import User from "../models/User";
import {
  registerValidate,
  loginValidate,
  forgotPassword,
} from "../validations/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const Register = async (req, res, next) => {
  try {
    const { name, password, email, confirmPassword } = req.body;

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Xác nhận mật khẩu không đúng",
      });
    }

    // Validate dữ liệu
    const { error } = registerValidate.validate(
      { name, password, email, confirmPassword },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Kiểm tra email đã tồn tại trong CSDL
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // Tạo mật khẩu băm
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Tạo người dùng mới
    const newUser = await User.create({
      name: name,
      password: hashedPassword,
      email,
      confirmPassword: hashedPassword, // Lưu confirmPassword vào CSDL
    });

    newUser.password = undefined;
    res.status(201).json({
      message: "Thêm người dùng thành công",
      data: newUser,
    });
  } catch (error) {
    console.error(error); // Log lỗi ra console server
    res.status(500).json({
      message: "Đã xảy ra lỗi khi đăng ký người dùng",
      error: error.message,
    });
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidate.validate(
      { email, password },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(400).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không chính xác",
      });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: 3600,
    });

    user.password = undefined;

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng nhập" });
  }
};

export const forgotPasswords = async (req, res) => {
  const { email } = req.body;

  try {
    const { error } = forgotPassword.validate({ email });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 60 * 60 * 5;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    res.status(200).json({
      message: "Mã xác nhận đã được gửi đến email của bạn",
      token: resetToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xử lý yêu cầu đặt lại mật khẩu" });
  }
};
