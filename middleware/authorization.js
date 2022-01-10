import createHttpError from "http-errors";

export const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createHttpError(401, "You must login to access this resource."));
  }
};

export const isOwnUser = (req, res, next) => {
  if (req.user && req.user.id === req.params.userId) {
    next();
  } else {
    next(
      createHttpError(403, "You are not authorized to access this resource.")
    );
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(
      createHttpError(403, "You are not authorized to access this resource.")
    );
  }
};
