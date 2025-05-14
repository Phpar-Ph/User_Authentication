import User from "../model/userModel.js";
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    return res.json({
      success: true,
      userData: {
        name: user.name,
        profilePic: user.profilePic,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
