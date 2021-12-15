//calls the get user service function and sends a response
export const getUserPage = async (req, res) => {
  try {
    if (req.user && req.user.id === req.params.userId) {
      const result = await getUserActivity(req);
      res.status(200).render("userDashboard");
    } else {
      const result = await getUserActivity(req.params.userId);
      res.status(200).render("userPage");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
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
