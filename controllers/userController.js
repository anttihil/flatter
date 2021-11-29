const userService = require("../services/userService");

//calls the get user service function and sends a response
exports.getUserController = async (req, res) => {
  try {
    const gotUser = await userService.getUser(req);
    res.status(200).json({
      status: "success",
      users: gotUser.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsersController = async (req, res) => {
  try {
    const gotUser = await userService.getAllUsers(req);
    res.status(200).json({
      status: "success",
      users: gotUser.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the post user service function and sends a response
exports.postUserController = async (req, res) => {
  try {
    const postedUser = await userService.postUser(req);
    res.status(201).json({
      status: "success",
      users: postedUser.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the delete user service function and sends a response
exports.deleteUserController = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req);
    res.status(200).json({
      status: "success",
      users: deletedUser.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the update user service function and sends a response
exports.updateUserController = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req);
    res.status(200).json({
      status: "success",
      users: updatedUser.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
