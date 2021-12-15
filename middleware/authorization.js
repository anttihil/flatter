export const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
};

export const isOwnUser = (req, res, next) => {
  if (req.user && req.user.id === req.params.userId) {
    next();
  } else {
    res.status(403).redirect("/403");
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).redirect("/403");
  }
};
