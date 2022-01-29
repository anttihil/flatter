export function passportMsgLocals(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
}

export const userLocals = (req, res, next) => {
  if (req.user && req.user.username && req.user.role) {
    res.locals.user = {
      username: req.user.username,
      role: req.user.role,
      id: req.user.id,
      permaBan: req.user.permaBan,
      tempBan: req.user.tempBan,
    };
    next();
  } else {
    next();
  }
};
