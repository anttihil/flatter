export async function emailVerificationChecker(req, res, next) {
  try {
    if (req.user && !req.user.isVerified) {
      res
        .status(300)
        .render("verificationRequired", { csrfToken: req.csrfToken() });
    }
  } catch (error) {
    next(error);
  }
}
