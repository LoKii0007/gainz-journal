const prisma = require("../utils/prisma");

// @desc    Update user name or gender
// @route   PUT /api/users/me
// @access  Private
const updateUser = async (req, res) => {
  try {
    const { name, gender } = req.body;

    if (!name && !gender) {
      return res.status(400).json({ message: "Please provide name or gender to update" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (gender) updateData.gender = gender;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      include: {
        profiles: {
          where: {
            active: true,
          },
        },
      },
    });

    res.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        gender: updatedUser.gender,
      },
      profiles: updatedUser.profiles,
      currentProfileId: updatedUser.profiles[0]?.id,
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  updateUser,
};

