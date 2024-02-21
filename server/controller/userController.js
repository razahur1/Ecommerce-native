import { token } from "morgan";
import userModel from "../models/userModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from 'cloudinary'

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } = req.body;
    //validation
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //check existing user
    const existingUser = await userModel.findOne({ email });
    //validation
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Registeration Success, please login",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please add email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email: email });

    //user validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //check pass
    const isMatch = await user.comparePassword(password);

    //validation pass
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    //token
    const token = user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

// GET USER PROFILE
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Profile fetch successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Profile API",
      error,
    });
  }
};

// Logout
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      })
      .send({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Logout API",
      error,
    });
  }
};

// Update profile
export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;
    //validation + update
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Profile Update API",
      error,
    });
  }
};

// Update password
export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }
    //oldpass check
    const isMatch = await user.comparePassword(oldPassword);
    //validation
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    user.password = newPassword;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Password API",
      error,
    });
  }
};

/// Update user profile photo
export const updateProfilePicController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      // file get from client photo
      const file = getDataUri(req.file);
    //   // delete prev image
    //   await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
      // update
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      user.profilePic = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      // save func
      await user.save();
  
      res.status(200).send({
        success: true,
        message: "profile picture updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In update profile pic API",
        error,
      });
    }
  };
  
  // FORGOT PASSWORD
  export const passwordResetController = async (req, res) => {
    try {
      // user get email || newPassword || answer
      const { email, newPassword, answer } = req.body;
      // valdiation
      if (!email || !newPassword || !answer) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      // find user
      const user = await userModel.findOne({ email, answer });
      //valdiation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "invalid user or answer",
        });
      }
  
      user.password = newPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Your Password Has Been Reset Please Login !",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In password reset API",
        error,
      });
    }
  };