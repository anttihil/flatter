export const getUserPage = async (req, res, next) => {
  try {
    const result = await selectUserActivity(req.params.userId);
    res.status(200).render("userPage", { activity: result.activity });
  } catch (error) {
    next(error);
  }
};

export const getUserSettings = async (req, res, next) => {
  try {
    res.status(200).render("userSettings");
  } catch (error) {
    next(error);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    res.render("adminDashboard");
  } catch (error) {
    next(error);
  }
};
