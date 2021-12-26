export function passportMsgLocals(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
}

export const userAuthenticationLocals = (req, res, next) => {
  if (req.user && req.user.nickname && req.user.role) {
    res.locals.user = { nickname: req.user.nickname, role: req.user.role };
    next();
  } else {
    next();
  }
};
