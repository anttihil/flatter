export const getUserPage = async (req, res, next) => {
  try {
    const result = await selectUserActivity(req.params.userId);
    res
      .status(200)
      .render("userPage", { boards: result.boards, activity: result.activity });
  } catch (error) {
    next(error);
  }
};

export const getUserSettings = async (req, res, next) => {
  try {
    const result = await selectBoards();
    res.status(200).render("userSettings", { boards: result.boards });
  } catch (error) {
    next(error);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const result = await selectBoards();
    res.render("adminDashboard", { boards: result.boards });
  } catch (error) {
    next(error);
  }
};
