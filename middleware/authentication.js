export const userAuthenticationLocals = (req, res, next) => {
  if (req.user && req.user.nickname && req.user.role) {
    res.locals.user = { nickname: req.user.nickname, role: req.user.role };
    next();
  } else {
    next();
  }
};
