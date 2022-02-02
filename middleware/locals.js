/* 
Express-session (and especially PassportJS) attach messages to req.session.
This middleware moves those messages to local variables.
*/
export function passportMsgLocals(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
}

/*  
Req.user object is copied to local variables so that user properties are 
available to HTML templates if needed. 
*/
export const userLocals = (req, res, next) => {
  if (req.user) {
    res.locals.user = {
      username: req.user.username,
      role: req.user.role,
      id: req.user.id,
      permaBan: req.user.permaBan,
      tempBan: req.user.tempBan,
      isVerified: req.user.isVerified,
    };
    next();
  } else {
    next();
  }
};
