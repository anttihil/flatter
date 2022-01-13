export function passportMsgLocals(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
}

export const userAuthenticationLocals = (req, res, next) => {
  if (req.user && req.user.username && req.user.role) {
    res.locals.user = {
      username: req.user.username,
      role: req.user.role,
      id: parseInt(req.user.id),
    };
    next();
  } else {
    next();
  }
};
