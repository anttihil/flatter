exports.getUser = async (req) => {
  try {
    const gotUser = await query("SELECT * FROM users WHERE user_id=$1", [
      req.params.user_id,
    ]);
    return gotUser;
  } catch (error) {
    console.log(error);
  }
};

// post for session
